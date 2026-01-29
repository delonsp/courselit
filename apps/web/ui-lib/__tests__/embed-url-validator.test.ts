import { isEmbedUrlAllowed } from "../embed-url-validator";

describe("isEmbedUrlAllowed", () => {
    it("accepts Bunny.net mediadelivery URLs", () => {
        expect(
            isEmbedUrlAllowed(
                "https://iframe.mediadelivery.net/embed/12345/abc",
            ),
        ).toBe(true);
    });

    it("accepts YouTube URLs", () => {
        expect(
            isEmbedUrlAllowed("https://www.youtube.com/watch?v=abc123"),
        ).toBe(true);
    });

    it("accepts youtu.be short URLs", () => {
        expect(isEmbedUrlAllowed("https://youtu.be/abc123")).toBe(true);
    });

    it("accepts Vimeo URLs", () => {
        expect(isEmbedUrlAllowed("https://vimeo.com/123456")).toBe(true);
        expect(isEmbedUrlAllowed("https://player.vimeo.com/video/123456")).toBe(
            true,
        );
    });

    it("rejects random domains", () => {
        expect(isEmbedUrlAllowed("https://evil.com/embed")).toBe(false);
    });

    it("rejects invalid URLs", () => {
        expect(isEmbedUrlAllowed("not-a-url")).toBe(false);
    });

    it("rejects empty string", () => {
        expect(isEmbedUrlAllowed("")).toBe(false);
    });

    it("accepts subdomain of allowed domain", () => {
        expect(
            isEmbedUrlAllowed("https://cdn.mediadelivery.net/video/123"),
        ).toBe(true);
    });

    it("rejects domain that contains but does not end with allowed domain", () => {
        expect(isEmbedUrlAllowed("https://notyoutube.com.evil.com/watch")).toBe(
            false,
        );
    });
});
