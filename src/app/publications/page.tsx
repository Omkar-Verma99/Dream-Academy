import { createHubPage } from "@/components/templates/ContentHubPage";

const { metadata, Page } = createHubPage({
  eyebrow: "Publications",
  title: "Publications",
  lead: "Clinical guidelines, newsletters, patient education materials, and annual reports.",
  metadata: {
    title: "Publications",
    description: "Public-facing publications from DREAM Academy.",
    path: "/publications",
  },
  links: [
    {
      title: "Clinical guidelines",
      href: "/publications/guidelines",
      description: "Evidence-based clinical practice guidelines.",
    },
    {
      title: "Newsletters",
      href: "/publications/newsletters",
      description: "Programme newsletters and updates.",
    },
    {
      title: "Patient education",
      href: "/publications/patient-education",
      description: "Downloadable patient education materials.",
    },
    {
      title: "Annual reports",
      href: "/publications/annual-reports",
      description: "Annual programme and financial reports.",
    },
  ],
});

export { metadata };
export default Page;

