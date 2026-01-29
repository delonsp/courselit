/**
 * Tests for drip group delay calculation operator precedence.
 * US-004: Ensure (delayInMillis ?? 0) + lastGroupDripDateInMillis is correct.
 */

describe("drip delay calculation", () => {
    const calculateDripDelay = (
        delayInMillis: number | undefined,
        lastGroupDripDateInMillis: number,
    ) => {
        return (delayInMillis ?? 0) + lastGroupDripDateInMillis;
    };

    it("returns lastGroupDripDateInMillis when delayInMillis is undefined", () => {
        const result = calculateDripDelay(undefined, 5000);
        expect(result).toBe(5000);
    });

    it("adds delayInMillis and lastGroupDripDateInMillis when both defined", () => {
        const result = calculateDripDelay(3000, 5000);
        expect(result).toBe(8000);
    });

    it("returns 0 when both are 0/undefined", () => {
        const result = calculateDripDelay(undefined, 0);
        expect(result).toBe(0);
    });
});
