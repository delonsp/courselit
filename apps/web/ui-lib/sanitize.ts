import DOMPurify from "dompurify";

/**
 * Sanitize user-generated text content to prevent XSS.
 * Strips all HTML tags, returning plain text only.
 */
export function sanitizeText(text: string | undefined | null): string {
    if (!text) return "";
    if (typeof window === "undefined") {
        // Server-side: strip HTML tags with regex as fallback
        return text.replace(/<[^>]*>/g, "");
    }
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
}
