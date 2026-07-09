import { campDetails } from "@/data/camps";
import type { FieldCarouselSlide } from "@/components/home/HeroFieldCarousel";
import { sanityFetch } from "@/lib/sanity/client";
import { fieldGalleryCampsQuery } from "@/lib/sanity/queries";
import { sanityImageUrl } from "@/lib/sanity/mappers";

type GalleryCampRecord = {
  title: string;
  slug: string;
  location: { name: string; district: string; state: string };
  dateStart: string;
  heroImage?: { asset?: { url?: string }; alt?: string };
  photos?: Array<{ asset?: { url?: string }; alt?: string; caption?: string }>;
};

const CAROUSEL_WIDTH = 1920;

function pushSlide(
  slides: FieldCarouselSlide[],
  camp: GalleryCampRecord,
  image: { asset?: { url?: string }; alt?: string; caption?: string } | undefined,
  index: number,
  label: string,
) {
  const src = sanityImageUrl(image, CAROUSEL_WIDTH);
  if (!src) return;

  const location = `${camp.location.name}, ${camp.location.district}`;
  slides.push({
    id: `${camp.slug}-${index}`,
    imageSrc: src,
    imageAlt:
      image?.alt ??
      image?.caption ??
      `${camp.title} — ${label}, ${camp.location.district}`,
    location,
    caption: camp.title,
    campDate: camp.dateStart,
    galleryHref: `/events/camps/${camp.slug}`,
    reportHref: `/events/camps/${camp.slug}`,
  });
}

function flattenCampPhotos(camp: GalleryCampRecord): FieldCarouselSlide[] {
  const slides: FieldCarouselSlide[] = [];
  const gallery = [...(camp.photos ?? [])].reverse();
  let index = 0;

  for (const photo of gallery) {
    pushSlide(slides, camp, photo, index, `gallery photo ${index + 1}`);
    index += 1;
  }

  if (camp.heroImage) {
    pushSlide(slides, camp, camp.heroImage, index, "cover photo");
  }

  return slides;
}

function flattenFallbackCamps(): FieldCarouselSlide[] {
  const slides: FieldCarouselSlide[] = [];

  for (const camp of campDetails) {
    const gallery = [...camp.photos].reverse();
    let index = 0;

    for (const photo of gallery) {
      slides.push({
        id: `${camp.slug}-${index}`,
        imageSrc: photo.src,
        imageAlt: photo.alt,
        location: `${camp.location.name}, ${camp.location.district}`,
        caption: camp.title,
        campDate: camp.dateStart,
        galleryHref: `/events/camps/${camp.slug}`,
        reportHref: `/events/camps/${camp.slug}`,
      });
      index += 1;
    }
  }

  return slides;
}

/** All camp photos, newest camps first; within each camp newest uploads first. */
export async function getFieldGallerySlides(): Promise<FieldCarouselSlide[]> {
  const camps = await sanityFetch<GalleryCampRecord[]>(fieldGalleryCampsQuery);

  if (camps?.length) {
    return camps.flatMap(flattenCampPhotos);
  }

  return flattenFallbackCamps();
}
