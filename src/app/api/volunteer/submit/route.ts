import { z } from "zod";

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

  return jsonSuccess({ received: true });
}
