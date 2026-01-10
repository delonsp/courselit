import React from "react";
import { UIConstants } from "@courselit/common-models";

const YouTubeEmbed = ({ content }: { content: string }) => {
    const match = content.match(UIConstants.YOUTUBE_REGEX);

    return (
        <div className="aspect-video">
            <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${match![1]}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

const BunnyEmbed = ({ url }: { url: string }) => {
    return (
        <div className="aspect-video">
            <iframe
                className="w-full h-full rounded-lg"
                src={url}
                title="Video player"
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

interface LessonEmbedViewerProps {
    content: { value: string };
}

const LessonEmbedViewer = ({ content }: LessonEmbedViewerProps) => {
    const isYouTube = content.value.match(UIConstants.YOUTUBE_REGEX);
    const isBunny = content.value.match(UIConstants.BUNNY_EMBED_REGEX);

    return (
        <div className="flex flex-col min-h-screen">
            {isYouTube && (
                <div className="mb-4">
                    <YouTubeEmbed content={content.value} />
                </div>
            )}
            {isBunny && (
                <div className="mb-4">
                    <BunnyEmbed url={content.value} />
                </div>
            )}
            {!isYouTube && !isBunny && (
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
