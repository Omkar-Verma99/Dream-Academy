import { z } from "zod";

import { saveFormSubmission } from "@/lib/forms/save-submission";
import { getClientIp, checkRateLimit } from "@/lib/api/rate-limit";
import { jsonError, jsonSuccess } from "@/lib/api/response";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
  consent: z.literal(true),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`contact:${ip}`)) {
    return jsonError("Too many requests. Please try again later.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body.");
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed.");
  }

  const saved = await saveFormSubmission({
    formType: "contact",
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
    payload: parsed.data,
  });

  if (!saved.ok) {
    return jsonError("Could not save your message. Please try again later.", 500);
  }

  return jsonSuccess({ received: true });
}
