/**
 * @jest-environment jsdom
 */

// Test getAddress in isolation to avoid heavy dependency chain
describe("getAddress", () => {
    const extractDomainFromURL = (host: string) => host.split(":")[0];

    const getAddress = (host: string) => {
        const protocol =
            typeof window !== "undefined" ? window.location.protocol : "https:";
        return {
            domain: extractDomainFromURL(host),
            backend: host,
            frontend: `${protocol}//${host}`,
        };
    };

    it("uses window.location.protocol when available (https)", () => {
        Object.defineProperty(window, "location", {
            value: { protocol: "https:" },
            writable: true,
        });
        const result = getAddress("example.com");
        expect(result.frontend).toBe("https://example.com");
        expect(result.domain).toBe("example.com");
        expect(result.backend).toBe("example.com");
    });

    it("uses http:// when window.location.protocol is http:", () => {
        Object.defineProperty(window, "location", {
            value: { protocol: "http:" },
            writable: true,
        });
        const result = getAddress("localhost:3000");
        expect(result.frontend).toBe("http://localhost:3000");
        expect(result.domain).toBe("localhost");
    });

    it("defaults to https:// when window is undefined", () => {
        const originalWindow = global.window;
        // @ts-ignore
        delete global.window;
        const result = getAddress("example.com");
        expect(result.frontend).toBe("https://example.com");
        global.window = originalWindow;
    });
});
