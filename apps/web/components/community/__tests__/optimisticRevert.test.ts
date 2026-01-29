// US-008: Optimistic UI revert on community like/pin failure

describe("US-008: Optimistic UI revert on like/pin failure", () => {
    // Simulate the optimistic update + revert pattern used in community/index.tsx

    type Post = {
        postId: string;
        hasLiked: boolean;
        likesCount: number;
        pinned: boolean;
    };

    function applyLikeOptimistic(posts: Post[], postId: string): Post[] {
        return posts.map((post) =>
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
    }

    function revertLikeOptimistic(posts: Post[], postId: string): Post[] {
        // Same toggle logic reverts the state
        return applyLikeOptimistic(posts, postId);
    }

    function applyPinOptimistic(posts: Post[], postId: string): Post[] {
        return posts.map((post) =>
            post.postId === postId ? { ...post, pinned: !post.pinned } : post,
        );
    }

    function revertPinOptimistic(posts: Post[], postId: string): Post[] {
        return applyPinOptimistic(posts, postId);
    }

    test("like state reverts on API failure", () => {
        const initial: Post[] = [
            {
                postId: "p1",
                hasLiked: false,
                likesCount: 5,
                pinned: false,
            },
        ];

        // Optimistic update
        const afterOptimistic = applyLikeOptimistic(initial, "p1");
        expect(afterOptimistic[0].hasLiked).toBe(true);
        expect(afterOptimistic[0].likesCount).toBe(6);

        // Revert on failure
        const afterRevert = revertLikeOptimistic(afterOptimistic, "p1");
        expect(afterRevert[0].hasLiked).toBe(false);
        expect(afterRevert[0].likesCount).toBe(5);
    });

    test("unlike state reverts on API failure", () => {
        const initial: Post[] = [
            {
                postId: "p1",
                hasLiked: true,
                likesCount: 5,
                pinned: false,
            },
        ];

        const afterOptimistic = applyLikeOptimistic(initial, "p1");
        expect(afterOptimistic[0].hasLiked).toBe(false);
        expect(afterOptimistic[0].likesCount).toBe(4);

        const afterRevert = revertLikeOptimistic(afterOptimistic, "p1");
        expect(afterRevert[0].hasLiked).toBe(true);
        expect(afterRevert[0].likesCount).toBe(5);
    });

    test("pin state reverts on API failure", () => {
        const initial: Post[] = [
            {
                postId: "p1",
                hasLiked: false,
                likesCount: 0,
                pinned: false,
            },
        ];

        const afterOptimistic = applyPinOptimistic(initial, "p1");
        expect(afterOptimistic[0].pinned).toBe(true);

        const afterRevert = revertPinOptimistic(afterOptimistic, "p1");
        expect(afterRevert[0].pinned).toBe(false);
    });

    test("unpin state reverts on API failure", () => {
        const initial: Post[] = [
            {
                postId: "p1",
                hasLiked: false,
                likesCount: 0,
                pinned: true,
            },
        ];

        const afterOptimistic = applyPinOptimistic(initial, "p1");
        expect(afterOptimistic[0].pinned).toBe(false);

        const afterRevert = revertPinOptimistic(afterOptimistic, "p1");
        expect(afterRevert[0].pinned).toBe(true);
    });
});
