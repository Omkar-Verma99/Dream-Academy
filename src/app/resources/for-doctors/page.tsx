import { createStaticPage } from "@/components/templates/StaticPage";

const { metadata, Page } = createStaticPage({
  eyebrow: "Resources",
  title: "Resources for doctors",
  lead: "Clinical calculators, presentations, and reference materials for healthcare professionals.",
  metadata: {
    title: "Resources for Doctors",
    description: "Clinical resources for healthcare professionals from DREAM Academy.",
    path: "/resources/for-doctors",
  },
  paragraphs: [
    "DREAM Academy provides clinical reference materials, screening protocols, and presentation slides for use in continuing medical education and community training.",
    "Resources are developed by faculty and reviewed for alignment with current evidence-based guidelines.",
  ],
});

export { metadata };
export default Page;

