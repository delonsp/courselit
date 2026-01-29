/**
 * @jest-environment jsdom
 */

// Mock DOMPurify since jsdom doesn't have full DOM sanitization
jest.mock("dompurify", () => ({
    __esModule: true,
    default: {
        sanitize: (input: string, opts: any) => {
            if (opts?.ALLOWED_TAGS?.length === 0) {
                return input.replace(/<[^>]*>/g, "");
            }
            return input;
        },
    },
}));

const { sanitizeText } = require("../sanitize");

describe("sanitizeText", () => {
    test("strips script tags from content", () => {
        const malicious = '<script>alert("xss")</script>Hello';
        expect(sanitizeText(malicious)).toBe('alert("xss")Hello');
    });

    test("strips all HTML tags", () => {
        const html = "<b>bold</b> and <i>italic</i>";
        expect(sanitizeText(html)).toBe("bold and italic");
    });

    test("preserves plain text with newlines (whitespace-pre-wrap compat)", () => {
        const text = "Line 1\nLine 2\nLine 3";
        expect(sanitizeText(text)).toBe("Line 1\nLine 2\nLine 3");
    });

    test("returns empty string for null/undefined", () => {
        expect(sanitizeText(null)).toBe("");
        expect(sanitizeText(undefined)).toBe("");
        expect(sanitizeText("")).toBe("");
    });

    test("handles nested malicious HTML", () => {
        const nested =
            '<div onmouseover="alert(1)"><img src=x onerror="alert(2)">text</div>';
        expect(sanitizeText(nested)).toBe("text");
    });
});
