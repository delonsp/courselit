import { NextRequest } from "next/server";
import { responses } from "@/config/strings";
import { UIConstants as constants } from "@courselit/common-models";
import { checkPermission } from "@courselit/utils";
import User from "@models/User";
import DomainModel, { Domain } from "@models/Domain";
import { auth } from "@/auth";
import { error } from "@/services/logger";
import FormData from "form-data";

const medialitServer = process.env.MEDIALIT_SERVER || "https://medialit.cloud";

// Timeout for uploads (60 seconds) - Vercel/serverless specific
export const maxDuration = 60;

export async function POST(req: NextRequest) {
    const domain = await DomainModel.findOne<Domain>({
        name: req.headers.get("domain"),
    });
    if (!domain) {
        return Response.json({ message: "Domain not found" }, { status: 404 });
    }

    const session = await auth();

    let user;
    if (session) {
        user = await User.findOne({
            email: session.user!.email,
            domain: domain._id,
            active: true,
        });
    }

    if (!user) {
        return Response.json({}, { status: 401 });
    }

    if (
        !checkPermission(user!.permissions, [constants.permissions.manageMedia])
    ) {
        return Response.json(
            { message: responses.action_not_allowed },
            { status: 403 },
        );
    }

    if (!process.env.MEDIALIT_APIKEY) {
        return Response.json(
            { error: responses.medialit_apikey_notfound },
            { status: 500 },
        );
    }

    try {
        // Get the form data from the request
        const incomingFormData = await req.formData();

        // Extract file and other fields
        const file = incomingFormData.get("file") as File | null;
        const caption = (incomingFormData.get("caption") as string) || "";
        const access = (incomingFormData.get("access") as string) || "private";

        if (!file) {
            return Response.json(
                { error: "No file provided" },
                { status: 400 },
            );
        }

        // Convert File to Buffer for form-data package
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Use form-data package (more compatible with busboy)
        const form = new FormData();
        form.append("file", buffer, {
            filename: file.name,
            contentType: file.type || "application/octet-stream",
        });
        form.append("caption", caption);
        form.append("access", access);
        form.append("group", domain.name);
        form.append("apikey", process.env.MEDIALIT_APIKEY);

        // Forward the request to MediaLit using http module via form-data
        const response = await new Promise<{ status: number; data: any }>(
            (resolve, reject) => {
                form.submit(`${medialitServer}/media/create`, (err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    let data = "";
                    res.on("data", (chunk) => {
                        data += chunk;
                    });
                    res.on("end", () => {
                        try {
                            resolve({
                                status: res.statusCode || 500,
                                data: JSON.parse(data),
                            });
                        } catch {
                            resolve({
                                status: res.statusCode || 500,
                                data: { error: data },
                            });
                        }
                    });
                    res.on("error", reject);
                });
            },
        );

        if (response.status === 200) {
            // Remove group from response (frontend doesn't need it)
            if (response.data && response.data.group) {
                delete response.data.group;
            }
            return Response.json(response.data);
        } else {
            error(`MediaLit upload failed: ${JSON.stringify(response.data)}`);
            return Response.json(
                {
                    error:
                        response.data?.error ||
                        response.data?.message ||
                        "Upload failed",
                },
                { status: response.status },
            );
        }
    } catch (err: any) {
        error(`Upload proxy error: ${err.message}`, {
            stack: err.stack,
        });
        return Response.json({ error: err.message }, { status: 500 });
    }
}
