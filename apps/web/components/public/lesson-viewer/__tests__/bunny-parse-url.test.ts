// TOKEN-05: parse Bunny embed URL helper

const BUNNY_EMBED_PATH_REGEX =
    /^https?:\/\/(?:iframe|player)\.mediadelivery\.net\/(?:embed|play)\/(\d+)\/([A-Za-z0-9-]+)/;

function parseBunnyEmbedUrl(
    url: string,
): { libraryId: string; videoId: string } | null {
    const m = url.match(BUNNY_EMBED_PATH_REGEX);
    if (!m) return null;
    return { libraryId: m[1], videoId: m[2] };
}

describe("TOKEN-05: parseBunnyEmbedUrl", () => {
    test("extracts libraryId and videoId from iframe.mediadelivery.net URL", () => {
        expect(
            parseBunnyEmbedUrl(
                "https://iframe.mediadelivery.net/embed/123456/abc-def-123",
            ),
        ).toEqual({ libraryId: "123456", videoId: "abc-def-123" });
    });

    test("extracts from player.mediadelivery.net URL", () => {
        expect(
            parseBunnyEmbedUrl(
                "https://player.mediadelivery.net/embed/9/xyz789",
            ),
        ).toEqual({ libraryId: "9", videoId: "xyz789" });
    });

    test("ignores trailing query string", () => {
        expect(
            parseBunnyEmbedUrl(
                "https://iframe.mediadelivery.net/embed/123/abc?autoplay=1",
            ),
        ).toEqual({ libraryId: "123", videoId: "abc" });
    });

    test("accepts /play/ form (Bunny dashboard alt URL) and returns same shape", () => {
        // Regression guard: lessons whose content was copied from the Bunny
        // dashboard's "Direct Play URL" use /play/<lib>/<video> instead of
        // /embed/<lib>/<video>. Without this branch, parseBunnyEmbedUrl
        // returns null, the client never calls /api/bunny/sign, and the
        // unsigned iframe is rejected by Bunny with 403 when Token
        // Authentication is enabled on the library.
        expect(
            parseBunnyEmbedUrl(
                "https://player.mediadelivery.net/play/629703/b28058e2-631a-49ef-afd0-ea19e953ef2f",
            ),
        ).toEqual({
            libraryId: "629703",
            videoId: "b28058e2-631a-49ef-afd0-ea19e953ef2f",
        });
    });

    test("returns null for non-Bunny URLs", () => {
        expect(
            parseBunnyEmbedUrl("https://www.youtube.com/embed/abc"),
        ).toBeNull();
        expect(parseBunnyEmbedUrl("https://vimeo.com/123456")).toBeNull();
    });

    test("returns null for malformed Bunny URLs", () => {
        expect(
            parseBunnyEmbedUrl("https://iframe.mediadelivery.net/embed/"),
        ).toBeNull();
        expect(
            parseBunnyEmbedUrl(
                "https://iframe.mediadelivery.net/embed/abc/xyz",
            ),
        ).toBeNull();
    });
});
