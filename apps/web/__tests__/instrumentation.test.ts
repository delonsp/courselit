/**
 * @jest-environment node
 */

describe("instrumentation: threshold-based process.exit", () => {
    let exitSpy: jest.SpyInstance;
    let errorSpy: jest.SpyInstance;
    const listeners: Map<string, ((...args: any[]) => void)[]> = new Map();
    let originalOn: typeof process.on;

    beforeEach(() => {
        jest.resetModules();
        listeners.clear();
        // Capture process.on registrations without actually attaching them.
        originalOn = process.on;
        (process as any).on = (event: string, fn: (...args: any[]) => void) => {
            const arr = listeners.get(event) ?? [];
            arr.push(fn);
            listeners.set(event, arr);
            return process;
        };
        // Stub exit so trips are observable but never actually exit Jest.
        exitSpy = jest
            .spyOn(process, "exit")
            .mockImplementation(((_code?: number) => undefined) as any);
        errorSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => undefined);
    });

    afterEach(() => {
        process.on = originalOn;
        exitSpy.mockRestore();
        errorSpy.mockRestore();
        jest.useRealTimers();
    });

    function loadAndRegister() {
        // NEXT_RUNTIME guard inside register() short-circuits unless nodejs.
        process.env.NEXT_RUNTIME = "nodejs";
        const mod = require("../instrumentation");
        mod.register();
    }

    function fireUncaught(times: number) {
        const handlers = listeners.get("uncaughtException") ?? [];
        for (let i = 0; i < times; i++) {
            handlers.forEach((h) => h(new Error(`boom-${i}`)));
        }
    }

    it("does not exit below the threshold (4 < 5 in 60s)", () => {
        jest.useFakeTimers().setSystemTime(new Date("2026-04-28T12:00:00Z"));
        loadAndRegister();

        fireUncaught(4);

        expect(exitSpy).not.toHaveBeenCalled();
    });

    it("exits with code 1 on the 5th exception within the window", () => {
        jest.useFakeTimers().setSystemTime(new Date("2026-04-28T12:00:00Z"));
        loadAndRegister();

        fireUncaught(5);

        expect(exitSpy).toHaveBeenCalledWith(1);
    });

    it("resets the counter after the 60s window so isolated bursts do not trip", () => {
        jest.useFakeTimers().setSystemTime(new Date("2026-04-28T12:00:00Z"));
        loadAndRegister();

        fireUncaught(4);
        // Advance past the window so the next exception starts a new bucket.
        jest.setSystemTime(new Date("2026-04-28T12:01:30Z"));
        fireUncaught(4);

        expect(exitSpy).not.toHaveBeenCalled();
    });

    it("treats unhandledRejection the same as uncaughtException", () => {
        jest.useFakeTimers().setSystemTime(new Date("2026-04-28T12:00:00Z"));
        loadAndRegister();

        const handlers = listeners.get("unhandledRejection") ?? [];
        for (let i = 0; i < 5; i++) {
            handlers.forEach((h) => h("rejection"));
        }

        expect(exitSpy).toHaveBeenCalledWith(1);
    });

    it("register() is a no-op outside the nodejs runtime (e.g. edge)", () => {
        process.env.NEXT_RUNTIME = "edge";
        const mod = require("../instrumentation");
        mod.register();

        // No process.on calls were captured during register().
        expect(listeners.size).toBe(0);
    });
});
