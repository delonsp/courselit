import { NextRequest, NextResponse } from "next/server";
import DomainModel, { Domain } from "@models/Domain";
import UserModel from "@models/User";
import MembershipModel from "@models/Membership";
import { Constants, Membership, User } from "@courselit/common-models";
import { deleteMembershipsActivatedViaPaymentPlan } from "@/graphql/paymentplans/logic";
import { error, info } from "@/services/logger";
import mongoose from "mongoose";

interface WooRevokeRequest {
    email: string;
    communityId: string;
    wooSubscriptionId?: string;
    reason?: string;
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

async function getDomain(domainName: string | null): Promise<(Domain & { _id: mongoose.Types.ObjectId }) | null> {
    if (!domainName) return null;
    return DomainModel.findOne({ name: domainName });
}

export async function POST(req: NextRequest) {
    try {
        // Validate WooCommerce secret
        if (!(await validateWooSecret(req))) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const domainName = req.headers.get("domain");
        const domain = await getDomain(domainName);

        if (!domain) {
            return NextResponse.json(
                { error: "Domain not found" },
                { status: 404 }
            );
        }

        const body: WooRevokeRequest = await req.json();
        const { email, communityId, wooSubscriptionId, reason } = body;

        // Validate required fields
        if (!email || !communityId) {
            return NextResponse.json(
                { error: "Missing required fields: email, communityId" },
                { status: 400 }
            );
        }

        // Find the user
        const user = await UserModel.findOne<User>({
            domain: domain._id,
            email: email.toLowerCase().trim(),
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Find the membership
        const membership = await MembershipModel.findOne<Membership>({
            domain: domain._id,
            userId: user.userId,
            entityId: communityId,
            entityType: Constants.MembershipEntityType.COMMUNITY,
        });

        if (!membership) {
            return NextResponse.json(
                { error: "Membership not found" },
                { status: 404 }
            );
        }

        // Check if already revoked
        if (membership.status === Constants.MembershipStatus.EXPIRED ||
            membership.status === Constants.MembershipStatus.REJECTED) {
            return NextResponse.json({
                success: true,
                message: "Membership already revoked",
                membershipId: membership.membershipId,
                status: membership.status,
            });
        }

        // If there's a wooSubscriptionId, verify it matches
        if (wooSubscriptionId && membership.subscriptionId &&
            membership.subscriptionId !== wooSubscriptionId) {
            return NextResponse.json(
                { error: "Subscription ID mismatch" },
                { status: 400 }
            );
        }

        // Delete included products memberships (courses bundled with the plan)
        if (membership.paymentPlanId) {
            await deleteMembershipsActivatedViaPaymentPlan({
                domain: domain._id,
                userId: membership.userId,
                paymentPlanId: membership.paymentPlanId,
            });
        }

        // Update membership status to EXPIRED
        membership.status = Constants.MembershipStatus.EXPIRED;
        membership.rejectionReason = reason || "WooCommerce subscription cancelled/expired";
        await (membership as any).save();

        info(`WooCommerce integration: Revoked membership`, {
            domain: domain.name,
            userId: user.userId,
            communityId,
            membershipId: membership.membershipId,
            reason: membership.rejectionReason,
        });

        return NextResponse.json({
            success: true,
            membershipId: membership.membershipId,
            userId: user.userId,
            status: membership.status,
        });

    } catch (err: any) {
        error(`WooCommerce revoke membership error: ${err.message}`, {
            stack: err.stack,
        });

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
