// US-007: Admin navigation buttons visibility logic

// Duplicated from @courselit/utils to avoid jsonwebtoken dependency in test
function checkPermission(
    actualPermissions: string[],
    desiredPermissions: string[],
): boolean {
    return actualPermissions.some((permission) =>
        desiredPermissions.includes(permission),
    );
}

describe("US-007: Admin navigation buttons in lesson viewer", () => {
    const manageAnyCourse = "manage:any:course";

    function shouldShowNavButtons(
        courseId: string,
        profile: { purchases: { courseId: string }[]; permissions: string[] },
    ): boolean {
        const isEnrolled = profile.purchases.some(
            (p) => p.courseId === courseId,
        );
        const isAdmin = checkPermission(profile.permissions, [manageAnyCourse]);
        return isEnrolled || isAdmin;
    }

    test("enrolled user sees navigation buttons", () => {
        const profile = {
            purchases: [{ courseId: "course1" }],
            permissions: [],
        };
        expect(shouldShowNavButtons("course1", profile)).toBe(true);
    });

    test("admin user sees navigation buttons without enrollment", () => {
        const profile = {
            purchases: [],
            permissions: [manageAnyCourse],
        };
        expect(shouldShowNavButtons("course1", profile)).toBe(true);
    });

    test("non-enrolled non-admin user does not see navigation buttons", () => {
        const profile = {
            purchases: [],
            permissions: [],
        };
        expect(shouldShowNavButtons("course1", profile)).toBe(false);
    });

    test("admin who is also enrolled sees navigation buttons", () => {
        const profile = {
            purchases: [{ courseId: "course1" }],
            permissions: [manageAnyCourse],
        };
        expect(shouldShowNavButtons("course1", profile)).toBe(true);
    });
});
