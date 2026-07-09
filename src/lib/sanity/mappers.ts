import { urlFor } from "./image";

type PortableTextBlock = {
  _type: string;
  children?: Array<{ text?: string }>;
};

type SanityImage = {
  asset?: { _ref?: string; _id?: string; url?: string };
  alt?: string;
  caption?: string;
};

export function sanityImageUrl(
  image: SanityImage | null | undefined,
  width = 1200,
): string | null {
  if (!image) return null;

  const assetRef = image.asset?._ref ?? image.asset?._id;
  if (assetRef) {
    return urlFor({ ...image, asset: { _ref: assetRef } })
      .width(width)
      .auto("format")
      .quality(80)
      .url();
  }

  if (image.asset?.url) {
    try {
      const url = new URL(image.asset.url);
      url.searchParams.set("w", String(width));
      url.searchParams.set("auto", "format");
      url.searchParams.set("q", "80");
      return url.toString();
    } catch {
      return image.asset.url;
    }
  }

  return null;
}

export function blocksToParagraphs(
  blocks: PortableTextBlock[] | null | undefined,
): string[] {
  if (!blocks?.length) return [];
  return blocks
    .filter((block) => block._type === "block")
    .map((block) => {
      const children = (block as { children?: Array<{ text?: string }> }).children;
      return children?.map((child) => child.text ?? "").join("") ?? "";
    })
    .filter(Boolean);
}

export type SanityCampRecord = {
  title: string;
  slug: string;
  location: { name: string; district: string; state: string };
  dateStart: string;
  dateEnd?: string;
  heroImage?: SanityImage;
  photos?: Array<SanityImage & { caption?: string }>;
  galleryVideos?: Array<{ asset?: { url?: string }; caption?: string }>;
  report?: PortableTextBlock[];
  statistics?: Array<{ label: string; value: string }>;
  video?: string;
};

export type SanityEventRecord = {
  title: string;
  slug: string;
  type: string;
  startDateTime: string;
  endDateTime?: string;
  description?: string;
  registrationUrl?: string;
};

export type SanityBlogRecord = {
  title: string;
  slug: string;
  excerpt?: string;
  author?: string;
  publishedAt: string;
  body?: PortableTextBlock[];
};

export type SanityResearchRecord = {
  title: string;
  slug: string;
  description?: string;
  status: "ongoing" | "completed" | "planned";
  startDate?: string;
  principalInvestigator?: string;
  body?: PortableTextBlock[];
};

export type SanityPublicationRecord = {
  title: string;
  slug: string;
  authors?: string[];
  journal?: string;
  year?: number;
  doi?: string;
  abstract?: PortableTextBlock[];
};
