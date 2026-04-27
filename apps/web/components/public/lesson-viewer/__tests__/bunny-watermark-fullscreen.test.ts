// WM-05: Bunny watermark fullscreen request

function requestWrapperFullscreen(wrapper: HTMLElement | null): boolean {
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
        fn.call(el);
        return true;
    } catch {
        return false;
    }
}

describe("WM-05: requestWrapperFullscreen", () => {
    test("returns false for null wrapper", () => {
        expect(requestWrapperFullscreen(null)).toBe(false);
    });

    test("returns false when no fullscreen API is available", () => {
        const fake = {} as HTMLElement;
        expect(requestWrapperFullscreen(fake)).toBe(false);
    });

    test("calls requestFullscreen on the wrapper element", () => {
        const spy = jest.fn();
        const fake = { requestFullscreen: spy } as unknown as HTMLElement;
        expect(requestWrapperFullscreen(fake)).toBe(true);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("falls back to webkitRequestFullscreen when standard API absent", () => {
        const spy = jest.fn();
        const fake = {
            webkitRequestFullscreen: spy,
        } as unknown as HTMLElement;
        expect(requestWrapperFullscreen(fake)).toBe(true);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("returns false (no throw) when requestFullscreen throws", () => {
        const fake = {
            requestFullscreen: () => {
                throw new Error("denied");
            },
        } as unknown as HTMLElement;
        expect(requestWrapperFullscreen(fake)).toBe(false);
    });
});
