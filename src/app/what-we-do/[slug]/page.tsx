import { redirect } from "next/navigation";

import { fallbackFocusAreas } from "@/data/fallback";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return fallbackFocusAreas.map((area) => ({ slug: area.slug }));
}

export default async function FocusAreaRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  const area = fallbackFocusAreas.find((item) => item.slug === slug);
  redirect(area ? `/what-we-do#${area.slug}` : "/what-we-do");
}
