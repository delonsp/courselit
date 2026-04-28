import {
    canUserAccessVideoLesson,
    lessonReferencesVideo,
} from "../authorize-video";

const lesson = { courseId: "course-1", requiresEnrollment: true };

describe("canUserAccessVideoLesson", () => {
    it("returns false when user is null", () => {
        expect(canUserAccessVideoLesson(null, lesson, true)).toBe(false);
    });

    it("returns true for admin with manageAnyCourse permission even without membership", () => {
        const admin = { permissions: ["course:manage_any"] };
        expect(canUserAccessVideoLesson(admin, lesson, false)).toBe(true);
    });

    it("returns true when user has an active membership for the courseId", () => {
        const user = { permissions: [] };
        expect(canUserAccessVideoLesson(user, lesson, true)).toBe(true);
    });

    it("returns false when user has no active membership for the courseId", () => {
        const user = { permissions: [] };
        expect(canUserAccessVideoLesson(user, lesson, false)).toBe(false);
    });

    it("returns true when lesson does not require enrollment", () => {
        const open = { courseId: "course-1", requiresEnrollment: false };
        const user = { permissions: [] };
        expect(canUserAccessVideoLesson(user, open, false)).toBe(true);
    });

    it("returns false for empty user fields without membership", () => {
        expect(canUserAccessVideoLesson({}, lesson, false)).toBe(false);
    });
});

describe("lessonReferencesVideo", () => {
    it("returns true when content.value contains libraryId/videoId pair", () => {
        const url = "https://iframe.mediadelivery.net/embed/123456/abc-def-ghi";
        expect(lessonReferencesVideo(url, "123456", "abc-def-ghi")).toBe(true);
    });

    it("returns false when libraryId does not match", () => {
        const url = "https://iframe.mediadelivery.net/embed/999999/abc-def-ghi";
        expect(lessonReferencesVideo(url, "123456", "abc-def-ghi")).toBe(false);
    });

    it("returns false when videoId does not match", () => {
        const url = "https://iframe.mediadelivery.net/embed/123456/other-video";
        expect(lessonReferencesVideo(url, "123456", "abc-def-ghi")).toBe(false);
    });

    it("returns false when content is empty/null/undefined", () => {
        expect(lessonReferencesVideo(null, "123456", "abc")).toBe(false);
        expect(lessonReferencesVideo(undefined, "123456", "abc")).toBe(false);
        expect(lessonReferencesVideo("", "123456", "abc")).toBe(false);
    });
});
