import { createHash } from "crypto";

let cachedKeys: Record<string, string> | null = null;
let cachedRaw: string | undefined;

function loadKeys(): Record<string, string> {
    const raw = process.env.BUNNY_LIBRARY_KEYS;
    if (raw === cachedRaw && cachedKeys !== null) {
        return cachedKeys;
    }
    cachedRaw = raw;
    if (!raw) {
        cachedKeys = {};
        return cachedKeys;
    }
    try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            const out: Record<string, string> = {};
            for (const [k, v] of Object.entries(parsed)) {
                if (typeof v === "string") out[k] = v;
            }
            cachedKeys = out;
        } else {
            cachedKeys = {};
        }
    } catch {
        // eslint-disable-next-line no-console
        console.warn(
            "[bunny/sign-url] BUNNY_LIBRARY_KEYS is not valid JSON; ignoring.",
        );
        cachedKeys = {};
    }
    return cachedKeys;
}

export function getLibraryKey(libraryId: string): string | null {
    const keys = loadKeys();
    return keys[libraryId] ?? null;
}

export function signBunnyEmbedUrl(opts: {
    libraryId: string;
    videoId: string;
    ttlSeconds: number;
}): string | null {
    const { libraryId, videoId, ttlSeconds } = opts;
    const key = getLibraryKey(libraryId);
    if (!key) return null;
    const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
    const token = createHash("sha256")
        .update(key + videoId + expires)
        .digest("hex");
    return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?token=${token}&expires=${expires}`;
}

export function __resetBunnySignUrlCacheForTests(): void {
    cachedKeys = null;
    cachedRaw = undefined;
}
