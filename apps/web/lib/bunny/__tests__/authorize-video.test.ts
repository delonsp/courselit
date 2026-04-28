import { canUserAccessVideoLesson } from "../authorize-video";

const lesson = { courseId: "course-1", requiresEnrollment: true };

describe("canUserAccessVideoLesson", () => {
    it("returns false when user is null", () => {
        expect(canUserAccessVideoLesson(null, lesson)).toBe(false);
    });

    it("returns true for admin with manageAnyCourse permission", () => {
        const admin = {
            permissions: ["course:manage_any"],
            purchases: [],
        };
        expect(canUserAccessVideoLesson(admin, lesson)).toBe(true);
    });

    it("returns true when user has a purchase for the courseId", () => {
        const user = {
            permissions: [],
            purchases: [{ courseId: "course-1" }],
        };
        expect(canUserAccessVideoLesson(user, lesson)).toBe(true);
    });

    it("returns false when user has no purchase for the courseId", () => {
        const user = {
            permissions: [],
            purchases: [{ courseId: "other-course" }],
        };
        expect(canUserAccessVideoLesson(user, lesson)).toBe(false);
    });

    it("returns true when lesson does not require enrollment", () => {
        const open = { courseId: "course-1", requiresEnrollment: false };
        const user = { permissions: [], purchases: [] };
        expect(canUserAccessVideoLesson(user, open)).toBe(true);
    });

    it("returns false for empty user fields", () => {
        expect(canUserAccessVideoLesson({}, lesson)).toBe(false);
    });
});
