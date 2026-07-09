"use client";

import { useMemo, useState } from "react";

import { GalleryThumbnail, MediaLightbox } from "@/components/media/MediaLightbox";
import { buildCampGalleryItems } from "@/lib/media/gallery";

type CampGalleryProps = {
  title: string;
  photos: Array<{ src: string; alt: string }>;
  videoUrl?: string;
  videoFiles?: Array<{ src: string; alt: string }>;
};

export function CampGallery({ title, photos, videoUrl, videoFiles }: CampGalleryProps) {
  const items = useMemo(
    () => buildCampGalleryItems({ title, photos, videoUrl, videoFiles }),
    [photos, title, videoFiles, videoUrl],
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!items.length) return null;

  const [hero, ...rest] = items;

  return (
    <>
      {hero ? (
        <figure>
          <GalleryThumbnail
            item={hero}
            onClick={() => setActiveIndex(0)}
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="rounded-none border border-border"
            aspectClassName="aspect-[16/7]"
          />
          <figcaption className="sr-only">{hero.alt}</figcaption>
        </figure>
      ) : null}

      {rest.length > 0 ? (
        <section aria-labelledby="camp-gallery" className="mt-16">
          <h2 id="camp-gallery" className="text-h3 font-medium">
            Gallery ({rest.length})
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Click any photo or video to view it full size.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item, index) => (
              <GalleryThumbnail
                key={item.id}
                item={item}
                onClick={() => setActiveIndex(index + 1)}
                priority={index < 6}
              />
            ))}
          </div>
        </section>
      ) : null}

      {activeIndex !== null ? (
        <MediaLightbox
          items={items}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      ) : null}
    </>
  );
}
