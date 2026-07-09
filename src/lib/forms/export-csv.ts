import type { PortalFormSubmission } from "@/lib/portal/data";

function escapeCsv(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatSubmittedAt(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function formSubmissionsToCsv(rows: PortalFormSubmission[]) {
  const headers = [
    "Submitted at",
    "Form type",
    "Name",
    "Email",
    "Phone",
    "PAN",
    "Subject",
    "Message",
    "Background",
    "Amount (INR)",
    "Frequency",
  ];

  const lines = rows.map((row) =>
    [
      formatSubmittedAt(row.submittedAt),
      row.formType,
      row.name ?? "",
      row.email ?? "",
      row.phone ?? "",
      row.pan ?? "",
      row.subject ?? "",
      row.message ?? "",
      row.background ?? "",
      row.amount != null ? String(row.amount) : "",
      row.frequency ?? "",
    ]
      .map(escapeCsv)
      .join(","),
  );

  return [headers.join(","), ...lines].join("\r\n");
}
