"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

export interface FieldCarouselSlide {
  id: string;
  imageSrc: string;
  imageAlt: string;
  location: string;
  caption: string;
  campDate?: string;
  galleryHref: string;
  reportHref: string;
}

interface HeroFieldCarouselProps {
  slides: FieldCarouselSlide[];
  autoPlayMs?: number;
  fullBleed?: boolean;
}

const PRELOAD_AHEAD = 5;

function formatCampDate(date?: string) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function wrapIndex(index: number, count: number) {
  return ((index % count) + count) % count;
}

function windowIndices(active: number, count: number, radius: number) {
  const indices = new Set<number>();
  for (let offset = -1; offset <= radius; offset += 1) {
    indices.add(wrapIndex(active + offset, count));
  }
  return indices;
}

function resolveDisplayed(active: number, loaded: Set<number>, count: number) {
  if (!count) return 0;
  if (loaded.has(active)) return active;
  for (let offset = 0; offset < count; offset += 1) {
    const index = wrapIndex(active - offset, count);
    if (loaded.has(index)) return index;
  }
  return active;
}

export function HeroFieldCarousel({
  slides,
  autoPlayMs = 6500,
  fullBleed = false,
}: HeroFieldCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());

  const count = slides.length;
  const displayed = useMemo(
    () => resolveDisplayed(active, loaded, count),
    [active, loaded, count],
  );

  const markLoaded = useCallback((index: number) => {
    setLoaded((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  const preloadIndices = useCallback(
    (indices: number[]) => {
      indices.forEach((index) => {
        const slide = slides[index];
        if (!slide) return;
        const img = new window.Image();
        img.src = slide.imageSrc;
      });
    },
    [slides],
  );

  useEffect(() => {
    if (!count) return;
    const initial = Array.from({ length: Math.min(PRELOAD_AHEAD, count) }, (_, i) => i);
    preloadIndices(initial);
  }, [count, preloadIndices]);

  useEffect(() => {
    if (!count) return;
    const ahead = Array.from({ length: PRELOAD_AHEAD }, (_, i) => wrapIndex(active + i, count));
    preloadIndices(ahead);
  }, [active, count, preloadIndices]);

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActive(wrapIndex(index, count));
    },
    [count],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = window.setInterval(next, autoPlayMs);
    return () => window.clearInterval(timer);
  }, [paused, count, next, autoPlayMs]);

  if (count === 0) return null;

  const slide = slides[active];
  const displayedSlide = slides[displayed] ?? slide;
  const campDateLabel = formatCampDate(slide.campDate);
  const renderIndices = windowIndices(active, count, PRELOAD_AHEAD);
  renderIndices.add(displayed);
  renderIndices.add(active);

  const frameClass = fullBleed
    ? "relative min-h-[68vh] w-full overflow-hidden sm:min-h-[74vh] lg:min-h-[85vh]"
    : "relative aspect-[4/3] min-h-[320px] overflow-hidden rounded-3xl shadow-xl sm:aspect-[16/11] sm:min-h-[400px] lg:aspect-[5/4] lg:min-h-[480px]";

  const arrowClass = fullBleed
    ? "carousel-arrow carousel-arrow-lg carousel-arrow-xl"
    : "carousel-arrow";

  const showDotNav = count <= 12;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={frameClass}>
        <div className="absolute inset-0 bg-ink" aria-hidden="true" />

        {slides.map((item, index) => {
          if (!renderIndices.has(index) && !loaded.has(index)) return null;

          const isVisible = index === displayed;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                isVisible ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
              aria-hidden={!isVisible}
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                priority={index < PRELOAD_AHEAD}
                sizes={fullBleed ? "100vw" : "(max-width: 1024px) 100vw, 55vw"}
                className="object-cover"
                onLoad={(event) => {
                  if (event.currentTarget.complete) markLoaded(index);
                }}
              />
            </div>
          );
        })}

        {!loaded.has(displayed) && displayedSlide ? (
          <div className="absolute inset-0 z-[5] animate-pulse bg-gradient-to-br from-ink via-brand/30 to-ink" />
        ) : null}

        <div className="absolute inset-0 z-20 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent pointer-events-none" />

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              className={`${arrowClass} absolute left-3 top-1/2 z-40 -translate-y-1/2 sm:left-6 lg:left-10`}
              aria-label="Previous photograph"
            >
              <ChevronIcon direction="left" large={fullBleed} />
            </button>
            <button
              type="button"
              onClick={next}
              className={`${arrowClass} absolute right-3 top-1/2 z-40 -translate-y-1/2 sm:right-6 lg:right-10`}
              aria-label="Next photograph"
            >
              <ChevronIcon direction="right" large={fullBleed} />
            </button>
          </>
        ) : null}

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end ${
            fullBleed
              ? "px-6 pb-8 sm:px-10 sm:pb-10 lg:px-20 lg:pb-14"
              : "p-5 sm:p-7 lg:p-8"
          }`}
        >
          {fullBleed ? (
            <div className="pointer-events-auto mx-auto max-w-4xl text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80 sm:text-sm">
                From the field
                {campDateLabel ? (
                  <span className="ml-2 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] tracking-wide">
                    {campDateLabel}
                  </span>
                ) : null}
              </p>
              <p className="mx-auto mt-3 max-w-3xl font-display text-xl font-semibold leading-snug text-white sm:text-2xl lg:mx-0 lg:text-[1.65rem]">
                {slide.caption}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:mt-6 lg:justify-start">
                <Link
                  href={slide.galleryHref}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand no-underline shadow-lg hover:bg-white/95 hover:no-underline sm:px-7 sm:py-3 sm:text-base"
                >
                  View gallery
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href={slide.reportHref}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-5 py-2.5 text-sm font-bold text-white no-underline hover:border-white hover:bg-white/10 hover:no-underline sm:px-7 sm:py-3 sm:text-base"
                >
                  Camp report
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="pointer-events-auto max-w-lg rounded-2xl border border-white/25 bg-paper/95 p-5 shadow-lg backdrop-blur-md sm:p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand sm:text-sm">
                From the field
              </p>
              <p className="mt-2 font-display text-xl font-bold text-ink sm:text-2xl">
                {slide.location}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                {slide.caption}
              </p>
            </div>
          )}

          {count > 1 ? (
            showDotNav ? (
              <div
                className={`flex items-center gap-2.5 ${fullBleed ? "mt-8 justify-center" : "mt-4"}`}
                role="tablist"
                aria-label="Camp photographs"
              >
                {slides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    aria-label={`Photo ${index + 1} of ${count}`}
                    onClick={() => goTo(index)}
                    className={`rounded-full transition-all duration-300 ${
                      fullBleed ? "h-2.5" : "h-2"
                    } ${
                      index === active
                        ? fullBleed
                          ? "w-10 bg-white"
                          : "w-8 bg-white"
                        : fullBleed
                          ? "w-2.5 bg-white/50 hover:bg-white/80"
                          : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            ) : (
              <p
                className={`text-xs font-medium text-white/75 sm:text-sm ${fullBleed ? "mt-4 text-center lg:mt-5 lg:text-left" : "mt-4"}`}
              >
                Photo {active + 1} of {count}
              </p>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({
  direction,
  large = false,
}: {
  direction: "left" | "right";
  large?: boolean;
}) {
  const size = large ? 34 : 22;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}
