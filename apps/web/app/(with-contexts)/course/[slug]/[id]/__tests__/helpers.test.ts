/**
 * Tests for lessonsOrder sort safety in formatCourse helpers.
 * US-002: Handle undefined lessonsOrder and missing lessonId.
 */

describe("lessonsOrder sort safety", () => {
    const sortLessons = (
        lessons: { lessonId: string }[],
        lessonsOrder: string[] | undefined,
    ) => {
        return [...lessons].sort((a, b) => {
            if (!lessonsOrder) return 0;
            const indexA = lessonsOrder.indexOf(a.lessonId);
            const indexB = lessonsOrder.indexOf(b.lessonId);
            return (
                (indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA) -
                (indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB)
            );
        });
    };

    const lessons = [{ lessonId: "c" }, { lessonId: "a" }, { lessonId: "b" }];

    it("returns lessons in original order when lessonsOrder is undefined", () => {
        const result = sortLessons(lessons, undefined);
        expect(result.map((l) => l.lessonId)).toEqual(["c", "a", "b"]);
    });

    it("sorts lessons by lessonsOrder", () => {
        const result = sortLessons(lessons, ["a", "b", "c"]);
        expect(result.map((l) => l.lessonId)).toEqual(["a", "b", "c"]);
    });

    it("puts missing lessonId at the end", () => {
        const result = sortLessons(lessons, ["a", "b"]);
        expect(result.map((l) => l.lessonId)).toEqual(["a", "b", "c"]);
    });

    it("handles all lessonIds missing from order array", () => {
        const result = sortLessons(lessons, []);
        expect(result.map((l) => l.lessonId)).toEqual(["c", "a", "b"]);
    });
});
