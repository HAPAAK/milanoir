import type { NextApiRequest, NextApiResponse } from "next";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type JsonRecord = Record<string, unknown>;

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

const isPhoneFieldUnsupportedError = (message: string): boolean =>
  /phone/i.test(message) &&
  /(unknown|invalid|not allowed|not supported|additional|schema|property|field)/i.test(message);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email = "", firstName, lastName, phone = "" } = req.body ?? {};
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanFirst = typeof firstName === "string" ? firstName.trim() : undefined;
    const cleanLast = typeof lastName === "string" ? lastName.trim() : undefined;
    const cleanPhone = typeof phone === "string" ? phone.trim() : "";

    if (!cleanEmail) {
      return res.status(400).json({ error: "A valid email is required." });
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return res.status(500).json({
        error: "Waitlist service is not configured. Please try again later.",
      });
    }

    const resendAudienceId = process.env.RESEND_AUDIENCE_ID;

    const createContact = async (includePhone: boolean) => {
      const payload: JsonRecord = {
        email: cleanEmail,
        first_name: cleanFirst,
        last_name: cleanLast,
        ...(resendAudienceId ? { audience_id: resendAudienceId } : {}),
      };
      if (includePhone && cleanPhone) {
        payload.phone = cleanPhone;
      }

      const response = await fetch("https://api.resend.com/contacts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      return { response, data };
    };

    let { response: waitlistResponse, data: responseData } = await createContact(Boolean(cleanPhone));

    if (!waitlistResponse.ok && cleanPhone) {
      const maybePhoneFieldError = extractErrorMessage(responseData, "");
      if (maybePhoneFieldError && isPhoneFieldUnsupportedError(maybePhoneFieldError)) {
        const retryWithoutPhone = await createContact(false);
        waitlistResponse = retryWithoutPhone.response;
        responseData = retryWithoutPhone.data;

        if (waitlistResponse.ok) {
          return res.status(200).json({
            success: true,
            warning: "Phone number was submitted, but Resend Audience did not accept a phone field.",
          });
        }
      }
    }

    if (!waitlistResponse.ok) {
      const providerError = extractErrorMessage(
        responseData,
        "Unable to join waitlist right now. Please try again.",
      );
      console.error("Waitlist contact creation failed", {
        status: waitlistResponse.status,
        responseData,
      });
      return res.status(400).json({ error: providerError });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Waitlist API internal error", error);
    return res.status(500).json({
      error: "Internal server error while joining waitlist.",
    });
  }
}
