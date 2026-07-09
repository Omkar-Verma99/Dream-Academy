"use server";

import { z } from "zod";

import { saveFormSubmission } from "@/lib/forms/save-submission";

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

  const saved = await saveFormSubmission({
    formType: "contact",
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
    payload: parsed.data,
  });

  if (!saved.ok) {
    return {
      success: false,
      message:
        "We could not save your message right now. Please email chandradiabetesclinic@gmail.com directly.",
    };
  }

  return {
    success: true,
    message: "Thank you. Your message has been received. We will respond shortly.",
  };
}
