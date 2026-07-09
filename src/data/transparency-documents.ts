export type TransparencyDocumentCategory =
  | "registration"
  | "reports"
  | "financial";

export interface TransparencyDocument {
  id: string;
  label: string;
  category: TransparencyDocumentCategory;
  description: string;
  /** Shown when no file is available yet */
  statusText?: string;
  /** Public path e.g. /documents/transparency/foo.pdf */
  downloadPath?: string;
  /** Suggested filename for the browser download */
  downloadFileName?: string;
}

export const transparencyDocuments: TransparencyDocument[] = [
  {
    id: "registration-certificate",
    label: "Registration certificate",
    category: "registration",
    description: "Official registration certificate for DREAM Academy Trust.",
    statusText: "Upload pending",
  },
  {
    id: "trust-deed",
    label: "Trust deed",
    category: "registration",
    description: "Registered under the Indian Trusts Act, 1882.",
    downloadPath: "/documents/transparency/dream-academy-trust-deed.pdf",
    downloadFileName: "DREAM-Academy-Trust-Deed.pdf",
  },
  {
    id: "pan",
    label: "PAN",
    category: "registration",
    description: "Permanent Account Number certificate for the trust.",
    statusText: "On request",
  },
  {
    id: "section-12a",
    label: "Section 12A",
    category: "registration",
    description: "Income-tax exemption registration under Section 12A.",
    statusText: "On request",
  },
  {
    id: "section-80g",
    label: "Section 80G",
    category: "registration",
    description: "Donor tax-deduction registration under Section 80G.",
    statusText: "On request",
  },
  {
    id: "csr-registration",
    label: "CSR registration",
    category: "registration",
    description: "Corporate Social Responsibility registration, when applicable.",
    statusText: "When available",
  },
  {
    id: "annual-reports",
    label: "Annual reports",
    category: "reports",
    description: "Programme reach, research output, and fund utilisation summaries.",
    statusText: "Upload pending",
  },
  {
    id: "audit-reports",
    label: "Audit reports",
    category: "reports",
    description: "Independent annual audit summaries for the trust.",
    statusText: "Upload pending",
  },
  {
    id: "financial-statements",
    label: "Financial statements",
    category: "financial",
    description: "Income, expenditure, and balance sheet disclosures.",
    statusText: "Upload pending",
  },
];

export function getTransparencyDocuments(category?: TransparencyDocumentCategory) {
  if (!category) return transparencyDocuments;
  return transparencyDocuments.filter((doc) => doc.category === category);
}

export function getTransparencyDocument(id: string) {
  return transparencyDocuments.find((doc) => doc.id === id);
}

export const transparencyCategoryLabels: Record<TransparencyDocumentCategory, string> = {
  registration: "Registrations & certifications",
  reports: "Annual & audit reports",
  financial: "Financial statements",
};
