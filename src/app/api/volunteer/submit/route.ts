import { z } from "zod";

import { saveFormSubmission } from "@/lib/forms/save-submission";
import { getClientIp, checkRateLimit } from "@/lib/api/rate-limit";
import { jsonError, jsonSuccess } from "@/lib/api/response";

const volunteerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  background: z.enum(["healthcare", "student", "community", "other"]),
  message: z.string().min(10),
  consent: z.literal(true),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`volunteer:${ip}`)) {
    return jsonError("Too many requests. Please try again later.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body.");
  }

  const parsed = volunteerSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed.");
  }

  const saved = await saveFormSubmission({
    formType: "volunteer",
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    background: parsed.data.background,
    message: parsed.data.message,
    payload: parsed.data,
  });

  if (!saved.ok) {
    return jsonError("Could not save your application. Please try again later.", 500);
  }

  return jsonSuccess({ received: true });
}
