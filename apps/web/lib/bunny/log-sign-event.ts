export interface BunnySignEvent {
    userId: string;
    videoId: string;
    libraryId: string;
    ip: string | null;
    userAgent: string | null;
}

export function buildBunnySignLogPayload(
    event: BunnySignEvent,
    now: Date = new Date(),
): Record<string, unknown> {
    return {
        event: "bunny.sign",
        timestamp: now.toISOString(),
        ...event,
    };
}

export function logBunnySignEvent(event: BunnySignEvent): void {
    // eslint-disable-next-line no-console -- structured telemetry to stdout for log aggregation
    console.log(JSON.stringify(buildBunnySignLogPayload(event)));
}
