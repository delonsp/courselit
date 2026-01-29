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
};

module.exports = nextConfig;
