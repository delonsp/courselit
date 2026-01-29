/**
 * Tests for markCompleteAndNext error handling in LessonViewer.
 * US-018: Navigation should only proceed if markLessonCompleted succeeds.
 */

function createMarkCompleteAndNext({
    fetchExec,
    toast,
    navigateTo,
    updateProfile,
}: {
    fetchExec: () => Promise<{ result: boolean }>;
    toast: (opts: {
        title: string;
        description: string;
        variant: string;
    }) => void;
    navigateTo: (path: string) => void;
    updateProfile: () => Promise<void>;
}) {
    return async function markCompleteAndNext(
        lesson: { lessonId: string; nextLesson?: string; courseId: string },
        slug: string,
    ) {
        try {
            const response = await fetchExec();
            if (response.result) {
                if (lesson.nextLesson) {
                    await updateProfile();
                    navigateTo(
                        `/course/${slug}/${lesson.courseId}/${lesson.nextLesson}`,
                    );
                } else {
                    navigateTo(`/dashboard/my-content`);
                }
            } else {
                toast({
                    title: "Error",
                    description:
                        "Não foi possível marcar a aula como concluída. Tente novamente.",
                    variant: "destructive",
                });
            }
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message,
                variant: "destructive",
            });
        }
    };
}

describe("markCompleteAndNext error handling", () => {
    const lesson = { lessonId: "l1", nextLesson: "l2", courseId: "c1" };
    const slug = "test-course";

    test("navigates to next lesson on success", async () => {
        const toast = jest.fn();
        const navigateTo = jest.fn();
        const updateProfile = jest.fn().mockResolvedValue(undefined);
        const fn = createMarkCompleteAndNext({
            fetchExec: () => Promise.resolve({ result: true }),
            toast,
            navigateTo,
            updateProfile,
        });
        await fn(lesson, slug);
        expect(navigateTo).toHaveBeenCalledWith("/course/test-course/c1/l2");
        expect(toast).not.toHaveBeenCalled();
    });

    test("navigates to my-content when no nextLesson", async () => {
        const toast = jest.fn();
        const navigateTo = jest.fn();
        const fn = createMarkCompleteAndNext({
            fetchExec: () => Promise.resolve({ result: true }),
            toast,
            navigateTo,
            updateProfile: jest.fn().mockResolvedValue(undefined),
        });
        await fn({ lessonId: "l1", courseId: "c1" }, slug);
        expect(navigateTo).toHaveBeenCalledWith("/dashboard/my-content");
        expect(toast).not.toHaveBeenCalled();
    });

    test("does NOT navigate on fetch exception, shows error toast", async () => {
        const toast = jest.fn();
        const navigateTo = jest.fn();
        const fn = createMarkCompleteAndNext({
            fetchExec: () => Promise.reject(new Error("Network error")),
            toast,
            navigateTo,
            updateProfile: jest.fn(),
        });
        await fn(lesson, slug);
        expect(navigateTo).not.toHaveBeenCalled();
        expect(toast).toHaveBeenCalledWith(
            expect.objectContaining({
                variant: "destructive",
                description: "Network error",
            }),
        );
    });

    test("does NOT navigate when result is false, shows error toast", async () => {
        const toast = jest.fn();
        const navigateTo = jest.fn();
        const fn = createMarkCompleteAndNext({
            fetchExec: () => Promise.resolve({ result: false }),
            toast,
            navigateTo,
            updateProfile: jest.fn(),
        });
        await fn(lesson, slug);
        expect(navigateTo).not.toHaveBeenCalled();
        expect(toast).toHaveBeenCalledWith(
            expect.objectContaining({ variant: "destructive" }),
        );
    });
});
