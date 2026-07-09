"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

const ROTATE_MS = 3000;

type CampCardGalleryProps = {
  images: string[];
  alt: string;
  priority?: boolean;
};

export function CampCardGallery({ images, alt, priority = false }: CampCardGalleryProps) {
  const slides = images.length ? images : ["/images/placeholder-camp.svg"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      {slides.map((src, index) => (
        <Image
          key={`${src}-${index}`}
          src={src}
          alt={alt}
          fill
          priority={priority && index === 0}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`img-zoom object-cover transition-opacity duration-700 ease-in-out ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
