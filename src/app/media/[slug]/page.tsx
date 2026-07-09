import { siteConfig } from "@/lib/site";

const pages = {
  "press-releases": {
    title: "Press releases",
    description: "Press releases from DREAM Academy.",
    paragraphs: [
      `Official press releases are published here as programmes launch. Media enquiries: ${siteConfig.contact.email}.`,
    ],
  },
  "news-coverage": {
    title: "News coverage",
    description: "News coverage of DREAM Academy programmes.",
    paragraphs: ["A curated archive of media coverage of DREAM Academy camps, research, and educational events."],
  },
  photos: {
    title: "Photos",
    description: "Photo galleries from DREAM Academy events.",
    paragraphs: ["Photograph galleries are available on the events gallery page and individual camp reports."],
  },
  videos: {
    title: "Videos",
    description: "Video library from DREAM Academy programmes.",
    paragraphs: ["Camp and conference videos are embedded on individual event pages when available."],
  },
  podcasts: {
    title: "Podcasts",
    description: "Podcast episodes on metabolic health.",
    paragraphs: ["Podcast episodes featuring faculty and community partners will be listed here as they are published."],
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
    path: `/media/${slug}`,
  });
}

export default async function MediaSubPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pages[slug as Slug];
  if (!page) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
  const { createStaticPage } = await import("@/components/templates/StaticPage");
  const { Page: StaticPage } = createStaticPage({
    eyebrow: "Media",
    title: page.title,
    backHref: "/media",
    backLabel: "Media centre",
    metadata: {
      title: page.title,
      description: page.description,
      path: `/media/${slug}`,
    },
    paragraphs: [...page.paragraphs],
  });
  return <StaticPage />;
}
