import { createHash } from "crypto";
import {
    getLibraryKey,
    signBunnyEmbedUrl,
    __resetBunnySignUrlCacheForTests,
} from "../sign-url";

const ORIGINAL_ENV = process.env.BUNNY_LIBRARY_KEYS;

function setKeys(value: string | undefined) {
    if (value === undefined) {
        delete process.env.BUNNY_LIBRARY_KEYS;
    } else {
        process.env.BUNNY_LIBRARY_KEYS = value;
    }
    __resetBunnySignUrlCacheForTests();
}

afterAll(() => {
    setKeys(ORIGINAL_ENV);
});

describe("getLibraryKey", () => {
    it("returns the configured key for a known library", () => {
        setKeys(JSON.stringify({ "123": "key-abc", "456": "key-def" }));
        expect(getLibraryKey("123")).toBe("key-abc");
        expect(getLibraryKey("456")).toBe("key-def");
    });

    it("returns null for a library not present in the env", () => {
        setKeys(JSON.stringify({ "123": "key-abc" }));
        expect(getLibraryKey("999")).toBeNull();
    });

    it("returns null when env is unset", () => {
        setKeys(undefined);
        expect(getLibraryKey("123")).toBeNull();
    });

    it("returns null without crashing for invalid JSON", () => {
        const warnSpy = jest
            .spyOn(console, "warn")
            .mockImplementation(() => {});
        setKeys("{not valid json");
        expect(getLibraryKey("123")).toBeNull();
        warnSpy.mockRestore();
    });
});

describe("signBunnyEmbedUrl", () => {
    it("returns null when library key is missing", () => {
        setKeys(JSON.stringify({ "123": "key-abc" }));
        expect(
            signBunnyEmbedUrl({
                libraryId: "999",
                videoId: "vid-1",
                ttlSeconds: 3600,
            }),
        ).toBeNull();
    });

    it("returns null when env is invalid JSON", () => {
        const warnSpy = jest
            .spyOn(console, "warn")
            .mockImplementation(() => {});
        setKeys("garbage");
        expect(
            signBunnyEmbedUrl({
                libraryId: "123",
                videoId: "vid-1",
                ttlSeconds: 3600,
            }),
        ).toBeNull();
        warnSpy.mockRestore();
    });

    it("generates a URL with a 64-char hex token and future expires", () => {
        setKeys(JSON.stringify({ "123": "key-abc" }));
        const before = Math.floor(Date.now() / 1000);
        const url = signBunnyEmbedUrl({
            libraryId: "123",
            videoId: "vid-1",
            ttlSeconds: 3600,
        });
        expect(url).not.toBeNull();
        const match = url!.match(
            /^https:\/\/iframe\.mediadelivery\.net\/embed\/123\/vid-1\?token=([a-f0-9]{64})&expires=(\d+)$/,
        );
        expect(match).not.toBeNull();
        const expires = Number(match![2]);
        expect(expires).toBeGreaterThanOrEqual(before + 3600);
        expect(expires).toBeLessThanOrEqual(before + 3600 + 5);
    });

    it("produces deterministic tokens for fixed inputs", () => {
        setKeys(JSON.stringify({ "123": "key-abc" }));
        const fixedNow = 1_700_000_000_000;
        const realNow = Date.now;
        Date.now = () => fixedNow;
        try {
            const url = signBunnyEmbedUrl({
                libraryId: "123",
                videoId: "vid-1",
                ttlSeconds: 7200,
            });
            const expires = Math.floor(fixedNow / 1000) + 7200;
            const expectedToken = createHash("sha256")
                .update("key-abc" + "vid-1" + expires)
                .digest("hex");
            expect(url).toBe(
                `https://iframe.mediadelivery.net/embed/123/vid-1?token=${expectedToken}&expires=${expires}`,
            );
        } finally {
            Date.now = realNow;
        }
    });
});
