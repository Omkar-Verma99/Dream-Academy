import {
  fallbackCamps,
  fallbackEvents,
  fallbackFocusAreas,
  fallbackPublications,
  fallbackResearch,
  fallbackSiteSettings,
} from "@/data/fallback";
import { sanityFetch } from "@/lib/sanity/client";
import {
  focusAreasQuery,
  recentCampsQuery,
  recentPublicationsQuery,
  siteSettingsQuery,
  upcomingEventsQuery,
  featuredResearchQuery,
} from "@/lib/sanity/queries";
import { sanityImageUrl } from "@/lib/sanity/mappers";
import type { HomepageData } from "@/types/content";

function mapCampsFromSanity(
  camps: Array<{
    title: string;
    slug: string;
    location: { name: string; district: string; state: string };
    dateStart: string;
    dateEnd?: string;
    caption?: string;
    heroImage?: { asset?: { url?: string }; alt?: string };
  }> | null,
): HomepageData["recentCamps"] {
  if (!camps?.length) {
    return fallbackCamps;
  }

  return camps.map((camp, index) => {
    const imageSrc =
      sanityImageUrl(camp.heroImage) ??
      fallbackCamps[index]?.imageSrc ??
      "/images/placeholder-camp.svg";
    return {
      title: camp.title,
      slug: camp.slug,
      location: camp.location,
      dateStart: camp.dateStart,
      dateEnd: camp.dateEnd,
      imageSrc,
      imageAlt: camp.heroImage?.alt ?? camp.caption ?? camp.title,
      caption: camp.caption ?? camp.title,
    };
  });
}

export async function getHomepageData(): Promise<HomepageData> {
  const [settings, focusAreas, recentCamps, featuredResearch, recentPublications, upcomingEvents] =
    await Promise.all([
      sanityFetch<HomepageData["settings"]>(siteSettingsQuery),
      sanityFetch<HomepageData["focusAreas"]>(focusAreasQuery),
      sanityFetch<
        Array<{
          title: string;
          slug: string;
          location: { name: string; district: string; state: string };
          dateStart: string;
          dateEnd?: string;
          caption?: string;
          heroImage?: { asset?: { url?: string }; alt?: string };
        }>
      >(recentCampsQuery),
      sanityFetch<HomepageData["featuredResearch"]>(featuredResearchQuery),
      sanityFetch<HomepageData["recentPublications"]>(recentPublicationsQuery),
      sanityFetch<HomepageData["upcomingEvents"]>(upcomingEventsQuery, { limit: 4 }),
    ]);

  const resolvedFocusAreas = focusAreas?.length
    ? focusAreas.map((area) => {
        const fallback = fallbackFocusAreas.find((item) => item.slug === area.slug);
        return {
          ...area,
          points: area.points?.length ? area.points : (fallback?.points ?? []),
          shortDescription: area.shortDescription || fallback?.shortDescription || "",
          title: area.title || fallback?.title || area.slug,
          romanNumeral: area.romanNumeral || fallback?.romanNumeral || "",
          ctaLabel: area.ctaLabel || fallback?.ctaLabel || "Learn more",
        };
      })
    : fallbackFocusAreas;

  return {
    settings: settings ?? fallbackSiteSettings,
    focusAreas: resolvedFocusAreas,
    recentCamps: mapCampsFromSanity(recentCamps),
    featuredResearch: featuredResearch?.length
      ? featuredResearch
      : fallbackResearch,
    recentPublications: recentPublications?.length
      ? recentPublications
      : fallbackPublications,
    upcomingEvents: upcomingEvents?.length ? upcomingEvents : fallbackEvents,
  };
}
