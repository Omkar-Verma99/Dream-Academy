"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Please enter a subject."),
  message: z.string().min(10, "Please enter a message of at least 10 characters."),
  consent: z
    .string()
    .refine((value) => value === "true", {
      message: "Consent is required to submit this form.",
    }),
});

export interface ContactState {
  success: boolean;
  message: string;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    consent: formData.get("consent"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check your entries.",
    };
  }

  // TODO: Integrate Resend when RESEND_API_KEY is configured.
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return {
      success: false,
      message:
        "Online messaging is being configured. Please email us directly at chandradiabetesclinic@gmail.com and we will respond shortly.",
    };
  }

  return {
    success: true,
    message: "Thank you. Your message has been received. We will respond shortly.",
  };
}
