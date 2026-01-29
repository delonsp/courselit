/**
 * US-013: Verify next.config.js exports correct remotePatterns for S3/MinIO.
 */

describe("next.config remotePatterns", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    function loadConfig() {
        // next.config.js uses require() so we can re-require after env changes
        return require("../next.config.js");
    }

    it("includes wildcard https pattern by default", () => {
        const config = loadConfig();
        expect(config.images.remotePatterns).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    protocol: "https",
                    hostname: "**",
                }),
            ]),
        );
    });

    it("adds S3_HOST to remotePatterns when set", () => {
        process.env.S3_HOST = "s3.drsolution.online";
        const config = loadConfig();
        expect(config.images.remotePatterns).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    protocol: "https",
                    hostname: "s3.drsolution.online",
                }),
            ]),
        );
    });

    it("adds MINIO_HOST to remotePatterns when S3_HOST is not set", () => {
        delete process.env.S3_HOST;
        process.env.MINIO_HOST = "minio.example.com";
        const config = loadConfig();
        expect(config.images.remotePatterns).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    protocol: "https",
                    hostname: "minio.example.com",
                }),
            ]),
        );
    });
});
