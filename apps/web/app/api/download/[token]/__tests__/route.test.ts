/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

// Hoisted mocks. The route imports these by absolute path; jest.mock at
// the top of the file replaces them before the route is required.
jest.mock("@models/Domain");
jest.mock("@models/DownloadLink");
jest.mock("@models/Course");
jest.mock("@models/Lesson");
jest.mock("@models/User");
jest.mock("@/services/logger", () => ({ error: jest.fn() }));
jest.mock("@/lib/record-activity", () => ({ recordActivity: jest.fn() }));
jest.mock("@/graphql/media/logic", () => ({ getMedia: jest.fn() }));

import DomainModel from "@models/Domain";
import DownloadLinkModel from "@models/DownloadLink";
import CourseModel from "@models/Course";
import LessonModel from "@models/Lesson";

const mockedDomain = DomainModel as jest.Mocked<typeof DomainModel>;
const mockedDownloadLink = DownloadLinkModel as jest.Mocked<
    typeof DownloadLinkModel
>;
const mockedCourse = CourseModel as jest.Mocked<typeof CourseModel>;
const mockedLesson = LessonModel as jest.Mocked<typeof LessonModel>;

function makeRequest(domainHeader: string | null = "academia") {
    const headers = new Headers();
    if (domainHeader !== null) {
        headers.set("domain", domainHeader);
    }
    return new NextRequest(
        "http://127.0.0.1:3000/api/download/some-token-value",
        { headers },
    );
}

describe("/api/download/[token] — regression guards from #5", () => {
    let GET: typeof import("../route").GET;

    beforeEach(async () => {
        jest.clearAllMocks();
        GET = (await import("../route")).GET;
    });

    it("returns a Response (not a plain object) when domain is not found", async () => {
        // Bug being guarded: previously the handler returned
        // `{ error: { message: "Domain not found", status: 404 } }` —
        // a plain object — when the domain was missing. Next 15
        // surfaces that as undefined behavior and contributes to the
        // ERR_HTTP_HEADERS_SENT cascade observed on 2026-04-28.
        mockedDomain.findOne.mockResolvedValue(null as any);

        const result = await GET(makeRequest(), {
            params: Promise.resolve({ token: "abc" }),
        });

        expect(result).toBeInstanceOf(Response);
        expect((result as Response).status).toBe(404);
        const body = await (result as Response).json();
        expect(body).toEqual({ message: "Domain not found" });
    });

    it("returns 400 Response when token param is missing", async () => {
        mockedDomain.findOne.mockResolvedValue({
            _id: "d1",
            name: "academia",
        } as any);

        const result = await GET(makeRequest(), {
            params: Promise.resolve({ token: "" }),
        });

        expect(result).toBeInstanceOf(Response);
        expect((result as Response).status).toBe(400);
    });

    it("returns 404 Response when download link is missing or expired", async () => {
        mockedDomain.findOne.mockResolvedValue({
            _id: "d1",
            name: "academia",
        } as any);
        mockedDownloadLink.findOne.mockResolvedValue(null as any);

        const result = await GET(makeRequest(), {
            params: Promise.resolve({ token: "abc" }),
        });

        expect(result).toBeInstanceOf(Response);
        expect((result as Response).status).toBe(404);
    });

    it("returns 200 with empty-files message when course has no lessons", async () => {
        mockedDomain.findOne.mockResolvedValue({
            _id: "d1",
            name: "academia",
        } as any);
        mockedDownloadLink.findOne.mockResolvedValue({
            token: "abc",
            domain: "d1",
            courseId: "c1",
            userId: "u1",
            expiresAt: new Date(Date.now() + 60_000),
        } as any);
        mockedCourse.findOne.mockResolvedValue({
            _id: "c1",
            domain: "d1",
            courseId: "c1",
            published: true,
            title: "Course",
        } as any);
        mockedLesson.find.mockResolvedValue([] as any);

        const result = await GET(makeRequest(), {
            params: Promise.resolve({ token: "abc" }),
        });

        expect(result).toBeInstanceOf(Response);
        expect((result as Response).status).toBe(200);
    });
});
