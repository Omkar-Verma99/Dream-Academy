"use server";

import { z } from "zod";

import { saveFormSubmission } from "@/lib/forms/save-submission";

const donationSchema = z.object({
  donorName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  pan: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format."),
  amount: z.number().min(100),
  frequency: z.enum(["one-time", "monthly"]),
});

export interface DonationSubmitState {
  success: boolean;
  message: string;
}

export async function submitDonationIntent(
  input: z.infer<typeof donationSchema>,
): Promise<DonationSubmitState> {
  const parsed = donationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check your entries.",
    };
  }

  const saved = await saveFormSubmission({
    formType: "donation",
    name: parsed.data.donorName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    pan: parsed.data.pan,
    amount: parsed.data.amount,
    frequency: parsed.data.frequency,
    payload: parsed.data,
  });

  if (!saved.ok) {
    return {
      success: false,
      message: "Could not save donation details. Your PDF was still downloaded.",
    };
  }

  return { success: true, message: "Donation details saved." };
}
