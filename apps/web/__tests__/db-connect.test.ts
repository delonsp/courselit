/**
 * @jest-environment node
 */

// Mock mongoose BEFORE importing the module under test.
const mockConnect = jest.fn();
const mockGetClient = jest.fn(() => ({ __client: true }));

jest.mock("mongoose", () => ({
    __esModule: true,
    default: {
        connect: (...args: any[]) => mockConnect(...args),
        connection: {
            // Default: not connected.
            readyState: 0,
            getClient: () => mockGetClient(),
        },
    },
}));

describe("connectToDatabase (cache + retry)", () => {
    let connectToDatabase: typeof import("../services/db").default;

    beforeEach(async () => {
        jest.resetModules();
        mockConnect.mockReset();
        mockGetClient.mockClear();
        // Re-import to reset the module-level cachedConnection.
        connectToDatabase = (await import("../services/db")).default;
    });

    it("dedups concurrent connection attempts (single mongoose.connect call)", async () => {
        let resolveConnect: (v: any) => void;
        const connectPromise = new Promise((resolve) => {
            resolveConnect = resolve;
        });
        mockConnect.mockReturnValue(connectPromise);

        // Fire two concurrent calls before the first resolves.
        const p1 = connectToDatabase();
        const p2 = connectToDatabase();

        // Resolve mongoose.connect.
        resolveConnect!({
            connection: { getClient: () => ({ __client: "shared" }) },
        });

        const [c1, c2] = await Promise.all([p1, p2]);

        expect(mockConnect).toHaveBeenCalledTimes(1);
        expect(c1).toBe(c2);
    });

    it("clears cache on connect failure so the next call retries", async () => {
        mockConnect.mockRejectedValueOnce(new Error("mongo down"));

        await expect(connectToDatabase()).rejects.toThrow("mongo down");

        // Second call: should attempt connect again, not return a stale rejected promise.
        mockConnect.mockResolvedValueOnce({
            connection: { getClient: () => ({ __client: "after-retry" }) },
        });

        const client = await connectToDatabase();
        expect(client).toEqual({ __client: "after-retry" });
        expect(mockConnect).toHaveBeenCalledTimes(2);
    });

    it("uses serverSelectionTimeoutMS=3000 (faster fail than upstream default)", async () => {
        mockConnect.mockResolvedValue({
            connection: { getClient: () => ({}) },
        });

        await connectToDatabase();

        const opts = mockConnect.mock.calls[0]?.[1];
        expect(opts).toMatchObject({ serverSelectionTimeoutMS: 3000 });
    });
});
