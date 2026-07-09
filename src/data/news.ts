import { campDetails } from "@/data/camps";

export type NewsAlertType = "fieldwork" | "announcement" | "event";

export interface NewsAlert {
  id: string;
  type: NewsAlertType;
  title: string;
  excerpt: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  location?: string;
}

/** Offline fallback when Sanity is unavailable. */
export function getFallbackNewsAlerts(): NewsAlert[] {
  return campDetails.map((camp) => ({
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
