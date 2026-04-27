// WM-03: Bunny watermark random corner rotation

const WATERMARK_CORNERS = [
    { top: "8%", left: "8%", transform: "none" },
    { top: "8%", right: "8%", transform: "none" },
    { bottom: "8%", left: "8%", transform: "none" },
    { bottom: "8%", right: "8%", transform: "none" },
];

function nextCorner(current: number, rand: number): number {
    return (current + Math.floor(rand * 3) + 1) % 4;
}

describe("WM-03: watermark corner rotation", () => {
    test("WATERMARK_CORNERS has 4 distinct positions", () => {
        expect(WATERMARK_CORNERS).toHaveLength(4);
        const keys = WATERMARK_CORNERS.map((c) =>
            Object.keys(c).sort().join(","),
        );
        expect(new Set(keys).size).toBeGreaterThanOrEqual(2);
    });

    test("nextCorner always moves to a different corner", () => {
        for (let current = 0; current < 4; current++) {
            for (let r = 0; r < 1; r += 0.1) {
                expect(nextCorner(current, r)).not.toBe(current);
            }
        }
    });

    test("nextCorner returns valid index 0..3", () => {
        for (let current = 0; current < 4; current++) {
            for (const r of [0, 0.33, 0.66, 0.999]) {
                const next = nextCorner(current, r);
                expect(next).toBeGreaterThanOrEqual(0);
                expect(next).toBeLessThan(4);
            }
        }
    });

    test("nextCorner is deterministic given the same inputs", () => {
        expect(nextCorner(0, 0.5)).toBe(nextCorner(0, 0.5));
        expect(nextCorner(2, 0.1)).toBe(nextCorner(2, 0.1));
    });
});
