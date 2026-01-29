/**
 * Tests for formatCourse helpers.
 * US-002: Handle undefined lessonsOrder and missing lessonId.
 * US-012: Handle orphaned lessons with console.warn.
 */

describe("orphaned lessons warning (US-012)", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    afterEach(() => {
        warnSpy.mockClear();
    });

    afterAll(() => {
        warnSpy.mockRestore();
    });

    function detectOrphans(
        lessons: { lessonId: string; groupId: string }[],
        groups: { id: string }[],
    ) {
        const groupIds = new Set(groups.map((g) => g.id));
        const orphaned = lessons.filter((l) => !groupIds.has(l.groupId));
        if (orphaned.length > 0) {
            console.warn(
                `[formatCourse] ${orphaned.length} orphaned lesson(s) found (groupId not matching any group):`,
                orphaned.map((l) => ({
                    lessonId: l.lessonId,
                    groupId: l.groupId,
                })),
            );
        }
        return orphaned;
    }

    it("logs console.warn for orphaned lessons", () => {
        const lessons = [
            { lessonId: "l1", groupId: "g1" },
            { lessonId: "l2", groupId: "nonexistent" },
        ];
        const groups = [{ id: "g1" }];
        const orphaned = detectOrphans(lessons, groups);
        expect(orphaned).toHaveLength(1);
        expect(orphaned[0].lessonId).toBe("l2");
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining("1 orphaned lesson(s)"),
            expect.arrayContaining([
                expect.objectContaining({
                    lessonId: "l2",
                    groupId: "nonexistent",
                }),
            ]),
        );
    });

    it("does not warn when no orphaned lessons exist", () => {
        const lessons = [{ lessonId: "l1", groupId: "g1" }];
        const groups = [{ id: "g1" }];
        const orphaned = detectOrphans(lessons, groups);
        expect(orphaned).toHaveLength(0);
        expect(warnSpy).not.toHaveBeenCalled();
    });
});

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
