/**
 * @jest-environment node
 */

// Override next-auth so that auth(handler) returns the handler unchanged.
// The default mock at __mocks__/next-auth.ts returns auth: jest.fn() which
// would discard the wrapped handler entirely.
jest.mock("next-auth", () => {
    const passthrough = (handler: any) => handler;
    const NextAuth = () => ({
        auth: passthrough,
        signIn: jest.fn(),
        signOut: jest.fn(),
        handlers: { GET: jest.fn(), POST: jest.fn() },
        AuthError: class AuthError extends Error {},
    });
    return { __esModule: true, default: NextAuth };
});

describe("middleware: internalBase resolution", () => {
    let originalFetch: typeof fetch;
    let capturedUrl: string | undefined;
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
        capturedUrl = undefined;
        originalFetch = global.fetch;
        global.fetch = jest.fn(async (url: any) => {
            capturedUrl = String(url);
            return new Response(
                JSON.stringify({ domain: "academia", logo: null }),
                { status: 200 },
            );
        }) as any;
    });

    afterEach(() => {
        global.fetch = originalFetch;
        process.env = originalEnv;
    });

    function makeRequest(host = "academia.drsolution.online", pathname = "/") {
        const headers = new Headers({
            "x-forwarded-proto": "https",
            host,
        });
        return {
            headers,
            nextUrl: { pathname },
            url: `https://${host}${pathname}`,
        };
    }

    it("uses INTERNAL_BACKEND_URL when set (server-side bypass of Traefik)", async () => {
        process.env.INTERNAL_BACKEND_URL = "http://127.0.0.1:3000";
        const middleware = require("../middleware").default;

        await middleware(makeRequest());

        expect(capturedUrl).toBe("http://127.0.0.1:3000/verify-domain");
    });

    it("falls back to public backend URL when INTERNAL_BACKEND_URL is unset", async () => {
        delete process.env.INTERNAL_BACKEND_URL;
        const middleware = require("../middleware").default;

        await middleware(makeRequest());

        expect(capturedUrl).toBe(
            "https://academia.drsolution.online/verify-domain",
        );
    });

    it("short-circuits /healthy without any fetch (no Traefik dependency on liveness probe)", async () => {
        delete process.env.INTERNAL_BACKEND_URL;
        const middleware = require("../middleware").default;

        const result = await middleware(
            makeRequest("academia.drsolution.online", "/healthy"),
        );

        expect(capturedUrl).toBeUndefined();
        const body = await result.json();
        expect(body).toEqual({ success: true });
    });
});
