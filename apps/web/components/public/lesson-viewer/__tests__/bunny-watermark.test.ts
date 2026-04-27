// WM-01: Bunny watermark overlay text formatting

function formatWatermarkText(watermark: {
    name?: string;
    email: string;
}): string {
    return `${watermark.name ?? ""}\n${watermark.email}`;
}

describe("WM-01: Bunny watermark overlay", () => {
    test("formats text with name and email on two lines", () => {
        const text = formatWatermarkText({
            name: "Aluno Teste",
            email: "aluno@example.com",
        });
        expect(text).toBe("Aluno Teste\naluno@example.com");
    });

    test("formats text with empty name when name is undefined", () => {
        const text = formatWatermarkText({ email: "aluno@example.com" });
        expect(text).toBe("\naluno@example.com");
    });

    test("formats text with empty name when name is empty string", () => {
        const text = formatWatermarkText({
            name: "",
            email: "aluno@example.com",
        });
        expect(text).toBe("\naluno@example.com");
    });

    test("preserves multi-word names", () => {
        const text = formatWatermarkText({
            name: "João da Silva Santos",
            email: "joao@example.com",
        });
        expect(text).toBe("João da Silva Santos\njoao@example.com");
    });
});
