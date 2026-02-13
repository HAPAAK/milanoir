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

const isPhoneFieldUnsupportedError = (message: string): boolean =>
  /phone/i.test(message) &&
  /(unknown|invalid|not allowed|not supported|additional|schema|property|field)/i.test(message);

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
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : undefined;
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : undefined;
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!email) {
      return res.status(400).json({ error: "A valid email is required." });
    }

    if (!EMAIL_REGEX.test(email)) {
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
        email,
        first_name: firstName,
        last_name: lastName,
        ...(resendAudienceId ? { audience_id: resendAudienceId } : {}),
      };
      if (includePhone && phone) {
        payload.phone = phone;
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

    let { response: waitlistResponse, data: responseData } = await createContact(Boolean(phone));

    if (!waitlistResponse.ok && phone) {
      const maybePhoneFieldError = extractErrorMessage(responseData, "");
      if (isPhoneFieldUnsupportedError(maybePhoneFieldError)) {
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
