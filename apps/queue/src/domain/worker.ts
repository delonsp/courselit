import { Worker } from "bullmq";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import redis from "../redis";
import { logger } from "../logger";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: +(process.env.EMAIL_PORT || 587),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const resendKey = process.env.RESEND_API_KEY;
const resendClient = resendKey ? new Resend(resendKey) : null;

const worker = new Worker(
    "mail",
    async (job) => {
        const { to, from, subject, body } = job.data;

        try {
            if (resendClient) {
                logger.info(
                    { jobId: job.id, to, subject },
                    "queue: sending mail via Resend",
                );
                await resendClient.emails.send({
                    from,
                    to,
                    subject,
                    html: body,
                });
                logger.info(
                    { jobId: job.id, to, subject },
                    "queue: mail sent via Resend",
                );
                return;
            }

            logger.info(
                { jobId: job.id, to, subject },
                "queue: sending mail via SMTP transporter",
            );
            await transporter.sendMail({
                from,
                to,
                subject,
                html: body,
            });
            logger.info(
                { jobId: job.id, to, subject },
                "queue: mail sent successfully via SMTP transporter",
            );
        } catch (err: any) {
            logger.error(err);
        }
    },
    { connection: redis },
);

export default worker;
