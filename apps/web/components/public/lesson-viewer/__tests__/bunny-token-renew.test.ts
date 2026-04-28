// TOKEN-06: token renewal helpers

const TOKEN_RENEW_BUFFER_SECONDS = 300;

function parseExpiresFromSignedUrl(url: string | null): number | null {
    if (!url) return null;
    const m = url.match(/[?&]expires=(\d+)/);
    if (!m) return null;
    const n = parseInt(m[1], 10);
    return Number.isFinite(n) ? n : null;
}

function shouldRenewToken(
    expires: number | null,
    nowSeconds: number,
    bufferSeconds: number = TOKEN_RENEW_BUFFER_SECONDS,
): boolean {
    if (expires == null) return false;
    return expires - nowSeconds < bufferSeconds;
}

describe("TOKEN-06: parseExpiresFromSignedUrl", () => {
    test("extracts expires from signed URL", () => {
        expect(
            parseExpiresFromSignedUrl(
                "https://iframe.mediadelivery.net/embed/1/v?token=abc&expires=1700000000",
            ),
        ).toBe(1700000000);
    });

    test("returns null for null input", () => {
        expect(parseExpiresFromSignedUrl(null)).toBeNull();
    });

    test("returns null when no expires param", () => {
        expect(
            parseExpiresFromSignedUrl(
                "https://iframe.mediadelivery.net/embed/1/v",
            ),
        ).toBeNull();
    });

    test("works when expires is the first query param", () => {
        expect(
            parseExpiresFromSignedUrl(
                "https://iframe.mediadelivery.net/embed/1/v?expires=42&token=z",
            ),
        ).toBe(42);
    });
});

describe("TOKEN-06: shouldRenewToken", () => {
    test("true when expires is within the buffer window", () => {
        const now = 1_000_000;
        expect(shouldRenewToken(now + 299, now)).toBe(true);
        expect(shouldRenewToken(now + 1, now)).toBe(true);
        expect(shouldRenewToken(now - 50, now)).toBe(true);
    });

    test("false when expires is comfortably in the future", () => {
        const now = 1_000_000;
        expect(shouldRenewToken(now + 3600, now)).toBe(false);
        expect(shouldRenewToken(now + 301, now)).toBe(false);
    });

    test("false when expires is null", () => {
        expect(shouldRenewToken(null, 1_000_000)).toBe(false);
    });

    test("respects custom buffer", () => {
        const now = 1_000_000;
        expect(shouldRenewToken(now + 60, now, 120)).toBe(true);
        expect(shouldRenewToken(now + 120, now, 60)).toBe(false);
    });
});
