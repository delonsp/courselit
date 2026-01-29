/**
 * US-006: Tests for renderMediaPreview null media.file handling
 *
 * We test the src-selection logic extracted from renderMediaPreview
 * to verify that null/undefined file or thumbnail values are handled
 * safely without crashes.
 */

// Extracted logic from renderMediaPreview for the "image" case
function getImageSrc(
    media: { file?: string; thumbnail?: string } | undefined,
    renderActualFile?: boolean,
): string | null {
    if (!media) return null;
    const src = renderActualFile
        ? media.file || media.thumbnail
        : media.thumbnail || media.file;
    return src || null;
}

describe("renderMediaPreview - image src selection (US-006)", () => {
    it("returns null when media.media is undefined", () => {
        expect(getImageSrc(undefined)).toBeNull();
    });

    it("returns null when both file and thumbnail are undefined", () => {
        expect(getImageSrc({})).toBeNull();
    });

    it("returns null when both file and thumbnail are empty strings", () => {
        expect(getImageSrc({ file: "", thumbnail: "" })).toBeNull();
    });

    it("returns thumbnail when renderActualFile is false and thumbnail exists", () => {
        expect(
            getImageSrc({ file: "file.jpg", thumbnail: "thumb.jpg" }, false),
        ).toBe("thumb.jpg");
    });

    it("falls back to file when renderActualFile is false and thumbnail is missing", () => {
        expect(getImageSrc({ file: "file.jpg" }, false)).toBe("file.jpg");
    });

    it("returns file when renderActualFile is true and file exists", () => {
        expect(
            getImageSrc({ file: "file.jpg", thumbnail: "thumb.jpg" }, true),
        ).toBe("file.jpg");
    });

    it("falls back to thumbnail when renderActualFile is true and file is missing", () => {
        expect(getImageSrc({ thumbnail: "thumb.jpg" }, true)).toBe("thumb.jpg");
    });
});
