import { createHubPage } from "@/components/templates/ContentHubPage";

const { metadata, Page } = createHubPage({
  eyebrow: "Outreach",
  title: "Community outreach",
  lead: "Field programmes extending metabolic health services to underserved communities across Uttar Pradesh.",
  metadata: {
    title: "Community Outreach",
    description: "Community outreach programmes at DREAM Academy.",
    path: "/outreach",
  },
  links: [
    {
      title: "Mobile clinics",
      href: "/outreach/mobile-clinics",
      description: "Travelling screening units serving rural and peri-urban areas.",
    },
    {
      title: "Rural initiatives",
      href: "/outreach/rural-initiatives",
      description: "Block-level programmes in underserved districts.",
    },
    {
      title: "School programmes",
      href: "/outreach/school-programs",
      description: "Nutrition and lifestyle education for students and families.",
    },
    {
      title: "Women's empowerment",
      href: "/outreach/womens-empowerment",
      description: "Health education and screening programmes for women.",
    },
    {
      title: "NGO partnerships",
      href: "/outreach/ngo-partnerships",
      description: "Collaborations with local NGOs for community reach.",
    },
  ],
});

export { metadata };
export default Page;

