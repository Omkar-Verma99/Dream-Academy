import { createHubPage } from "@/components/templates/ContentHubPage";
import { transparencyDocuments } from "@/data/transparency-documents";

const downloadableCount = transparencyDocuments.filter((doc) => doc.downloadPath).length;

const { metadata, Page } = createHubPage({
  eyebrow: "Governance",
  title: "Transparency",
  lead: `DREAM Academy is committed to accountable governance and public reporting. ${downloadableCount} document${downloadableCount === 1 ? "" : "s"} available for download now; additional certificates and reports will be published here as they are finalised.`,
  metadata: {
    title: "Transparency",
    description:
      "Governance, trust deed, registration certificates, annual reports, and financial transparency at DREAM Academy.",
    path: "/transparency",
  },
  links: [
    {
      title: "Certificates & registrations",
      href: "/transparency/certificates",
      description:
        "Trust deed, registration certificate, PAN, 12A, 80G, and CSR documents — download when available.",
    },
    {
      title: "Annual reports",
      href: "/transparency/annual-reports",
      description: "Annual programme and financial reports for public review.",
    },
    {
      title: "Audit reports",
      href: "/transparency/audit-reports",
      description: "Independent audit summaries published after board review.",
    },
    {
      title: "Financial statements",
      href: "/transparency/financials",
      description: "Income, expenditure, and balance sheet disclosures.",
    },
  ],
});

export { metadata };
export default Page;
