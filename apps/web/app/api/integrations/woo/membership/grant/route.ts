import { NextRequest, NextResponse } from "next/server";
import DomainModel, { Domain } from "@models/Domain";
import UserModel from "@models/User";
import MembershipModel from "@models/Membership";
import PaymentPlanModel from "@models/PaymentPlan";
import CommunityModel from "@models/Community";
import CourseModel from "@models/Course";
import {
    Constants,
    Membership,
    PaymentPlan,
    User,
} from "@courselit/common-models";
import { activateMembership } from "@/app/api/payment/helpers";
import { error, info } from "@/services/logger";
import mongoose from "mongoose";
import constants from "@/config/constants";

interface WooGrantRequest {
    email: string;
    communityId?: string;
    courseId?: string;
    planId: string;
    wooSubscriptionId?: string;
    name?: string;
}

async function validateWooSecret(req: NextRequest): Promise<boolean> {
    const wooSecret = req.headers.get("x-woo-secret");
    const expectedSecret = process.env.WOO_INTEGRATION_SECRET;

    if (!expectedSecret) {
        error("WOO_INTEGRATION_SECRET not configured");
        return false;
    }

    return wooSecret === expectedSecret;
}

async function getDomain(
    domainName: string | null,
): Promise<(Domain & { _id: mongoose.Types.ObjectId }) | null> {
    if (!domainName) return null;
    return DomainModel.findOne({ name: domainName });
}

async function findOrCreateUser(
    domain: Domain & { _id: mongoose.Types.ObjectId },
    email: string,
    name?: string,
): Promise<User & { _id: mongoose.Types.ObjectId }> {
    const sanitizedEmail = email.toLowerCase().trim();

    let user = await UserModel.findOne({
        domain: domain._id,
        email: sanitizedEmail,
    });

    if (!user) {
        user = await UserModel.create({
            domain: domain._id,
            email: sanitizedEmail,
            name: name || sanitizedEmail.split("@")[0],
            active: true,
            purchases: [],
            permissions: [
                constants.permissions.enrollInCourse,
                constants.permissions.manageMedia,
            ],
            lead: constants.leadApi,
            subscribedToUpdates: true,
        });

        info(`WooCommerce integration: Created new user ${sanitizedEmail}`, {
            domain: domain.name,
            userId: user.userId,
        });
    }

    return user;
}

export async function POST(req: NextRequest) {
    try {
        // Validate WooCommerce secret
        if (!(await validateWooSecret(req))) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const domainName = req.headers.get("domain");
        const domain = await getDomain(domainName);

        if (!domain) {
            return NextResponse.json(
                { error: "Domain not found" },
                { status: 404 },
            );
        }

        const body: WooGrantRequest = await req.json();
        const {
            email,
            communityId,
            courseId,
            planId,
            wooSubscriptionId,
            name,
        } = body;

        // Validate required fields: either communityId (subscription) or
        // courseId (standalone course purchase), never both
        if (!email || !planId || (!communityId && !courseId)) {
            return NextResponse.json(
                {
                    error: "Missing required fields: email, planId, and communityId or courseId",
                },
                { status: 400 },
            );
        }

        if (communityId && courseId) {
            return NextResponse.json(
                {
                    error: "Provide either communityId or courseId, not both",
                },
                { status: 400 },
            );
        }

        const entityId = (communityId || courseId) as string;
        const entityType = communityId
            ? Constants.MembershipEntityType.COMMUNITY
            : Constants.MembershipEntityType.COURSE;

        if (communityId) {
            // Find the community
            const community = await CommunityModel.findOne({
                domain: domain._id,
                communityId,
                deleted: false,
            });

            if (!community) {
                return NextResponse.json(
                    { error: "Community not found" },
                    { status: 404 },
                );
            }
        } else {
            // Find the course
            const course = await CourseModel.findOne({
                domain: domain._id,
                courseId,
            });

            if (!course) {
                return NextResponse.json(
                    { error: "Course not found" },
                    { status: 404 },
                );
            }
        }

        // Find the payment plan
        const paymentPlan = await PaymentPlanModel.findOne<PaymentPlan>({
            domain: domain._id,
            planId,
            entityId,
            entityType,
        });

        if (!paymentPlan) {
            return NextResponse.json(
                { error: "Payment plan not found" },
                { status: 404 },
            );
        }

        // Find or create user
        const user = await findOrCreateUser(domain, email, name);

        // Check for existing membership
        let membership = await MembershipModel.findOne<Membership>({
            domain: domain._id,
            userId: user.userId,
            entityId,
            entityType,
        });

        if (membership) {
            // Update existing membership - always process to handle reactivation
            const wasActive =
                membership.status === Constants.MembershipStatus.ACTIVE;

            // Update membership fields but DON'T set status to ACTIVE yet
            // Let activateMembership() handle the status change so it processes included products
            if (!wasActive) {
                membership.status = Constants.MembershipStatus.PENDING; // Reset to pending for reactivation
            }
            if (entityType === Constants.MembershipEntityType.COMMUNITY) {
                membership.role = Constants.MembershipRole.POST;
            }
            membership.paymentPlanId = planId;
            membership.subscriptionId = wooSubscriptionId;
            membership.subscriptionMethod = "woocommerce";
            membership.rejectionReason = undefined;
            await (membership as any).save();

            // Activate membership (adds included products, etc.)
            // This will set status to ACTIVE and process includedProducts
            if (!wasActive) {
                await activateMembership(domain, membership, paymentPlan);

                info(`WooCommerce integration: Reactivated membership`, {
                    domain: domain.name,
                    userId: user.userId,
                    entityId,
                    entityType,
                    membershipId: membership.membershipId,
                });
            } else {
                info(`WooCommerce integration: Membership already active`, {
                    domain: domain.name,
                    userId: user.userId,
                    entityId,
                    entityType,
                    membershipId: membership.membershipId,
                });
            }
        } else {
            // Create new membership
            membership = await MembershipModel.create({
                domain: domain._id,
                userId: user.userId,
                entityId,
                entityType,
                paymentPlanId: planId,
                status: Constants.MembershipStatus.PENDING,
                role:
                    entityType === Constants.MembershipEntityType.COMMUNITY
                        ? Constants.MembershipRole.COMMENT
                        : undefined,
                subscriptionId: wooSubscriptionId,
                subscriptionMethod: "woocommerce",
                joiningReason: communityId
                    ? "WooCommerce Subscription"
                    : "WooCommerce Purchase",
            });

            // Activate membership
            await activateMembership(domain, membership, paymentPlan);

            info(`WooCommerce integration: Created and activated membership`, {
                domain: domain.name,
                userId: user.userId,
                entityId,
                entityType,
                membershipId: membership.membershipId,
            });
        }

        return NextResponse.json({
            success: true,
            membershipId: membership.membershipId,
            userId: user.userId,
            status: membership.status,
        });
    } catch (err: any) {
        error(`WooCommerce grant membership error: ${err.message}`, {
            stack: err.stack,
        });

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
