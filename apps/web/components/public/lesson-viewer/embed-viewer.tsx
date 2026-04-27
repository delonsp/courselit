import React from "react";
import { UIConstants } from "@courselit/common-models";

interface BunnyWatermark {
    name?: string;
    email: string;
}

const BunnyEmbed = ({
    url,
    watermark,
}: {
    url: string;
    watermark?: BunnyWatermark;
}) => {
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
                        top: "8%",
                        left: "50%",
                        transform: "translateX(-50%)",
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
