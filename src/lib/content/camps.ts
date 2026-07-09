import { campDetails, getCampBySlug as getFallbackCampBySlug } from "@/data/camps";
import type { CampDetail } from "@/data/camps";
import { sanityFetch } from "@/lib/sanity/client";
import {
  allCampsQuery,
  campBySlugQuery,
} from "@/lib/sanity/queries";
import {
  blocksToParagraphs,
  sanityImageUrl,
  type SanityCampRecord,
} from "@/lib/sanity/mappers";

function mapSanityCamp(camp: SanityCampRecord): CampDetail {
  const heroUrl =
    sanityImageUrl(camp.heroImage, 1200) ?? "/images/placeholder-camp.svg";
  const photos =
    camp.photos
      ?.map((photo, index) => {
        const src = sanityImageUrl(photo, 960);
        if (!src) return null;
        return {
          src,
          alt: photo.alt ?? photo.caption ?? `${camp.title} — photo ${index + 1}`,
        };
      })
      .filter((p): p is { src: string; alt: string } => Boolean(p)) ?? [];

  const videos =
    camp.galleryVideos
      ?.map((video, index) => {
        const src = video.asset?.url;
        if (!src) return null;
        return {
          src,
          alt: video.caption ?? `${camp.title} — video ${index + 1}`,
        };
      })
      .filter((v): v is { src: string; alt: string } => Boolean(v)) ?? [];

  const report = blocksToParagraphs(camp.report);

  return {
    title: camp.title,
    slug: camp.slug,
    location: camp.location,
    dateStart: camp.dateStart,
    dateEnd: camp.dateEnd,
    imageSrc: heroUrl,
    imageAlt: camp.heroImage?.alt ?? camp.title,
    caption: camp.heroImage?.alt ?? camp.title,
    photos: photos.length ? photos : [{ src: heroUrl, alt: camp.title }],
    videos: videos.length ? videos : undefined,
    report: report.length ? report : undefined,
    statistics: camp.statistics,
    video: camp.video,
  };
}

export async function getCamps(): Promise<CampDetail[]> {
  const camps = await sanityFetch<SanityCampRecord[]>(allCampsQuery);
  if (camps?.length) {
    return camps.map(mapSanityCamp);
  }
  return campDetails;
}

export async function getCampBySlug(slug: string): Promise<CampDetail | undefined> {
  const camp = await sanityFetch<SanityCampRecord>(campBySlugQuery, { slug });
  if (camp) {
    return mapSanityCamp(camp);
  }
  return getFallbackCampBySlug(slug);
}
