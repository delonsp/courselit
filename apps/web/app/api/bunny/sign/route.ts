import { NextRequest } from "next/server";
import { auth } from "@/auth";
import User from "@models/User";
import DomainModel, { Domain } from "@models/Domain";
import LessonModel from "@models/Lesson";
import Membership from "@models/Membership";
import { getLibraryKey, signBunnyEmbedUrl } from "@/lib/bunny/sign-url";
import {
    canUserAccessVideoLesson,
    lessonReferencesVideo,
} from "@/lib/bunny/authorize-video";
import { logBunnySignEvent } from "@/lib/bunny/log-sign-event";

const DEFAULT_TTL_SECONDS = 7200;

function getTtl(): number {
    const raw = process.env.BUNNY_TOKEN_TTL_SECONDS;
    if (!raw) return DEFAULT_TTL_SECONDS;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : DEFAULT_TTL_SECONDS;
}

export async function POST(req: NextRequest) {
    const domain = await DomainModel.findOne<Domain>({
        name: req.headers.get("domain"),
    });
    if (!domain) {
        return Response.json({ message: "Domain not found" }, { status: 404 });
    }

    const session = await auth();
    if (!session?.user?.email) {
        return Response.json({}, { status: 401 });
    }

    const user = await User.findOne({
        email: session.user.email,
        domain: domain._id,
        active: true,
    });
    if (!user) {
        return Response.json({}, { status: 401 });
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return Response.json({ message: "Invalid JSON" }, { status: 400 });
    }

    const { videoId, libraryId, lessonId } = (body ?? {}) as {
        videoId?: unknown;
        libraryId?: unknown;
        lessonId?: unknown;
    };
    if (typeof videoId !== "string" || !videoId) {
        return Response.json(
            { message: "videoId is required" },
            { status: 400 },
        );
    }
    if (typeof libraryId !== "string" || !libraryId) {
        return Response.json(
            { message: "libraryId is required" },
            { status: 400 },
        );
    }
    if (typeof lessonId !== "string" || !lessonId) {
        return Response.json(
            { message: "lessonId is required" },
            { status: 400 },
        );
    }

    const lesson = await LessonModel.findOne({
        domain: domain._id,
        lessonId,
        type: "embed",
    });

    if (!lesson) {
        return Response.json({ message: "Lesson not found" }, { status: 404 });
    }

    const contentValue = (lesson.content as { value?: string } | undefined)
        ?.value;
    if (!lessonReferencesVideo(contentValue, libraryId, videoId)) {
        return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    const membership = await Membership.findOne({
        domain: domain._id,
        userId: user.userId,
        entityId: lesson.courseId,
        entityType: "course",
        status: "active",
    });

    if (!canUserAccessVideoLesson(user, lesson, !!membership)) {
        return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    if (!getLibraryKey(libraryId)) {
        return Response.json(
            { message: "Library key not configured" },
            { status: 500 },
        );
    }

    const url = signBunnyEmbedUrl({
        libraryId,
        videoId,
        ttlSeconds: getTtl(),
    });
    if (!url) {
        return Response.json(
            { message: "Failed to sign URL" },
            { status: 500 },
        );
    }

    logBunnySignEvent({
        userId: String(user.userId ?? user._id),
        videoId,
        libraryId,
        ip:
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            null,
        userAgent: req.headers.get("user-agent") || null,
    });

    return Response.json({ url });
}
