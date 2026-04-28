import { headers as headersType } from "next/headers";

export async function getBackendAddress(
    headers: Headers,
): Promise<`${string}://${string}`> {
    // Sempre retorna URL publica. Esse valor entra no contexto React e
    // viaja para o cliente — usar URL interna aqui causa
    // ERR_BLOCKED_BY_CLIENT no browser do usuario e hydration mismatch.
    // Para self-fetch SSR, use getInternalAddress() abaixo.
    return `${headers.get("x-forwarded-proto")}://${headers.get("host")}`;
}

export async function getAddressFromHeaders(headers: typeof headersType) {
    const headersList = await headers();
    const address = await getBackendAddress(headersList);
    return address;
}

/**
 * URL para self-fetch SSR (server-only). Usar APENAS em layouts/route
 * handlers que precisam falar com o proprio app e nunca expor o valor
 * para o cliente. Quebra a dependencia circular do Traefik: se a env
 * INTERNAL_BACKEND_URL estiver setada (ex: http://127.0.0.1:3000), o
 * fetch nao passa pelo reverse proxy.
 */
export async function getInternalAddress(
    headers: typeof headersType,
): Promise<`${string}://${string}`> {
    if (process.env.INTERNAL_BACKEND_URL) {
        return process.env.INTERNAL_BACKEND_URL as `${string}://${string}`;
    }
    const headersList = await headers();
    return `${headersList.get("x-forwarded-proto")}://${headersList.get("host")}`;
}
