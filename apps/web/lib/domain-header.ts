export function getDomainHeaderValue(backend?: string): string | undefined {
    if (!backend) {
        return undefined;
    }

    try {
        const parsedUrl = backend.startsWith("http")
            ? new URL(backend)
            : new URL(`https://${backend}`);
        const hostname = parsedUrl.hostname;
        const parts = hostname.split(".");

        if (parts.length > 2) {
            return parts[0];
        }

        return hostname;
    } catch (err) {
        const sanitized = backend.replace(/^https?:\/\//, "").split("/")[0];
        return sanitized || undefined;
    }
}
