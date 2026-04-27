// WM-02: URL detection for Bunny embeds at LessonViewer call site
// Mirrors the regex used in lesson-viewer/index.tsx to gate watermark prop.

const BUNNY_HOST_RE = /mediadelivery\.net|b-cdn\.net/;

describe("WM-02: Bunny URL detection", () => {
    it("matches iframe.mediadelivery.net URLs", () => {
        expect(
            BUNNY_HOST_RE.test(
                "https://iframe.mediadelivery.net/embed/12345/abc-def",
            ),
        ).toBe(true);
    });

    it("matches player.mediadelivery.net URLs", () => {
        expect(
            BUNNY_HOST_RE.test(
                "https://player.mediadelivery.net/play/12345/abc",
            ),
        ).toBe(true);
    });

    it("matches b-cdn.net URLs", () => {
        expect(
            BUNNY_HOST_RE.test("https://vz-abc.b-cdn.net/playlist.m3u8"),
        ).toBe(true);
    });

    it("does not match YouTube URLs", () => {
        expect(BUNNY_HOST_RE.test("https://www.youtube.com/embed/abc123")).toBe(
            false,
        );
    });

    it("does not match Vimeo URLs", () => {
        expect(BUNNY_HOST_RE.test("https://player.vimeo.com/video/123")).toBe(
            false,
        );
    });

    it("does not match empty string", () => {
        expect(BUNNY_HOST_RE.test("")).toBe(false);
    });
});
