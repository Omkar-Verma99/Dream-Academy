import { campDetails } from "@/data/camps";
import { sanityFetch } from "@/lib/sanity/client";
import { sanityImageUrl } from "@/lib/sanity/mappers";
import {
  campFilterOptionsQuery,
  campSummariesCountQuery,
  campSummariesQuery,
  recentCampSummariesQuery,
} from "@/lib/sanity/queries";
import type { CampSummary } from "@/types/content";

export interface CampListItem extends CampSummary {
  photoCount: number;
  galleryImages: string[];
}

export interface CampFilterOptions {
  years: string[];
  districts: string[];
  total: number;
}

export interface CampsPageResult {
  items: CampListItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export const CAMPS_PAGE_SIZE = 12;

type SummaryRecord = {
  title: string;
  slug: string;
  location: CampSummary["location"];
  dateStart: string;
  dateEnd?: string;
  heroImage?: { asset?: { _ref?: string; _id?: string; url?: string }; alt?: string };
  caption?: string;
  photoCount?: number;
  photos?: Array<{ asset?: { _ref?: string; _id?: string; url?: string }; alt?: string }>;
};

function yearBounds(year: string) {
  if (!year) return { yearStart: "", yearEnd: "" };
  return { yearStart: `${year}-01-01`, yearEnd: `${year}-12-31` };
}

function searchPattern(q: string) {
  const trimmed = q.trim();
  if (!trimmed) return "";
  return `*${trimmed}*`;
}

function buildGalleryImages(camp: SummaryRecord, width = 640): string[] {
  const urls: string[] = [];

  const hero = sanityImageUrl(camp.heroImage, width);
  if (hero) urls.push(hero);

  for (const photo of camp.photos ?? []) {
    const src = sanityImageUrl(photo, width);
    if (src && !urls.includes(src)) urls.push(src);
  }

  return urls;
}

function mapSummaryRecord(camp: SummaryRecord, width = 640): CampListItem {
  const galleryImages = buildGalleryImages(camp, width);
  const heroUrl = galleryImages[0] ?? "/images/placeholder-camp.svg";
  return {
    title: camp.title,
    slug: camp.slug,
    location: camp.location,
    dateStart: camp.dateStart,
    dateEnd: camp.dateEnd,
    imageSrc: heroUrl,
    imageAlt: camp.heroImage?.alt ?? camp.title,
    caption: camp.caption ?? camp.heroImage?.alt ?? camp.title,
    photoCount: camp.photoCount ?? galleryImages.length,
    galleryImages,
  };
}

function mapFallbackSummaries(): CampListItem[] {
  return campDetails.map((camp) => ({
    title: camp.title,
    slug: camp.slug,
    location: camp.location,
    dateStart: camp.dateStart,
    dateEnd: camp.dateEnd,
    imageSrc: camp.imageSrc,
    imageAlt: camp.imageAlt,
    caption: camp.caption,
    photoCount: camp.photos.length,
    galleryImages: camp.photos.map((photo) => photo.src),
  }));
}

function filterFallbackCamps(
  camps: CampListItem[],
  options: { year?: string; district?: string; q?: string; page: number; pageSize: number },
): CampsPageResult {
  const q = options.q?.trim().toLowerCase() ?? "";
  const filtered = camps.filter((camp) => {
    if (options.year && !camp.dateStart.startsWith(options.year)) return false;
    if (options.district && camp.location.district !== options.district) return false;
    if (q) {
      const haystack =
        `${camp.title} ${camp.location.name} ${camp.location.district}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const start = (options.page - 1) * options.pageSize;
  const items = filtered.slice(start, start + options.pageSize);

  return {
    items,
    total: filtered.length,
    page: options.page,
    pageSize: options.pageSize,
    hasMore: start + items.length < filtered.length,
  };
}

export async function getRecentCampSummaries(limit = 6): Promise<CampListItem[]> {
  const camps = await sanityFetch<SummaryRecord[]>(recentCampSummariesQuery, {
    limit: limit - 1,
  });

  if (camps?.length) {
    return camps.map((camp) => mapSummaryRecord(camp));
  }

  return mapFallbackSummaries().slice(0, limit);
}

export async function getCampFilterOptions(): Promise<CampFilterOptions> {
  const options = await sanityFetch<CampFilterOptions>(campFilterOptionsQuery);
  if (options) return options;

  const fallback = mapFallbackSummaries();
  return {
    years: [...new Set(fallback.map((camp) => camp.dateStart.slice(0, 4)))].sort(
      (a, b) => b.localeCompare(a),
    ),
    districts: [...new Set(fallback.map((camp) => camp.location.district))].sort(),
    total: fallback.length,
  };
}

export async function getCampSummariesPage(options: {
  page?: number;
  pageSize?: number;
  year?: string;
  district?: string;
  q?: string;
}): Promise<CampsPageResult> {
  const page = Math.max(1, options.page ?? 1);
  const pageSize = options.pageSize ?? CAMPS_PAGE_SIZE;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const { yearStart, yearEnd } = yearBounds(options.year ?? "");
  const q = searchPattern(options.q ?? "");

  const params = {
    start,
    end,
    district: options.district ?? "",
    yearStart,
    yearEnd,
    q,
  };

  const [items, total] = await Promise.all([
    sanityFetch<SummaryRecord[]>(campSummariesQuery, params),
    sanityFetch<number>(campSummariesCountQuery, params),
  ]);

  if (items && typeof total === "number") {
    return {
      items: items.map((camp) => mapSummaryRecord(camp)),
      total,
      page,
      pageSize,
      hasMore: start + items.length < total,
    };
  }

  return filterFallbackCamps(mapFallbackSummaries(), {
    year: options.year,
    district: options.district,
    q: options.q,
    page,
    pageSize,
  });
}
