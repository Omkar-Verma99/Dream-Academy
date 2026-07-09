import Link from "next/link";

import type { EventSummary } from "@/types/content";

const eventTypeLabels: Record<string, string> = {
  conference: "Conference",
  cme: "CME",
  camp: "Health camp",
  webinar: "Webinar",
  campaign: "Campaign",
};

function formatEventDate(dateTime: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateTime));
}

export function EventCard({ event, compact = false }: { event: EventSummary; compact?: boolean }) {
  const date = new Date(event.startDateTime);
  const day = new Intl.DateTimeFormat("en-IN", { day: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en-IN", { month: "short" }).format(date);

  return (
    <article
      id={event.slug}
      className="scroll-mt-28 flex gap-4 rounded-[24px] border border-brand/15 bg-paper p-5 shadow-sm sm:gap-5 sm:p-6"
    >
      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-brand-soft text-brand sm:h-16 sm:w-16">
        <span className="font-display text-xl font-bold leading-none sm:text-2xl">{day}</span>
        <span className="mt-1 text-[10px] font-extrabold uppercase tracking-wider">{month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <span className="rounded-full bg-brand-soft px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand">
          {eventTypeLabels[event.type] ?? event.type}
        </span>
        <h3 className={`${compact ? "text-base" : "text-h4"} mt-2 font-semibold text-ink`}>
          {event.title}
        </h3>
        <p className="mt-1 text-xs font-medium text-ink-subtle">
          {formatEventDate(event.startDateTime)}
        </p>
        {!compact && event.description ? (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">
            {event.description}
          </p>
        ) : null}
        {event.registrationUrl ? (
          <Link
            href={event.registrationUrl}
            className="mt-3 inline-flex text-sm font-semibold text-brand no-underline hover:underline"
          >
            Register / learn more →
          </Link>
        ) : null}
      </div>
    </article>
  );
}
