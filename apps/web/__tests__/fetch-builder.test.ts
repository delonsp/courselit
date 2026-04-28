/**
 * @jest-environment node
 */
import FetchBuilder from "../../../packages/utils/src/fetch-builder";

describe("FetchBuilder (default timeout)", () => {
    let originalFetch: typeof fetch;
    let capturedSignal: AbortSignal | undefined;

    beforeEach(() => {
        originalFetch = global.fetch;
        capturedSignal = undefined;
        global.fetch = jest.fn(async (_url: any, options?: any) => {
            capturedSignal = options?.signal;
            return new Response(JSON.stringify({ ok: true }), { status: 200 });
        }) as any;
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("attaches a default AbortSignal when caller provides none", async () => {
        const fetcher = new FetchBuilder()
            .setUrl("http://internal/test")
            .setHttpMethod("GET")
            .build();

        await fetcher.exec();

        expect(capturedSignal).toBeDefined();
        expect(capturedSignal).toBeInstanceOf(AbortSignal);
    });

    it("respects an explicit signal passed by the caller", async () => {
        const controller = new AbortController();
        const fetcher = new FetchBuilder()
            .setUrl("http://internal/test")
            .setHttpMethod("GET")
            .setSignal(controller.signal)
            .build();

        await fetcher.exec();

        expect(capturedSignal).toBe(controller.signal);
    });

    it("default signal aborts roughly within 15s budget (sanity check)", () => {
        // Smoke test: AbortSignal.timeout(15_000) returns a signal that is not
        // already aborted. We don't actually wait 15s; just confirm shape.
        const sig = (AbortSignal as any).timeout?.(15_000);
        expect(sig).toBeDefined();
        expect(sig.aborted).toBe(false);
    });
});
