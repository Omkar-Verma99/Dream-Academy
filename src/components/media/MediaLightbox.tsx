"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { GalleryMediaItem } from "@/lib/media/gallery";

type MediaLightboxProps = {
  items: GalleryMediaItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function MediaLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: MediaLightboxProps) {
  const item = items[activeIndex];
  const hasMultiple = items.length > 1;

  const goPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasMultiple) goPrev();
      if (event.key === "ArrowRight" && hasMultiple) goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goNext, goPrev, hasMultiple, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Expanded gallery media"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Close gallery"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </button>

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:left-6"
            aria-label="Previous item"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:right-6"
            aria-label="Next item"
          >
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        </>
      ) : null}

      <div
        className="relative flex max-h-[85vh] w-full max-w-6xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        {item.kind === "image" ? (
          <div className="relative max-h-[80vh] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              className="mx-auto max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
            />
          </div>
        ) : null}

        {item.kind === "video-file" ? (
          <video
            key={item.src}
            src={item.src}
            controls
            autoPlay
            className="max-h-[80vh] w-full max-w-full rounded-lg bg-black"
            aria-label={item.alt}
          >
            <track kind="captions" />
          </video>
        ) : null}

        {item.kind === "video-embed" ? (
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-lg bg-black">
            <iframe
              key={item.embedUrl}
              src={item.embedUrl}
              title={item.alt}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        ) : null}

        <p className="mt-4 max-w-3xl text-center text-sm text-white/85">{item.alt}</p>

        {hasMultiple ? (
          <p className="mt-2 text-xs text-white/60">
            {activeIndex + 1} of {items.length}
          </p>
        ) : null}
      </div>
    </div>
  );
}

type GalleryThumbnailProps = {
  item: GalleryMediaItem;
  onClick: () => void;
  priority?: boolean;
  sizes?: string;
  className?: string;
  aspectClassName?: string;
};

export function GalleryThumbnail({
  item,
  onClick,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  className = "",
  aspectClassName = "aspect-[4/3]",
}: GalleryThumbnailProps) {
  const isVideo = item.kind !== "image";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full overflow-hidden rounded-2xl border border-border text-left transition hover:border-brand/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
      aria-label={`Expand ${item.alt}`}
    >
      <div className={`relative ${aspectClassName} bg-surface-sunk`}>
        {item.kind === "image" ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : null}

        {item.kind === "video-file" ? (
          <video
            src={item.src}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        ) : null}

        {item.kind === "video-embed" ? (
          item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt=""
              fill
              sizes={sizes}
              className="object-cover"
              aria-hidden="true"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-brand text-white">
              <span className="text-sm font-semibold">Video</span>
            </div>
          )
        ) : null}

        {isVideo ? (
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/25"
            aria-hidden="true"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand shadow-lg">
              <span className="ml-1 text-2xl leading-none">▶</span>
            </span>
          </span>
        ) : null}

        <span className="pointer-events-none absolute inset-0 bg-ink/0 transition group-hover:bg-ink/10" />
      </div>
    </button>
  );
}
