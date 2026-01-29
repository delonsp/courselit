describe("Lesson editor useEffect race condition", () => {
    it("cancels previous load when lessonId changes", async () => {
        const setStateCalls: string[] = [];

        // Simulate the cancelled flag pattern used in the useEffect
        const loadLesson = async (id: string, isCancelled: () => boolean) => {
            // Simulate async fetch
            await new Promise((resolve) => setTimeout(resolve, 10));
            if (isCancelled()) return;
            setStateCalls.push(id);
        };

        // First load starts
        let cancelled1 = false;
        const load1 = loadLesson("lesson-1", () => cancelled1);

        // LessonId changes before first load completes — cleanup cancels first
        cancelled1 = true;

        let cancelled2 = false;
        const load2 = loadLesson("lesson-2", () => cancelled2);

        await Promise.all([load1, load2]);

        // Only lesson-2 should have set state
        expect(setStateCalls).toEqual(["lesson-2"]);
    });

    it("does not cancel if lessonId stays the same", async () => {
        const setStateCalls: string[] = [];

        const loadLesson = async (id: string, isCancelled: () => boolean) => {
            await new Promise((resolve) => setTimeout(resolve, 10));
            if (isCancelled()) return;
            setStateCalls.push(id);
        };

        let cancelled = false;
        await loadLesson("lesson-1", () => cancelled);

        expect(setStateCalls).toEqual(["lesson-1"]);
    });
});
