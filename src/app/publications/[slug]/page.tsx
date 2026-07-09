const pages = {
  guidelines: {
    title: "Clinical guidelines",
    description: "Clinical practice guidelines from DREAM Academy.",
    paragraphs: [
      "DREAM Academy develops and disseminates clinical guidelines for diabetes screening, metabolic risk assessment, and community-based patient education.",
      "Guidelines are reviewed by faculty and updated as new evidence becomes available.",
    ],
  },
  newsletters: {
    title: "Newsletters",
    description: "DREAM Academy programme newsletters.",
    paragraphs: [
      "Programme newsletters provide updates on camps, research findings, and educational events. Subscribe via the homepage to receive updates by email.",
    ],
  },
  "patient-education": {
    title: "Patient education",
    description: "Patient education materials for diabetes and metabolic health.",
    paragraphs: [
      "Patient education materials are available in Hindi and English, covering diet, physical activity, medication adherence, and when to seek follow-up care.",
    ],
  },
  "annual-reports": {
    title: "Annual reports",
    description: "Annual reports from DREAM Academy.",
    paragraphs: [
      "Annual reports summarise programme reach, research output, and financial transparency. Reports are also available on the transparency page.",
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
    path: `/publications/${slug}`,
  });
}

export default async function PublicationSubPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
  const { createStaticPage } = await import("@/components/templates/StaticPage");
  const { Page: StaticPage } = createStaticPage({
    eyebrow: "Publications",
    title: page.title,
    backHref: "/publications",
    backLabel: "Publications",
    metadata: {
      title: page.title,
      description: page.description,
      path: `/publications/${slug}`,
    },
    paragraphs: [...page.paragraphs],
  });
  return <StaticPage />;
}
