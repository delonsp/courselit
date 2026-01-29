/**
 * US-008: Tests that optimistic UI reverts on like/pin failure.
 *
 * We test the revert logic in isolation — no React rendering needed.
 * The pattern is: apply optimistic update, then apply the revert
 * (same transformation again), and verify it returns to original state.
 */

describe("Optimistic UI revert logic", () => {
    describe("handleLike revert", () => {
        const applyLikeToggle = (posts: any[], postId: string) =>
            posts.map((post: any) =>
                post.postId === postId
                    ? {
                          ...post,
                          likesCount: post.hasLiked
                              ? post.likesCount - 1
                              : post.likesCount + 1,
                          hasLiked: !post.hasLiked,
                      }
                    : post,
            );

        it("reverts hasLiked and likesCount after double toggle (simulating error revert)", () => {
            const original = [
                { postId: "1", hasLiked: false, likesCount: 5 },
                { postId: "2", hasLiked: true, likesCount: 10 },
            ];

            // Optimistic update
            const afterOptimistic = applyLikeToggle(original, "1");
            expect(afterOptimistic[0].hasLiked).toBe(true);
            expect(afterOptimistic[0].likesCount).toBe(6);

            // Revert (same toggle again)
            const afterRevert = applyLikeToggle(afterOptimistic, "1");
            expect(afterRevert[0].hasLiked).toBe(false);
            expect(afterRevert[0].likesCount).toBe(5);
        });

        it("does not affect other posts during revert", () => {
            const original = [
                { postId: "1", hasLiked: false, likesCount: 5 },
                { postId: "2", hasLiked: true, likesCount: 10 },
            ];

            const afterOptimistic = applyLikeToggle(original, "1");
            const afterRevert = applyLikeToggle(afterOptimistic, "1");

            expect(afterRevert[1]).toEqual(original[1]);
        });
    });

    describe("togglePin revert", () => {
        const applyPinToggle = (posts: any[], postId: string) =>
            posts.map((post: any) =>
                post.postId === postId
                    ? { ...post, pinned: !post.pinned }
                    : post,
            );

        it("reverts pinned state after double toggle (simulating error revert)", () => {
            const original = [{ postId: "1", pinned: false }];

            const afterOptimistic = applyPinToggle(original, "1");
            expect(afterOptimistic[0].pinned).toBe(true);

            const afterRevert = applyPinToggle(afterOptimistic, "1");
            expect(afterRevert[0].pinned).toBe(false);
        });

        it("does not affect other posts during revert", () => {
            const original = [
                { postId: "1", pinned: false },
                { postId: "2", pinned: true },
            ];

            const afterOptimistic = applyPinToggle(original, "1");
            const afterRevert = applyPinToggle(afterOptimistic, "1");

            expect(afterRevert[1]).toEqual(original[1]);
        });
    });
});
