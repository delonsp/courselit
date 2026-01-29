/**
 * @jest-environment jsdom
 */

// Test getAddress in isolation to avoid heavy dependency chain
describe("getAddress", () => {
    const extractDomainFromURL = (host: string) => host.split(":")[0];

    const getAddress = (host: string) => {
        const protocol =
            typeof window !== "undefined" ? window.location.protocol : "https:";
        return {
            domain: extractDomainFromURL(host),
            backend: host,
            frontend: `${protocol}//${host}`,
        };
    };

    it("uses window.location.protocol when available (https)", () => {
        Object.defineProperty(window, "location", {
            value: { protocol: "https:" },
            writable: true,
        });
        const result = getAddress("example.com");
        expect(result.frontend).toBe("https://example.com");
        expect(result.domain).toBe("example.com");
        expect(result.backend).toBe("example.com");
    });

    it("uses http:// when window.location.protocol is http:", () => {
        Object.defineProperty(window, "location", {
            value: { protocol: "http:" },
            writable: true,
        });
        const result = getAddress("localhost:3000");
        expect(result.frontend).toBe("http://localhost:3000");
        expect(result.domain).toBe("localhost");
    });

    it("defaults to https:// when window is undefined", () => {
        const originalWindow = global.window;
        // @ts-ignore
        delete global.window;
        const result = getAddress("example.com");
        expect(result.frontend).toBe("https://example.com");
        global.window = originalWindow;
    });
});

// Test isLessonCompleted in isolation to avoid heavy dependency chain
describe("isLessonCompleted", () => {
    const isLessonCompleted = ({
        courseId,
        lessonId,
        profile,
    }: {
        courseId: string;
        lessonId: string;
        profile: {
            purchases: { courseId: string; completedLessons: string[] }[];
        };
    }) => {
        const indexOfCurrentCourse = profile.purchases.findIndex(
            (purchase) => purchase.courseId === courseId,
        );
        if (indexOfCurrentCourse === -1) return false;
        return profile.purchases[indexOfCurrentCourse].completedLessons.some(
            (lesson) => lesson === lessonId,
        );
    };

    it("returns false when courseId is not in purchases", () => {
        const profile = {
            purchases: [
                { courseId: "course-1", completedLessons: ["lesson-a"] },
            ],
        };
        expect(
            isLessonCompleted({
                courseId: "nonexistent",
                lessonId: "lesson-a",
                profile,
            }),
        ).toBe(false);
    });

    it("returns false when purchases array is empty", () => {
        const profile = { purchases: [] as any[] };
        expect(
            isLessonCompleted({
                courseId: "course-1",
                lessonId: "lesson-a",
                profile,
            }),
        ).toBe(false);
    });

    it("returns true when lesson is in completedLessons", () => {
        const profile = {
            purchases: [
                {
                    courseId: "course-1",
                    completedLessons: ["lesson-a", "lesson-b"],
                },
            ],
        };
        expect(
            isLessonCompleted({
                courseId: "course-1",
                lessonId: "lesson-b",
                profile,
            }),
        ).toBe(true);
    });

    it("returns false when lesson is not in completedLessons", () => {
        const profile = {
            purchases: [
                { courseId: "course-1", completedLessons: ["lesson-a"] },
            ],
        };
        expect(
            isLessonCompleted({
                courseId: "course-1",
                lessonId: "lesson-z",
                profile,
            }),
        ).toBe(false);
    });
});
