import { HeroFieldCarousel } from "./HeroFieldCarousel";
import type { FieldCarouselSlide } from "./HeroFieldCarousel";

interface FieldGallerySectionProps {
  slides: FieldCarouselSlide[];
}

export function FieldGallerySection({ slides }: FieldGallerySectionProps) {
  if (!slides.length) return null;

  return (
    <section
      aria-label="Gallery from our camps"
      className="relative w-full bg-ink"
    >
      <div className="section-divider absolute inset-x-0 top-0 z-10" aria-hidden="true" />
      <HeroFieldCarousel slides={slides} autoPlayMs={6500} fullBleed />
      <div className="section-divider absolute inset-x-0 bottom-0 z-10" aria-hidden="true" />
    </section>
  );
}
