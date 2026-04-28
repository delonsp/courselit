import type { Instrumentation } from "next";

const EXCEPTION_WINDOW_MS = 60_000;
const EXCEPTION_THRESHOLD = 5;

let recentExceptionCount = 0;
let windowStartedAt = 0;

function trackAndMaybeExit(label: string) {
    const now = Date.now();
    if (now - windowStartedAt > EXCEPTION_WINDOW_MS) {
        windowStartedAt = now;
        recentExceptionCount = 1;
        return;
    }
    recentExceptionCount += 1;
    if (recentExceptionCount >= EXCEPTION_THRESHOLD) {
        console.error(
            `[instrumentation] ${label}: ${recentExceptionCount} exceptions in ${EXCEPTION_WINDOW_MS}ms — exiting so Docker restart policy kicks in`,
        );
        process.exit(1);
    }
}

export function register() {
    if (process.env.NEXT_RUNTIME !== "nodejs") {
        return;
    }

    process.on("uncaughtException", (err) => {
        console.error("[instrumentation] uncaughtException:", err);
        trackAndMaybeExit("uncaughtException");
    });

    process.on("unhandledRejection", (reason) => {
        console.error("[instrumentation] unhandledRejection:", reason);
        trackAndMaybeExit("unhandledRejection");
    });
}

export const onRequestError: Instrumentation.onRequestError = async (
    err,
    request,
    context,
) => {
    const error = err as Error & { digest?: string };
    console.error("[instrumentation] onRequestError:", {
        message: error?.message,
        digest: error?.digest,
        path: request?.path,
        method: request?.method,
        routePath: context?.routePath,
        routeType: context?.routeType,
    });
};
