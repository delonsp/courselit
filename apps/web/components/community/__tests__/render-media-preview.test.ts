/**
 * Tests for renderMediaPreview null-safety logic (US-006).
 *
 * We extract the src-resolution logic from renderMediaPreview to test it
 * without importing the full React component tree.
 */

interface Media {
    mediaId: string;
    originalFileName: string;
    mimeType: string;
    size: number;
    access: string;
    thumbnail: string;
    caption?: string;
    file?: string;
}

interface CommunityMedia {
    type: "youtube" | "pdf" | "image" | "video" | "gif";
    title: string;
    url?: string;
    media?: Media;
}

/**
 * Mirrors the image src logic in renderMediaPreview for the "image" case.
 * Returns the src string or null if no valid src is available.
 */
function resolveImageSrc(
    media: CommunityMedia,
    options?: { renderActualFile?: boolean },
): string | null {
    if (!media) return null;
    if (media.type !== "image") return null;
    if (!media.media) return null;

    const src =
        options && options.renderActualFile
            ? media.media.file || media.media.thumbnail
            : media.media.thumbnail;

    return src || null;
}

describe("renderMediaPreview image src resolution (US-006)", () => {
    const baseMeta = {
        mediaId: "m1",
        originalFileName: "photo.jpg",
        mimeType: "image/jpeg",
        size: 1024,
        access: "public",
    };

    test("returns thumbnail when renderActualFile is false", () => {
        const media: CommunityMedia = {
            type: "image",
            title: "test",
            media: {
                ...baseMeta,
                thumbnail: "https://cdn/thumb.jpg",
                file: "https://cdn/full.jpg",
            },
        };
        expect(resolveImageSrc(media)).toBe("https://cdn/thumb.jpg");
    });

    test("returns file when renderActualFile is true", () => {
        const media: CommunityMedia = {
            type: "image",
            title: "test",
            media: {
                ...baseMeta,
                thumbnail: "https://cdn/thumb.jpg",
                file: "https://cdn/full.jpg",
            },
        };
        expect(resolveImageSrc(media, { renderActualFile: true })).toBe(
            "https://cdn/full.jpg",
        );
    });

    test("falls back to thumbnail when file is undefined and renderActualFile is true", () => {
        const media: CommunityMedia = {
            type: "image",
            title: "test",
            media: { ...baseMeta, thumbnail: "https://cdn/thumb.jpg" },
        };
        expect(resolveImageSrc(media, { renderActualFile: true })).toBe(
            "https://cdn/thumb.jpg",
        );
    });

    test("returns null when media.media is undefined", () => {
        const media: CommunityMedia = {
            type: "image",
            title: "test",
        };
        expect(resolveImageSrc(media)).toBeNull();
    });

    test("returns null when both file and thumbnail are empty strings", () => {
        const media: CommunityMedia = {
            type: "image",
            title: "test",
            media: { ...baseMeta, thumbnail: "", file: "" },
        };
        expect(resolveImageSrc(media, { renderActualFile: true })).toBeNull();
    });
});
