/** @type {import('next').NextConfig} */

const { version } = require("./package.json");

const s3Host = process.env.S3_HOST || process.env.MINIO_HOST;

const remotePatterns = [
    {
        protocol: "https",
        hostname: "**",
    },
];

remotePatterns.push({
    protocol: "https",
    hostname: "s3.drsolution.online",
});

if (s3Host && s3Host !== "s3.drsolution.online") {
    remotePatterns.push({
        protocol: "https",
        hostname: s3Host,
    });
}

const nextConfig = {
    output: "standalone",
    env: {
        version,
    },
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns,
    },
    transpilePackages: [
        "@courselit/page-blocks",
        "@courselit/components-library",
    ],
    serverExternalPackages: ["pug", "liquidjs", "mongoose", "mongodb"],
    experimental: {
        serverActions: {
            bodySizeLimit: "50mb",
        },
    },
    async headers() {
        // CSP frame-src whitelist. Audit results (HARDEN-01-FIX-CSP):
        // - 'self': internal preview routes (/certificate/[id], /dashboard/mail/.../internal)
        //   and email previews via srcDoc (about:srcdoc inherits 'self').
        // - Bunny.net Stream: iframe.mediadelivery.net, video.bunnycdn.com
        //   (lesson type Embed + signed URLs via /api/bunny/sign).
        // - YouTube: www.youtube.com, www.youtube-nocookie.com, youtube.com
        //   (community media type "youtube" embeds).
        // - Vimeo: player.vimeo.com (legacy embeds; no current usage in repo
        //   but kept to avoid breaking instructor-pasted embeds).
        // - S3/MinIO host(s): PDF lessons render via <iframe src={lesson.media.file}>
        //   pointing at the configured S3 host (S3_HOST or MINIO_HOST).
        // When adding new embed providers, update this list AND the audit comment.
        const frameSources = [
            "'self'",
            "https://iframe.mediadelivery.net",
            "https://video.bunnycdn.com",
            "https://www.youtube.com",
            "https://www.youtube-nocookie.com",
            "https://youtube.com",
            "https://player.vimeo.com",
            "https://s3.drsolution.online",
        ];
        if (s3Host && s3Host !== "s3.drsolution.online") {
            frameSources.push(`https://${s3Host}`);
        }
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: `frame-src ${frameSources.join(" ")};`,
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
