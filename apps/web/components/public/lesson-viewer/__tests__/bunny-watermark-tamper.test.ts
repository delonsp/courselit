// WM-04: Bunny watermark tamper detection

function isWatermarkTampered(el: HTMLElement | null): boolean {
    if (!el || !el.isConnected) return true;
    const style = el.style;
    if (style.display === "none" || style.visibility === "hidden") return true;
    const opacity = parseFloat(style.opacity || "0.35");
    if (!isNaN(opacity) && opacity < 0.1) return true;
    return false;
}

function stopBunnyPlayer(iframe: HTMLIFrameElement | null): void {
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
        iframe.src = "about:blank";
    } catch {
        /* ignore */
    }
}

describe("WM-04: watermark tamper detection", () => {
    test("returns true when element is null", () => {
        expect(isWatermarkTampered(null)).toBe(true);
    });

    test("returns true when element is detached from DOM", () => {
        const el = document.createElement("div");
        el.style.opacity = "0.35";
        expect(isWatermarkTampered(el)).toBe(true);
    });

    test("returns false for an attached element with default opacity", () => {
        const el = document.createElement("div");
        el.style.opacity = "0.35";
        document.body.appendChild(el);
        expect(isWatermarkTampered(el)).toBe(false);
        document.body.removeChild(el);
    });

    test("returns true when display is none", () => {
        const el = document.createElement("div");
        el.style.display = "none";
        document.body.appendChild(el);
        expect(isWatermarkTampered(el)).toBe(true);
        document.body.removeChild(el);
    });

    test("returns true when visibility is hidden", () => {
        const el = document.createElement("div");
        el.style.visibility = "hidden";
        document.body.appendChild(el);
        expect(isWatermarkTampered(el)).toBe(true);
        document.body.removeChild(el);
    });

    test("returns true when opacity is reduced near zero", () => {
        const el = document.createElement("div");
        el.style.opacity = "0.05";
        document.body.appendChild(el);
        expect(isWatermarkTampered(el)).toBe(true);
        document.body.removeChild(el);
    });

    test("stopBunnyPlayer is a no-op when iframe is null", () => {
        expect(() => stopBunnyPlayer(null)).not.toThrow();
    });

    test("stopBunnyPlayer posts player.js pause message and clears src", () => {
        const iframe = document.createElement("iframe");
        iframe.src = "https://iframe.mediadelivery.net/embed/123/abc";
        document.body.appendChild(iframe);

        const posted: any[] = [];
        const win = iframe.contentWindow;
        if (win) {
            const original = win.postMessage.bind(win);
            (win as any).postMessage = (msg: any, target: string) => {
                posted.push({ msg, target });
                try {
                    original(msg, target);
                } catch {
                    /* jsdom cross-origin */
                }
            };
        }

        stopBunnyPlayer(iframe);

        expect(posted.length).toBe(1);
        expect(posted[0].msg).toEqual({
            context: "player.js",
            method: "pause",
            value: undefined,
            listener: undefined,
        });
        expect(posted[0].target).toBe("*");
        expect(iframe.getAttribute("src")).toBe("about:blank");

        document.body.removeChild(iframe);
    });

    test("MutationObserver fires when overlay is removed from parent", (done) => {
        const wrapper = document.createElement("div");
        const overlay = document.createElement("div");
        overlay.setAttribute("data-testid", "bunny-watermark");
        wrapper.appendChild(overlay);
        document.body.appendChild(wrapper);

        const observer = new MutationObserver(() => {
            if (isWatermarkTampered(overlay)) {
                observer.disconnect();
                document.body.removeChild(wrapper);
                done();
            }
        });
        observer.observe(wrapper, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["style"],
        });

        wrapper.removeChild(overlay);
    });
});
