/**
 * @jest-environment node
 */
import { getBackendAddress, getInternalAddress } from "../app/actions";

describe("getBackendAddress (always public URL)", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = { ...originalEnv };
        delete process.env.INTERNAL_BACKEND_URL;
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it("returns headers-derived public URL", async () => {
        const headers = new Headers({
            "x-forwarded-proto": "https",
            host: "academia.drsolution.online",
        });

        const address = await getBackendAddress(headers);

        expect(address).toBe("https://academia.drsolution.online");
    });

    it("ignores INTERNAL_BACKEND_URL — must never leak internal URL to client context", async () => {
        // Regression guard: INTERNAL_BACKEND_URL leaking through
        // getBackendAddress causes ERR_BLOCKED_BY_CLIENT and React
        // hydration mismatch in the browser. The internal bypass MUST
        // live in getInternalAddress (server-only).
        process.env.INTERNAL_BACKEND_URL = "http://127.0.0.1:3000";
        const headers = new Headers({
            "x-forwarded-proto": "https",
            host: "academia.drsolution.online",
        });

        const address = await getBackendAddress(headers);

        expect(address).toBe("https://academia.drsolution.online");
    });
});

describe("getInternalAddress (SSR self-fetch only)", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = { ...originalEnv };
        delete process.env.INTERNAL_BACKEND_URL;
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    function makeHeadersFn(host: string, proto = "https") {
        return async () =>
            new Headers({
                "x-forwarded-proto": proto,
                host,
            });
    }

    it("returns INTERNAL_BACKEND_URL when set", async () => {
        process.env.INTERNAL_BACKEND_URL = "http://127.0.0.1:3000";
        const headersFn = makeHeadersFn("academia.drsolution.online");

        const address = await getInternalAddress(headersFn as any);

        expect(address).toBe("http://127.0.0.1:3000");
    });

    it("falls back to public URL when INTERNAL_BACKEND_URL is unset", async () => {
        const headersFn = makeHeadersFn("academia.drsolution.online");

        const address = await getInternalAddress(headersFn as any);

        expect(address).toBe("https://academia.drsolution.online");
    });
});
