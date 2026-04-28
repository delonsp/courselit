import React, { useEffect, useRef, useState } from "react";
import { UIConstants } from "@courselit/common-models";

interface BunnyWatermark {
    name?: string;
    email: string;
}

const WATERMARK_CORNERS: Array<React.CSSProperties> = [
    { top: "8%", left: "8%", transform: "none" },
    { top: "8%", right: "8%", transform: "none" },
    { bottom: "8%", left: "8%", transform: "none" },
    { bottom: "8%", right: "8%", transform: "none" },
];
const WATERMARK_ROTATION_MS = 12000;

const BUNNY_EMBED_PATH_REGEX =
    /^https?:\/\/(?:iframe|player)\.mediadelivery\.net\/embed\/(\d+)\/([A-Za-z0-9-]+)/;

export function parseBunnyEmbedUrl(
    url: string,
): { libraryId: string; videoId: string } | null {
    const m = url.match(BUNNY_EMBED_PATH_REGEX);
    if (!m) return null;
    return { libraryId: m[1], videoId: m[2] };
}

export function isWatermarkTampered(el: HTMLElement | null): boolean {
    if (!el || !el.isConnected) return true;
    const style = el.style;
    if (style.display === "none" || style.visibility === "hidden") return true;
    const opacity = parseFloat(style.opacity || "0.35");
    if (!isNaN(opacity) && opacity < 0.1) return true;
    return false;
}

export function stopBunnyPlayer(iframe: HTMLIFrameElement | null): void {
    if (!iframe) return;
    try {
        iframe.contentWindow?.postMessage(
            {
                context: "player.js",
                method: "pause",
                value: undefined,
                listener: undefined,
            },
            "*",
        );
    } catch {
        /* ignore cross-origin errors */
    }
    try {
        iframe.src = "";
    } catch {
        /* ignore */
    }
}

export function requestWrapperFullscreen(wrapper: HTMLElement | null): boolean {
    if (!wrapper) return false;
    const el = wrapper as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void> | void;
        mozRequestFullScreen?: () => Promise<void> | void;
        msRequestFullscreen?: () => Promise<void> | void;
    };
    const fn =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen;
    if (typeof fn !== "function") return false;
    try {
        Promise.resolve(fn.call(el)).catch(() => {
            /* user cancelled or browser blocked */
        });
        return true;
    } catch {
        return false;
    }
}

const BunnyEmbed = ({
    url,
    watermark,
}: {
    url: string;
    watermark?: BunnyWatermark;
}) => {
    const [cornerIndex, setCornerIndex] = useState(0);
    const [tampered, setTampered] = useState(false);
    const [signedUrl, setSignedUrl] = useState<string | null>(null);
    const [signingResolved, setSigningResolved] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        const parsed = parseBunnyEmbedUrl(url);
        if (!parsed) {
            setSignedUrl(null);
            setSigningResolved(true);
            return;
        }
        let cancelled = false;
        setSigningResolved(false);
        fetch("/api/bunny/sign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed),
        })
            .then(async (res) => {
                if (cancelled) return;
                if (res.ok) {
                    const data = await res.json().catch(() => null);
                    setSignedUrl(
                        data && typeof data.url === "string" ? data.url : null,
                    );
                } else {
                    setSignedUrl(null);
                }
            })
            .catch(() => {
                if (!cancelled) setSignedUrl(null);
            })
            .finally(() => {
                if (!cancelled) setSigningResolved(true);
            });
        return () => {
            cancelled = true;
        };
    }, [url]);

    useEffect(() => {
        if (!watermark) return;
        const id = setInterval(() => {
            setCornerIndex((i) => (i + Math.floor(Math.random() * 3) + 1) % 4);
        }, WATERMARK_ROTATION_MS);
        return () => clearInterval(id);
    }, [watermark]);

    useEffect(() => {
        if (!watermark) return;
        if (typeof MutationObserver === "undefined") return;
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const handleTamper = () => {
            if (tampered) return;
            stopBunnyPlayer(iframeRef.current);
            setTampered(true);
        };

        const observer = new MutationObserver(() => {
            if (isWatermarkTampered(overlayRef.current)) {
                handleTamper();
            }
        });
        observer.observe(wrapper, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["style", "class", "hidden"],
        });
        return () => observer.disconnect();
    }, [watermark, tampered]);

    const cornerStyle = WATERMARK_CORNERS[cornerIndex];
    const iframeSrc = signedUrl ?? (signingResolved ? url : "");

    return (
        <div ref={wrapperRef} className="aspect-video relative">
            {!signingResolved && (
                <div
                    data-testid="bunny-loading"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg bg-black/20 animate-pulse"
                />
            )}
            <iframe
                ref={iframeRef}
                className="w-full h-full rounded-lg absolute inset-0"
                src={iframeSrc}
                title="Video player"
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
            />
            {watermark && (
                <div
                    ref={overlayRef}
                    data-testid="bunny-watermark"
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        ...cornerStyle,
                        pointerEvents: "none",
                        opacity: 0.35,
                        color: "white",
                        textShadow: "0 0 4px black",
                        fontSize: "14px",
                        mixBlendMode: "difference",
                        whiteSpace: "pre",
                        textAlign: "center",
                        lineHeight: 1.2,
                        fontFamily: "monospace",
                        transition:
                            "top 1s ease, left 1s ease, right 1s ease, bottom 1s ease",
                    }}
                >
                    {`${watermark.name ?? ""}\n${watermark.email}`}
                </div>
            )}
            {watermark && (
                <button
                    type="button"
                    onClick={() => requestWrapperFullscreen(wrapperRef.current)}
                    aria-label="Tela cheia"
                    title="Tela cheia (mantém marca d'água)"
                    data-testid="bunny-fullscreen-btn"
                    style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.45)",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        opacity: 0.6,
                        zIndex: 5,
                        fontSize: 14,
                        lineHeight: 1,
                    }}
                >
                    ⛶
                </button>
            )}
            {tampered && (
                <div
                    data-testid="bunny-tamper-alert"
                    role="alert"
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.85)",
                        color: "white",
                        fontSize: "18px",
                        fontWeight: 600,
                        textAlign: "center",
                        padding: "16px",
                        zIndex: 10,
                    }}
                >
                    Sessão encerrada
                </div>
            )}
        </div>
    );
};

interface LessonEmbedViewerProps {
    content: { value: string };
    watermark?: BunnyWatermark;
}

const LessonEmbedViewer = ({ content, watermark }: LessonEmbedViewerProps) => {
    const isBunny = content.value.match(UIConstants.BUNNY_EMBED_REGEX);

    return (
        <div className="flex flex-col min-h-screen">
            {isBunny && (
                <div className="mb-4">
                    <BunnyEmbed url={content.value} watermark={watermark} />
                </div>
            )}
            {!isBunny && (
                <a
                    href={content.value}
                    className="text-sm text-muted-foreground text-center hover:underline"
                >
                    {content.value}
                </a>
            )}
        </div>
    );
};

export default LessonEmbedViewer;
