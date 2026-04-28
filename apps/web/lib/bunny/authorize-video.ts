const MANAGE_ANY_COURSE_PERMISSION = "course:manage_any";

type PurchaseLike = { courseId: string };
type UserLike = {
    permissions?: string[];
    purchases?: PurchaseLike[];
};
type LessonLike = {
    courseId: string;
    requiresEnrollment?: boolean;
};

export function canUserAccessVideoLesson(
    user: UserLike | null | undefined,
    lesson: LessonLike,
): boolean {
    if (!user) return false;

    const permissions = user.permissions ?? [];
    if (permissions.includes(MANAGE_ANY_COURSE_PERMISSION)) return true;

    if (lesson.requiresEnrollment === false) return true;

    const purchases = user.purchases ?? [];
    return purchases.some((p) => p.courseId === lesson.courseId);
}
