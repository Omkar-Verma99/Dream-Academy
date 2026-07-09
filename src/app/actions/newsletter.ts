"use server";

import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export interface NewsletterState {
  success: boolean;
  message: string;
}

export async function subscribeNewsletter(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid email address.",
    };
  }

  // TODO: Integrate Resend + rate limiting via Upstash when credentials are configured.
  return {
    success: true,
    message:
      "Thank you. You have been subscribed to DREAM Academy updates.",
  };
}
