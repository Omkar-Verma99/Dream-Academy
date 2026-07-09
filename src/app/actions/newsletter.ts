"use server";

import { z } from "zod";

import { saveFormSubmission } from "@/lib/forms/save-submission";

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

  const saved = await saveFormSubmission({
    formType: "newsletter",
    email: parsed.data.email,
    payload: parsed.data,
  });

  if (!saved.ok) {
    return {
      success: false,
      message: "Subscription could not be saved. Please try again later.",
    };
  }

  return {
    success: true,
    message: "Thank you. You have been subscribed to DREAM Academy updates.",
  };
}
