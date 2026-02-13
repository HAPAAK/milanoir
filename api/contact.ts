const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RequestBody = Record<string, unknown>;
type JsonRecord = Record<string, unknown>;

const parseBody = (body: unknown): RequestBody => {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body) as RequestBody;
    } catch {
      return {};
    }
  }
  return typeof body === "object" ? (body as RequestBody) : {};
};

const extractErrorMessage = (data: unknown, fallback: string): string => {
  if (typeof data === "object" && data !== null) {
    const record = data as JsonRecord;
    if (typeof record.error === "string" && record.error.trim()) {
      return record.error;
    }
    if (typeof record.message === "string" && record.message.trim()) {
      return record.message;
    }
  }
  return fallback;
};

export default async function handler(
  req: { method?: string; body?: unknown },
  res: {
    status: (statusCode: number) => {
      json: (payload: unknown) => void;
    };
  },
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = parseBody(req.body);
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; margin-bottom: 20px;">New Contact Form Submission</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          ${message ? `<p style="margin: 10px 0;"><strong>Message:</strong></p><p style="white-space: pre-wrap; margin: 10px 0;">${message}</p>` : ""}
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 20px;">
          ${name} has reached out via the contact form on Milanoir Events Website.
        </p>
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
        reply_to: email,
        subject: `New Contact Form Submission from ${name}`,
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
      return res.status(400).json({
        error: providerError,
      });
    }

    const emailId = typeof (responseData as JsonRecord).id === "string"
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
