import { headers as headersType } from "next/headers";

export async function getBackendAddress(
    headers: Headers,
): Promise<`${string}://${string}`> {
    // SSR bypass: quando rodando server-side dentro do container, falar com
    // 127.0.0.1 evita dependencia circular do reverse proxy (Traefik).
    // Sem isso, qualquer hiccup do proxy derruba o app inteiro porque o
    // root layout faz self-fetch via URL publica.
    if (typeof window === "undefined" && process.env.INTERNAL_BACKEND_URL) {
        return process.env.INTERNAL_BACKEND_URL as `${string}://${string}`;
    }
    return `${headers.get("x-forwarded-proto")}://${headers.get("host")}`;
}

export async function getAddressFromHeaders(headers: typeof headersType) {
    const headersList = await headers();
    const address = await getBackendAddress(headersList);
    return address;
}
