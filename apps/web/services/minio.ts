import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// MinIO/S3 configuration from environment
const getS3Client = () => {
    const endpoint = process.env.MINIO_ENDPOINT;
    if (!endpoint) {
        throw new Error("MINIO_ENDPOINT is required");
    }

    return new S3Client({
        endpoint: endpoint.startsWith("http")
            ? endpoint
            : `https://${endpoint}`,
        region: process.env.MINIO_REGION || "us-east-1",
        credentials: {
            accessKeyId: process.env.MINIO_ACCESS_KEY || "",
            secretAccessKey: process.env.MINIO_SECRET_KEY || "",
        },
        forcePathStyle: true, // Required for MinIO!
    });
};

const getBucket = () => process.env.MINIO_BUCKET || "courselit-media";
const getPrefix = () => process.env.MINIO_PREFIX || "uploads";
const getCdnEndpoint = () => process.env.MINIO_CDN_ENDPOINT || "";

export interface UploadResult {
    mediaId: string;
    originalFileName: string;
    mimeType: string;
    size: number;
    thumbnail: string;
    file: string;
}

/**
 * Upload a file directly to MinIO
 */
export async function uploadFile(
    fileBuffer: Buffer,
    filename: string,
    contentType: string,
    group: string,
): Promise<UploadResult> {
    const s3Client = getS3Client();
    const bucket = getBucket();
    const prefix = getPrefix();
    const cdnEndpoint = getCdnEndpoint();

    // Generate unique file key
    const mediaId = uuidv4();
    const extension = filename.split(".").pop() || "";
    const fileKey = `${prefix}/${group}/${mediaId}${extension ? "." + extension : ""}`;

    // Upload to MinIO
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: fileKey,
        Body: fileBuffer,
        ContentType: contentType,
        ACL: "public-read",
    });

    await s3Client.send(command);

    // Generate public URL
    const publicUrl = cdnEndpoint
        ? `${cdnEndpoint}/${fileKey}`
        : `${process.env.MINIO_ENDPOINT}/${bucket}/${fileKey}`;

    return {
        mediaId,
        originalFileName: filename,
        mimeType: contentType,
        size: fileBuffer.length,
        thumbnail: publicUrl,
        file: publicUrl,
    };
}

/**
 * Delete a file from MinIO
 */
export async function deleteFile(fileKey: string): Promise<void> {
    const s3Client = getS3Client();
    const bucket = getBucket();

    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: fileKey,
    });

    await s3Client.send(command);
}

/**
 * Check if MinIO is configured
 */
export function isMinioConfigured(): boolean {
    return !!(
        process.env.MINIO_ENDPOINT &&
        process.env.MINIO_ACCESS_KEY &&
        process.env.MINIO_SECRET_KEY &&
        process.env.MINIO_BUCKET
    );
}
