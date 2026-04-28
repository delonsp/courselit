import { buildBunnySignLogPayload, logBunnySignEvent } from "../log-sign-event";

describe("buildBunnySignLogPayload", () => {
    const fixedNow = new Date("2026-04-27T10:00:00.000Z");

    it("includes structured event metadata", () => {
        const payload = buildBunnySignLogPayload(
            {
                userId: "user-123",
                videoId: "vid-abc",
                libraryId: "999",
                ip: "10.0.0.1",
                userAgent: "Mozilla/5.0",
            },
            fixedNow,
        );

        expect(payload).toEqual({
            event: "bunny.sign",
            timestamp: "2026-04-27T10:00:00.000Z",
            userId: "user-123",
            videoId: "vid-abc",
            libraryId: "999",
            ip: "10.0.0.1",
            userAgent: "Mozilla/5.0",
        });
    });

    it("preserves null ip / userAgent without leaking other PII", () => {
        const payload = buildBunnySignLogPayload(
            {
                userId: "user-1",
                videoId: "v",
                libraryId: "1",
                ip: null,
                userAgent: null,
            },
            fixedNow,
        );

        expect(payload).toMatchObject({ ip: null, userAgent: null });
        expect(Object.keys(payload).sort()).toEqual(
            [
                "event",
                "ip",
                "libraryId",
                "timestamp",
                "userAgent",
                "userId",
                "videoId",
            ].sort(),
        );
    });
});

describe("logBunnySignEvent", () => {
    it("emits a single JSON line to stdout via console.log", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => {});
        try {
            logBunnySignEvent({
                userId: "u",
                videoId: "v",
                libraryId: "L",
                ip: "1.2.3.4",
                userAgent: "agent",
            });
            expect(spy).toHaveBeenCalledTimes(1);
            const line = spy.mock.calls[0][0] as string;
            expect(typeof line).toBe("string");
            const parsed = JSON.parse(line);
            expect(parsed.event).toBe("bunny.sign");
            expect(parsed.userId).toBe("u");
            expect(parsed.videoId).toBe("v");
            expect(parsed.libraryId).toBe("L");
            expect(parsed.ip).toBe("1.2.3.4");
            expect(parsed.userAgent).toBe("agent");
            expect(typeof parsed.timestamp).toBe("string");
        } finally {
            spy.mockRestore();
        }
    });
});
