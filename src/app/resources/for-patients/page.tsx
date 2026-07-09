import { createHubPage } from "@/components/templates/ContentHubPage";

const { metadata, Page } = createHubPage({
  eyebrow: "Resources",
  title: "Resources for patients",
  lead: "Patient-facing guides on managing diabetes and metabolic health.",
  metadata: {
    title: "Resources for Patients",
    description: "Patient education resources from DREAM Academy.",
    path: "/resources/for-patients",
  },
  links: [
    { title: "Diabetes", href: "/resources/for-patients/diabetes", description: "Understanding and managing type 2 diabetes." },
    { title: "Obesity", href: "/resources/for-patients/obesity", description: "Weight management and metabolic risk." },
    { title: "Hypertension", href: "/resources/for-patients/hypertension", description: "Blood pressure and cardiovascular health." },
    { title: "MASLD", href: "/resources/for-patients/masld", description: "Metabolic dysfunction-associated steatotic liver disease." },
  ],
});

export { metadata };
export default Page;

