// WM-04: Bunny watermark tamper detection

function isWatermarkTampered(el: HTMLElement | null): boolean {
    if (!el || !el.isConnected) return true;
    const style = el.style;
    if (style.display === "none" || style.visibility === "hidden") return true;
    const opacity = parseFloat(style.opacity || "0.35");
    if (!isNaN(opacity) && opacity < 0.1) return true;
    return false;
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
