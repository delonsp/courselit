/**
 * @jest-environment node
 */
import { getBackendAddress } from "../app/actions";

describe("getBackendAddress (SSR self-fetch bypass)", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = { ...originalEnv };
        delete process.env.INTERNAL_BACKEND_URL;
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it("returns headers-derived URL when INTERNAL_BACKEND_URL is unset", async () => {
        const headers = new Headers({
            "x-forwarded-proto": "https",
            host: "academia.drsolution.online",
        });

        const address = await getBackendAddress(headers);

        expect(address).toBe("https://academia.drsolution.online");
    });

    it("bypasses to INTERNAL_BACKEND_URL when set (server-side)", async () => {
        process.env.INTERNAL_BACKEND_URL = "http://127.0.0.1:3000";
        const headers = new Headers({
            "x-forwarded-proto": "https",
            host: "academia.drsolution.online",
        });

        const address = await getBackendAddress(headers);

        // Bypass should win over the public URL — this is the whole point of
        // the fix: SSR should not depend on the reverse proxy being healthy.
        expect(address).toBe("http://127.0.0.1:3000");
    });

    it("falls back to headers-derived URL when running in browser (typeof window !== undefined)", async () => {
        process.env.INTERNAL_BACKEND_URL = "http://127.0.0.1:3000";
        // Simulate browser context.
        // @ts-expect-error — defining window for test
        global.window = {};

        const headers = new Headers({
            "x-forwarded-proto": "https",
            host: "academia.drsolution.online",
        });

        try {
            const address = await getBackendAddress(headers);
            expect(address).toBe("https://academia.drsolution.online");
        } finally {
            // @ts-expect-error — cleanup
            delete global.window;
        }
    });
});
