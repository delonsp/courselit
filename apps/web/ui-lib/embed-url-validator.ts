/**
 * Validates embed URLs against an allowlist of safe domains.
 */

const EMBED_ALLOWLIST = [
    "mediadelivery.net",
    "youtube.com",
    "youtu.be",
    "vimeo.com",
    "player.vimeo.com",
];

export function isEmbedUrlAllowed(url: string): boolean {
    try {
        const parsed = new URL(url);
        const hostname = parsed.hostname.toLowerCase();
        return EMBED_ALLOWLIST.some(
            (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
        );
    } catch {
        return false;
    }
}

export { EMBED_ALLOWLIST };
