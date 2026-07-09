import Link from "next/link";
import { Camera, MapPin } from "lucide-react";

import { CampCardGallery } from "@/components/events/CampCardGallery";
import type { CampListItem } from "@/lib/content/camp-summaries";

function formatCampDate(dateStart: string, dateEnd?: string) {
  const formatter = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const start = new Date(dateStart);
  if (!dateEnd || dateEnd === dateStart) return formatter.format(start);
  return `${formatter.format(start)} – ${formatter.format(new Date(dateEnd))}`;
}

export function CampCard({ camp, priority = false }: { camp: CampListItem; priority?: boolean }) {
  return (
    <Link
      href={`/events/camps/${camp.slug}`}
      className="group hover-lift flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-paper no-underline shadow-sm hover:no-underline"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <CampCardGallery
          images={camp.galleryImages?.length ? camp.galleryImages : [camp.imageSrc]}
          alt={camp.imageAlt}
          priority={priority}
        />
        {camp.photoCount > 0 ? (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-ink/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            {camp.photoCount}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-green">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {camp.location.district}
        </p>
        <h3 className="mt-2 line-clamp-2 font-semibold text-ink transition-colors group-hover:text-brand">
          {camp.title}
        </h3>
        <p className="mt-2 text-xs text-ink-subtle">{formatCampDate(camp.dateStart, camp.dateEnd)}</p>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {camp.location.name}
        </p>
        <span className="link-arrow mt-4 text-sm">View report</span>
      </div>
    </Link>
  );
}
