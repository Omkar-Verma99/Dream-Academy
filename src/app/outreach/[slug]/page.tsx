const pages = {
  "mobile-clinics": {
    title: "Mobile clinics",
    description: "Mobile screening clinics bringing diabetes care to underserved communities.",
    paragraphs: [
      "DREAM Academy mobile clinics travel to rural and peri-urban communities with portable screening equipment, trained volunteers, and physician oversight.",
      "Each clinic provides glucose testing, blood pressure measurement, BMI assessment, and counselling with referral support for follow-up care.",
    ],
  },
  "rural-initiatives": {
    title: "Rural initiatives",
    description: "Rural health initiatives across Uttar Pradesh districts.",
    paragraphs: [
      "Rural initiatives target blocks with limited access to metabolic care, partnering with local health workers and panchayat leaders to organise screening and education sessions.",
    ],
  },
  "school-programs": {
    title: "School programmes",
    description: "School-based nutrition and lifestyle education programmes.",
    paragraphs: [
      "School programmes teach students and families about nutrition, physical activity, and early signs of metabolic risk in age-appropriate formats.",
    ],
  },
  "womens-empowerment": {
    title: "Women's empowerment",
    description: "Women's health screening and education programmes.",
    paragraphs: [
      "Women's health programmes address gestational diabetes risk, metabolic syndrome, and nutrition during key life stages through community sessions and screening camps.",
    ],
  },
  "ngo-partnerships": {
    title: "NGO partnerships",
    description: "Partnerships with NGOs for community health outreach.",
    paragraphs: [
      "DREAM Academy collaborates with local NGOs to extend programme reach, share resources, and coordinate field activities in communities where partner organisations have established trust.",
    ],
  },
} as const;

type Slug = keyof typeof pages;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) return {};

  const { createPageMetadata } = await import("@/lib/metadata");
  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: `/outreach/${slug}`,
  });
}

export default async function OutreachSubPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) {
    const { notFound } = await import("next/navigation");
    notFound();
  }

  const { createStaticPage } = await import("@/components/templates/StaticPage");
  const { Page: StaticPage } = createStaticPage({
    eyebrow: "Outreach",
    title: page.title,
    backHref: "/outreach",
    backLabel: "Outreach",
    metadata: {
      title: page.title,
      description: page.description,
      path: `/outreach/${slug}`,
    },
    paragraphs: [...page.paragraphs],
  });

  return <StaticPage />;
}
