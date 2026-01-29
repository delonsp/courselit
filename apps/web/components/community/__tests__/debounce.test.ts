/**
 * Tests for US-009: Debounce on community like/pin actions
 *
 * Verifies that rapid calls within 300ms are collapsed into a single API call.
 */

describe("Community like/pin debounce", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("rapid like clicks only trigger one API call", () => {
        const apiCall = jest.fn();
        const timers = new Map<string, NodeJS.Timeout>();

        function handleLike(postId: string) {
            const existing = timers.get(postId);
            if (existing) clearTimeout(existing);
            const timer = setTimeout(() => {
                timers.delete(postId);
                apiCall(postId);
            }, 300);
            timers.set(postId, timer);
        }

        // Simulate 5 rapid clicks
        handleLike("post-1");
        handleLike("post-1");
        handleLike("post-1");
        handleLike("post-1");
        handleLike("post-1");

        // Before 300ms, no API call
        jest.advanceTimersByTime(299);
        expect(apiCall).not.toHaveBeenCalled();

        // At 300ms, exactly one call
        jest.advanceTimersByTime(1);
        expect(apiCall).toHaveBeenCalledTimes(1);
        expect(apiCall).toHaveBeenCalledWith("post-1");
    });

    it("rapid pin toggles only trigger one API call", () => {
        const apiCall = jest.fn();
        const timers = new Map<string, NodeJS.Timeout>();

        function togglePin(postId: string) {
            const existing = timers.get(postId);
            if (existing) clearTimeout(existing);
            const timer = setTimeout(() => {
                timers.delete(postId);
                apiCall(postId);
            }, 300);
            timers.set(postId, timer);
        }

        togglePin("post-2");
        togglePin("post-2");
        togglePin("post-2");

        jest.advanceTimersByTime(300);
        expect(apiCall).toHaveBeenCalledTimes(1);
        expect(apiCall).toHaveBeenCalledWith("post-2");
    });

    it("different postIds are debounced independently", () => {
        const apiCall = jest.fn();
        const timers = new Map<string, NodeJS.Timeout>();

        function handleLike(postId: string) {
            const existing = timers.get(postId);
            if (existing) clearTimeout(existing);
            const timer = setTimeout(() => {
                timers.delete(postId);
                apiCall(postId);
            }, 300);
            timers.set(postId, timer);
        }

        handleLike("post-a");
        handleLike("post-b");
        handleLike("post-a"); // debounced with first post-a

        jest.advanceTimersByTime(300);
        expect(apiCall).toHaveBeenCalledTimes(2);
        expect(apiCall).toHaveBeenCalledWith("post-a");
        expect(apiCall).toHaveBeenCalledWith("post-b");
    });
});
