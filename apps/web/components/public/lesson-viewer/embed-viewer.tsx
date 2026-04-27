import React, { useEffect, useState } from "react";
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

const BunnyEmbed = ({
    url,
    watermark,
}: {
    url: string;
    watermark?: BunnyWatermark;
}) => {
    const [cornerIndex, setCornerIndex] = useState(0);

    useEffect(() => {
        if (!watermark) return;
        const id = setInterval(() => {
            setCornerIndex((i) => (i + Math.floor(Math.random() * 3) + 1) % 4);
        }, WATERMARK_ROTATION_MS);
        return () => clearInterval(id);
    }, [watermark]);

    const cornerStyle = WATERMARK_CORNERS[cornerIndex];

    return (
        <div className="aspect-video relative">
            <iframe
                className="w-full h-full rounded-lg absolute inset-0"
                src={url}
                title="Video player"
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
            />
            {watermark && (
                <div
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
