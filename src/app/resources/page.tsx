import { createHubPage } from "@/components/templates/ContentHubPage";

const { metadata, Page } = createHubPage({
  eyebrow: "Resources",
  title: "Resource library",
  lead: "Educational resources for patients and healthcare professionals.",
  metadata: {
    title: "Resources",
    description: "Patient and clinician resources from DREAM Academy.",
    path: "/resources",
  },
  links: [
    {
      title: "For patients",
      href: "/resources/for-patients",
      description: "Guides on diabetes, obesity, hypertension, and liver health.",
    },
    {
      title: "For doctors",
      href: "/resources/for-doctors",
      description: "Clinical calculators, presentations, and reference materials.",
    },
  ],
});

export { metadata };
export default Page;

