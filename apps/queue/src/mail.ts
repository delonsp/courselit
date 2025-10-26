import { createTransport } from "nodemailer";
import { Resend } from "resend";

const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: +(process.env.EMAIL_PORT || 587),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const resendKey = process.env.RESEND_API_KEY;
const resendClient = resendKey ? new Resend(resendKey) : null;

export async function sendMail({
    from,
    to,
    subject,
    html,
}: {
    from: string;
    to: string;
    subject: string;
    html: string;
}) {
    if (resendClient) {
        try {
            await resendClient.emails.send({ from, to, subject, html });
            if (process.env.NODE_ENV !== "production") {
                // eslint-disable-next-line no-console
                console.log(
                    "Mail sent via Resend",
                    from,
                    to,
                    subject,
                    new Date(),
                );
            }
            return;
        } catch (err) {
            if (process.env.NODE_ENV !== "production") {
                // eslint-disable-next-line no-console
                console.error("Resend send failed, falling back to SMTP", err);
            }
        }
    }

    await transporter.sendMail({ from, to, subject, html });

    if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.log("Mail sent via SMTP", from, to, subject, new Date());
    }
}
