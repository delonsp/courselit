import { NextResponse, type NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { getBackendAddress } from "@/app/actions";

const { auth } = NextAuth(authConfig);

export default auth(async (request: NextRequest) => {
    const requestHeaders = request.headers;
    const backend = await getBackendAddress(requestHeaders);

    if (request.nextUrl.pathname === "/healthy") {
        return Response.json({ success: true });
    }

    try {
        // Timeout de 2s evita pendurar requests quando o backend interno
        // (ou Traefik, no fallback sem INTERNAL_BACKEND_URL) esta lento.
        // Combinado com o bypass de getBackendAddress (vai direto a
        // 127.0.0.1 quando INTERNAL_BACKEND_URL esta setado), isso elimina
        // a dependencia circular do reverse proxy.
        const response = await fetch(`${backend}/verify-domain`, {
            signal: AbortSignal.timeout(2000),
        });

        if (!response.ok) {
            throw new Error();
        }

        const resp = await response.json();

        requestHeaders.set("domain", resp.domain);

        if (request.nextUrl.pathname === "/favicon.ico") {
            try {
                if (resp.logo) {
                    const response = await fetch(resp.logo, {
                        signal: AbortSignal.timeout(2000),
                    });
                    if (response.ok) {
                        const blob = await response.blob();
                        return new NextResponse(blob, {
                            headers: {
                                "content-type": "image/webp",
                            },
                        });
                    } else {
                        return NextResponse.rewrite(
                            new URL(`/default-favicon.ico`, request.url),
                        );
                    }
                } else {
                    return NextResponse.rewrite(
                        new URL(`/default-favicon.ico`, request.url),
                    );
                }
            } catch (err) {
                return NextResponse.rewrite(
                    new URL(`/default-favicon.ico`, request.url),
                );
            }
        }

        if (request.nextUrl.pathname.startsWith("/dashboard")) {
            const session = await auth();
            if (!session) {
                return NextResponse.redirect(
                    new URL(
                        `/login?redirect=${encodeURIComponent(
                            request.nextUrl.pathname,
                        )}`,
                        request.url,
                    ),
                );
            }
        }

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (err) {
        return Response.json(
            { success: false, error: err.message },
            { status: 404 },
        );
    }
});

export const config = {
    matcher: [
        "/",
        "/favicon.ico",
        "/api/:path*",
        "/healthy",
        "/dashboard/:path*",
    ],
    unstable_allowDynamic: ["/node_modules/next-auth/**"],
};
