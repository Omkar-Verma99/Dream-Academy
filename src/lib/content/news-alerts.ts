import type { CampListItem } from "@/lib/content/camp-summaries";
import type { CampSummary } from "@/types/content";
import type { NewsAlert } from "@/data/news";
import { getFallbackNewsAlerts } from "@/data/news";

export function campsToNewsAlerts(
  camps: Array<CampSummary | CampListItem>,
  limit = 3,
): NewsAlert[] {
  return camps.slice(0, limit).map((camp) => ({
    id: camp.slug,
    type: "fieldwork" as const,
    title: camp.title,
    excerpt: camp.caption,
    date: camp.dateStart,
    imageSrc: camp.imageSrc,
    imageAlt: camp.imageAlt,
    href: `/events/camps/${camp.slug}`,
    location: `${camp.location.district}, ${camp.location.state}`,
  }));
}

/** @deprecated Prefer campsToNewsAlerts() with data already loaded on the page. */
export async function getHomepageNewsAlerts(limit = 3): Promise<NewsAlert[]> {
  const { getRecentCampSummaries } = await import("@/lib/content/camp-summaries");
  const camps = await getRecentCampSummaries(limit);

  if (camps.length) {
    return campsToNewsAlerts(camps, limit);
  }

  return getFallbackNewsAlerts().slice(0, limit);
}
