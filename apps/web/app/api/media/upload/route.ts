import { NextRequest } from "next/server";
import { responses } from "@/config/strings";
import { UIConstants as constants } from "@courselit/common-models";
import { checkPermission } from "@courselit/utils";
import User from "@models/User";
import DomainModel, { Domain } from "@models/Domain";
import { auth } from "@/auth";
import { error } from "@/services/logger";

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
        const formData = await req.formData();

        // Add the group (domain) and apikey to the form data
        formData.append("group", domain.name);
        formData.append("apikey", process.env.MEDIALIT_APIKEY);

        // Forward the request to MediaLit
        const response = await fetch(`${medialitServer}/media/create`, {
            method: "POST",
            body: formData,
        });

        const jsonResponse = await response.json();

        if (response.status === 200) {
            // Remove group from response (frontend doesn't need it)
            if (jsonResponse && jsonResponse.group) {
                delete jsonResponse.group;
            }
            return Response.json(jsonResponse);
        } else {
            return Response.json(
                { error: jsonResponse.error || "Upload failed" },
                { status: response.status },
            );
        }
    } catch (err: any) {
        error(err.message, {
            stack: err.stack,
        });
        return Response.json({ error: err.message }, { status: 500 });
    }
}
