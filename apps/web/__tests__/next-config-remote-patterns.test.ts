describe("next.config.js remotePatterns", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    function loadConfig() {
        return require("../next.config.js");
    }

    it("includes wildcard pattern for all HTTPS hosts", () => {
        const config = loadConfig();
        const patterns = config.images.remotePatterns;
        const wildcard = patterns.find(
            (p: any) => p.hostname === "**" && p.protocol === "https",
        );
        expect(wildcard).toBeDefined();
    });

    it("includes hardcoded s3.drsolution.online pattern", () => {
        const config = loadConfig();
        const patterns = config.images.remotePatterns;
        const s3 = patterns.find(
            (p: any) => p.hostname === "s3.drsolution.online",
        );
        expect(s3).toBeDefined();
        expect(s3.protocol).toBe("https");
    });

    it("adds S3_HOST pattern when env var is set", () => {
        process.env.S3_HOST = "custom-s3.example.com";
        const config = loadConfig();
        const patterns = config.images.remotePatterns;
        const custom = patterns.find(
            (p: any) => p.hostname === "custom-s3.example.com",
        );
        expect(custom).toBeDefined();
        expect(custom.protocol).toBe("https");
    });

    it("adds MINIO_HOST pattern when env var is set", () => {
        process.env.MINIO_HOST = "minio.example.com";
        const config = loadConfig();
        const patterns = config.images.remotePatterns;
        const minio = patterns.find(
            (p: any) => p.hostname === "minio.example.com",
        );
        expect(minio).toBeDefined();
    });

    it("does not duplicate s3.drsolution.online when S3_HOST matches", () => {
        process.env.S3_HOST = "s3.drsolution.online";
        const config = loadConfig();
        const patterns = config.images.remotePatterns;
        const s3Entries = patterns.filter(
            (p: any) => p.hostname === "s3.drsolution.online",
        );
        expect(s3Entries).toHaveLength(1);
    });
});
