import { z } from "zod";

import { saveFormSubmission } from "@/lib/forms/save-submission";
import { getClientIp, checkRateLimit } from "@/lib/api/rate-limit";
import { jsonError, jsonSuccess } from "@/lib/api/response";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`newsletter:${ip}`)) {
    return jsonError("Too many requests. Please try again later.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body.");
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed.");
  }

  const saved = await saveFormSubmission({
    formType: "newsletter",
    email: parsed.data.email,
    payload: parsed.data,
  });

  if (!saved.ok) {
    return jsonError("Could not save subscription. Please try again later.", 500);
  }

  return jsonSuccess({ subscribed: true });
}
