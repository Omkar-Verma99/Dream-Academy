export type FormSubmissionType =
  | "contact"
  | "volunteer"
  | "newsletter"
  | "donation";

export type FormSubmissionRecord = {
  formType: FormSubmissionType;
  name?: string;
  email?: string;
  phone?: string;
  pan?: string;
  subject?: string;
  message?: string;
  background?: string;
  amount?: number;
  frequency?: "one-time" | "monthly";
  payload?: Record<string, unknown>;
};
