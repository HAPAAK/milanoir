import type { NextApiRequest, NextApiResponse } from "next";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type JsonRecord = Record<string, unknown>;

const extractErrorMessage = (data: unknown, fallback: string): string => {
  if (typeof data === "object" && data !== null) {
    const record = data as JsonRecord;
    if (typeof record.error === "string" && record.error.trim()) return record.error;
    if (typeof record.message === "string" && record.message.trim()) return record.message;
  }
  return fallback;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name = "", email = "", message = "" } = req.body ?? {};
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (!cleanName || !cleanEmail) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; margin-bottom: 20px;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${cleanName}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${cleanEmail}</p>
          ${cleanMessage ? `<p style="margin: 10px 0;"><strong>Message:</strong></p><p style="white-space: pre-wrap; margin: 10px 0;">${cleanMessage}</p>` : ""}
        </div>
      </div>
    `;

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return res.status(500).json({
        error: "Email service is not configured. Please try again later.",
      });
    }

    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "info@milanoir-events.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Milanoir Events Resend <onboarding@resend.dev>";

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipientEmail,
        reply_to: cleanEmail,
        subject: `New Contact Form Submission from ${cleanName}`,
        html: htmlContent,
      }),
    });

    const responseData = await emailResponse.json().catch(() => ({}));
    if (!emailResponse.ok) {
      const providerError = extractErrorMessage(
        responseData,
        "Unable to send the message right now. Please try again.",
      );
      console.error("Contact email delivery failed", {
        status: emailResponse.status,
        responseData,
      });
      return res.status(400).json({ error: providerError });
    }

    const emailId =
      typeof responseData === "object" &&
      responseData !== null &&
      typeof (responseData as JsonRecord).id === "string"
        ? ((responseData as JsonRecord).id as string)
        : undefined;

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
      emailId,
    });
  } catch (error) {
    console.error("Contact API internal error", error);
    return res.status(500).json({
      error: "Internal server error while sending your message.",
    });
  }
}
