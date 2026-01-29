import {
    isEmbedUrlAllowed,
    EMBED_ALLOWED_DOMAINS,
} from "@courselit/common-models/src/ui-constants";

describe("Embed URL allowlist validation", () => {
    it("accepts Bunny.net iframe URLs", () => {
        expect(
            isEmbedUrlAllowed("https://iframe.mediadelivery.net/embed/123/abc"),
        ).toBe(true);
    });

    it("accepts Bunny.net player URLs", () => {
        expect(
            isEmbedUrlAllowed("https://player.mediadelivery.net/embed/123/abc"),
        ).toBe(true);
    });

    it("accepts YouTube URLs", () => {
        expect(isEmbedUrlAllowed("https://www.youtube.com/embed/abc123")).toBe(
            true,
        );
    });

    it("accepts youtu.be URLs", () => {
        expect(isEmbedUrlAllowed("https://youtu.be/abc123")).toBe(true);
    });

    it("accepts Vimeo URLs", () => {
        expect(isEmbedUrlAllowed("https://vimeo.com/123456")).toBe(true);
        expect(isEmbedUrlAllowed("https://player.vimeo.com/video/123456")).toBe(
            true,
        );
    });

    it("rejects random domain", () => {
        expect(isEmbedUrlAllowed("https://evil.example.com/embed")).toBe(false);
    });

    it("rejects invalid URL", () => {
        expect(isEmbedUrlAllowed("not-a-url")).toBe(false);
    });

    it("has the expected allowed domains", () => {
        expect(EMBED_ALLOWED_DOMAINS).toContain("mediadelivery.net");
        expect(EMBED_ALLOWED_DOMAINS).toContain("youtube.com");
        expect(EMBED_ALLOWED_DOMAINS).toContain("youtu.be");
        expect(EMBED_ALLOWED_DOMAINS).toContain("vimeo.com");
        expect(EMBED_ALLOWED_DOMAINS).toContain("player.vimeo.com");
    });
});
