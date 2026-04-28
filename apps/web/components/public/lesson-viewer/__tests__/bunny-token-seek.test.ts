// TOKEN-06-FIX-SEEK: player.js message + time extraction helpers
// Helpers are mirrored from embed-viewer.tsx (cannot import directly because
// the component pulls @courselit/common-models which is not mapped in jsdom).

interface PlayerJsMessage {
    context: "player.js";
    method: string;
    value?: unknown;
    listener?: string;
}

function buildPlayerJsMessage(
    method: string,
    value?: unknown,
    listener?: string,
): PlayerJsMessage {
    return { context: "player.js", method, value, listener };
}

function extractPlayerJsTime(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (value && typeof value === "object") {
        const seconds = (value as { seconds?: unknown }).seconds;
        if (typeof seconds === "number" && Number.isFinite(seconds)) {
            return seconds;
        }
    }
    return null;
}

describe("TOKEN-06-FIX-SEEK: buildPlayerJsMessage", () => {
    test("uses player.js context", () => {
        const msg = buildPlayerJsMessage("pause");
        expect(msg.context).toBe("player.js");
        expect(msg.method).toBe("pause");
        expect(msg.value).toBeUndefined();
        expect(msg.listener).toBeUndefined();
    });

    test("encodes setCurrentTime with numeric value", () => {
        const msg = buildPlayerJsMessage("setCurrentTime", 123.4);
        expect(msg).toEqual({
            context: "player.js",
            method: "setCurrentTime",
            value: 123.4,
            listener: undefined,
        });
    });

    test("encodes addEventListener with listener id", () => {
        const msg = buildPlayerJsMessage("addEventListener", "ready", "ready");
        expect(msg).toEqual({
            context: "player.js",
            method: "addEventListener",
            value: "ready",
            listener: "ready",
        });
    });
});

describe("TOKEN-06-FIX-SEEK: extractPlayerJsTime", () => {
    test("returns numeric value as-is", () => {
        expect(extractPlayerJsTime(42)).toBe(42);
        expect(extractPlayerJsTime(0)).toBe(0);
    });

    test("extracts seconds from object payload", () => {
        expect(extractPlayerJsTime({ seconds: 12.5 })).toBe(12.5);
    });

    test("returns null for non-numeric values", () => {
        expect(extractPlayerJsTime(undefined)).toBeNull();
        expect(extractPlayerJsTime(null)).toBeNull();
        expect(extractPlayerJsTime("12")).toBeNull();
        expect(extractPlayerJsTime({})).toBeNull();
        expect(extractPlayerJsTime({ seconds: "12" })).toBeNull();
    });

    test("rejects non-finite numbers", () => {
        expect(extractPlayerJsTime(NaN)).toBeNull();
        expect(extractPlayerJsTime(Infinity)).toBeNull();
        expect(extractPlayerJsTime({ seconds: NaN })).toBeNull();
    });
});
