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
        // CSP frame-src whitelist — exhaustive audit (HARDEN-01-FIX-CSP-AUDIT, 2026-04-28).
        //
        // Reproduce the audit:
        //   grep -rn "iframe\|<Iframe\|frame-src" courselit/apps/web courselit/packages \
        //     --include="*.tsx" --include="*.ts" --include="*.jsx" --include="*.js"
        //
        // Concrete iframe usages found and their providers:
        //
        // 1. apps/web/components/public/lesson-viewer/embed-viewer.tsx
        //    → Bunny Stream only (gated by BUNNY_EMBED_REGEX, signed via /api/bunny/sign).
        //    Hosts: iframe.mediadelivery.net (and player.mediadelivery.net via subdomain rule).
        //
        // 2. apps/web/components/public/lesson-viewer/index.tsx (line ~297)
        //    → PDF lesson rendered as <iframe src={lesson.media.file}>.
        //    Host: configured S3/MinIO (S3_HOST / MINIO_HOST, default s3.drsolution.online).
        //
        // 3. apps/web/components/community/index.tsx (lines ~712, ~751)
        //    → YouTube embeds (community media type "youtube") and PDF previews (S3 host).
        //
        // 4. apps/web/app/(with-contexts)/dashboard/(sidebar)/product/[id]/content/section/
        //    [section]/lesson/page.tsx (line ~278)
        //    → Lesson Embed admin preview, gated by UIConstants.BUNNY_EMBED_REGEX (Bunny only).
        //    Lesson Embed input is validated at save time by ui-lib/embed-url-validator.ts,
        //    which restricts to: mediadelivery.net, youtube.com, youtu.be, vimeo.com,
        //    player.vimeo.com — all subset of this whitelist.
        //
        // 5. apps/web/app/(with-contexts)/(with-layout)/accomplishment/[certId]/page.tsx
        //    → Internal certificate preview at src=`/certificate/${certId}` → 'self'.
        //
        // 6. apps/web/app/(with-contexts)/dashboard/mail/sequence/.../page.tsx
        //    apps/web/app/(with-contexts)/dashboard/mail/drip/.../page.tsx
        //    → Internal preview routes (`/dashboard/mail/.../internal`) → 'self'.
        //
        // 7. apps/web/components/admin/mails/email-viewer.tsx
        //    → <iframe srcDoc={...}> — about:srcdoc inherits page origin → 'self'.
        //
        // 8. packages/components-library/src/video-with-preview.tsx
        //    → YouTube (www.youtube.com/embed/<id>) and Vimeo (player.vimeo.com/video/<id>).
        //    videoType detection in detectVideoType() — only those two providers.
        //
        // 9. packages/page-blocks/src/blocks/embed/widget.tsx (page builder block)
        //    → Admin pastes an ARBITRARY URL into the page-builder embed block.
        //    Trade-off (decided): keep frame-src restrictive globally rather than relax per-route.
        //    Admins must paste URLs from already-whitelisted providers. If a future need
        //    arises (e.g. Loom, Calendly, Spotify, Wistia, Google Forms), add the host here
        //    and document it. We accept the operational cost of editing this list over
        //    weakening CSP for arbitrary admin-controlled URLs.
        //
        // No occurrences found of: loom, calendly, gform/google-forms, wistia, spotify,
        // soundcloud, b-cdn, youtu.be (as an embed host), or any other provider domain.
        //
        // Whitelisted hosts (each with the section above that justifies it):
        // - 'self'                          → §5, §6, §7
        // - https://iframe.mediadelivery.net → §1, §4
        // - https://video.bunnycdn.com      → §1 (legacy player domain, kept for safety)
        // - https://www.youtube.com         → §3, §8
        // - https://www.youtube-nocookie.com → §8 (privacy-mode YouTube embeds)
        // - https://youtube.com             → §3 (bare host, defensive)
        // - https://player.vimeo.com        → §8
        // - https://<S3_HOST>               → §2, §3 (PDF previews from MinIO/S3)
        //
        // When adding a new provider: (a) update the section list above, (b) add the host
        // to frameSources, (c) re-run the grep and confirm no other usage of the new host
        // outside the documented call site.
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
