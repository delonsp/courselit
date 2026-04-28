const MANAGE_ANY_COURSE_PERMISSION = "course:manage_any";

type UserLike = {
    permissions?: string[];
};
type LessonLike = {
    courseId: string;
    requiresEnrollment?: boolean;
};

export function canUserAccessVideoLesson(
    user: UserLike | null | undefined,
    lesson: LessonLike,
    hasActiveMembership: boolean,
): boolean {
    if (!user) return false;

    const permissions = user.permissions ?? [];
    if (permissions.includes(MANAGE_ANY_COURSE_PERMISSION)) return true;

    if (lesson.requiresEnrollment === false) return true;

    return hasActiveMembership;
}

export function lessonReferencesVideo(
    lessonContentValue: string | undefined | null,
    libraryId: string,
    videoId: string,
): boolean {
    if (!lessonContentValue) return false;
    return lessonContentValue.includes(`${libraryId}/${videoId}`);
}
