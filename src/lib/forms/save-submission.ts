import "server-only";

import { sanityWriteClient } from "@/lib/sanity/write-client";

import type { FormSubmissionRecord } from "./types";

export async function saveFormSubmission(
  record: FormSubmissionRecord,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  if (!sanityWriteClient) {
    return {
      ok: false,
      error: "Sanity write access is not configured (SANITY_API_TOKEN missing).",
    };
  }

  try {
    const doc = await sanityWriteClient.create({
      _type: "formSubmission",
      formType: record.formType,
      submittedAt: new Date().toISOString(),
      ...(record.name ? { name: record.name } : {}),
      ...(record.email ? { email: record.email } : {}),
      ...(record.phone ? { phone: record.phone } : {}),
      ...(record.pan ? { pan: record.pan } : {}),
      ...(record.subject ? { subject: record.subject } : {}),
      ...(record.message ? { message: record.message } : {}),
      ...(record.background ? { background: record.background } : {}),
      ...(record.amount != null ? { amount: record.amount } : {}),
      ...(record.frequency ? { frequency: record.frequency } : {}),
      ...(record.payload
        ? { payload: JSON.stringify(record.payload, null, 2) }
        : {}),
    });

    return { ok: true, id: doc._id };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save submission.";
    return { ok: false, error: message };
  }
}
