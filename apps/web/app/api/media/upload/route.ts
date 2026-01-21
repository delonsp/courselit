import { NextRequest } from "next/server";
import { responses } from "@/config/strings";
import { UIConstants as constants } from "@courselit/common-models";
import { checkPermission } from "@courselit/utils";
import User from "@models/User";
import DomainModel, { Domain } from "@models/Domain";
import { auth } from "@/auth";
import { error } from "@/services/logger";
import * as minioService from "@/services/minio";

// Timeout for uploads (60 seconds) - Vercel/serverless specific
export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const domain = await DomainModel.findOne<Domain>({
        name: req.headers.get("domain"),
    });
    if (!domain) {
        return Response.json({ message: "Domain not found" }, { status: 404 });
    }

    const session = await auth();

    let user;
    if (session) {
        user = await User.findOne({
            email: session.user!.email,
            domain: domain._id,
            active: true,
        });
    }

    if (!user) {
        return Response.json({}, { status: 401 });
    }

    if (
        !checkPermission(user!.permissions, [constants.permissions.manageMedia])
    ) {
        return Response.json(
            { message: responses.action_not_allowed },
            { status: 403 },
        );
    }

    // Check MinIO configuration
    if (!minioService.isMinioConfigured()) {
        return Response.json(
            {
                error: "MinIO is not configured. Please set MINIO_* environment variables.",
            },
            { status: 500 },
        );
    }

    try {
        // Get the form data from the request
        const formData = await req.formData();

        // Extract file and other fields
        const file = formData.get("file") as File | null;
        const caption = (formData.get("caption") as string) || "";
        const access = (formData.get("access") as string) || "public";

        if (!file) {
            return Response.json(
                { error: "No file provided" },
                { status: 400 },
            );
        }

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload directly to MinIO
        const result = await minioService.uploadFile(
            buffer,
            file.name,
            file.type || "application/octet-stream",
            domain.name,
        );

        // Return response in MediaLit-compatible format
        return Response.json({
            mediaId: result.mediaId,
            originalFileName: result.originalFileName,
            mimeType: result.mimeType,
            size: result.size,
            thumbnail: result.thumbnail,
            file: result.file,
            caption,
            access,
        });
    } catch (err: any) {
        error(`Upload error: ${err.message}`, {
            stack: err.stack,
        });
        return Response.json({ error: err.message }, { status: 500 });
    }
}
