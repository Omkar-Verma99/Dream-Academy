"use server";

import { z } from "zod";

import { saveFormSubmission } from "@/lib/forms/save-submission";

const volunteerSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  background: z.enum(["healthcare", "student", "community", "other"], {
    message: "Please select your background.",
  }),
  message: z.string().min(10, "Please tell us why you would like to volunteer."),
  consent: z
    .string()
    .refine((value) => value === "true", {
      message: "Consent is required to submit this form.",
    }),
});

export interface VolunteerState {
  success: boolean;
  message: string;
}

export async function submitVolunteer(
  _prevState: VolunteerState,
  formData: FormData,
): Promise<VolunteerState> {
  const parsed = volunteerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    background: formData.get("background"),
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
    formType: "volunteer",
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    background: parsed.data.background,
    message: parsed.data.message,
    payload: parsed.data,
  });

  if (!saved.ok) {
    return {
      success: false,
      message:
        "We could not save your application right now. Please email chandradiabetesclinic@gmail.com with your details.",
    };
  }

  return {
    success: true,
    message:
      "Thank you for your interest in volunteering. Our team will contact you shortly.",
  };
}
