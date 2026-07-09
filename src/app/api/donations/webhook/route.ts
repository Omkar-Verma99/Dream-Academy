import { jsonError, jsonSuccess } from "@/lib/api/response";

export async function POST(request: Request) {
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature) {
    return jsonError("Missing webhook signature.", 401);
  }

  // TODO: Verify Razorpay webhook signature with RAZORPAY_WEBHOOK_SECRET.
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return jsonError("Webhook not configured.", 503);
  }

  return jsonSuccess({ processed: true });
}
