import { NextRequest } from "next/server";
import { auth } from "@/auth";
import User from "@models/User";
import DomainModel, { Domain } from "@models/Domain";
import LessonModel from "@models/Lesson";
import { getLibraryKey, signBunnyEmbedUrl } from "@/lib/bunny/sign-url";
import { canUserAccessVideoLesson } from "@/lib/bunny/authorize-video";

const DEFAULT_TTL_SECONDS = 7200;

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

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

    const { videoId, libraryId } = (body ?? {}) as {
        videoId?: unknown;
        libraryId?: unknown;
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

    const lesson = await LessonModel.findOne({
        domain: domain._id,
        type: "embed",
        "content.value": {
            $regex: `${escapeRegExp(libraryId)}/${escapeRegExp(videoId)}`,
        },
    });

    if (!lesson) {
        return Response.json(
            { message: "Lesson not found for video" },
            { status: 404 },
        );
    }

    if (!canUserAccessVideoLesson(user, lesson)) {
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

    return Response.json({ url });
}
