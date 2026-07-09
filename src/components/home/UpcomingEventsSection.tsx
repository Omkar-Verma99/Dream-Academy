import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader, SectionIntro } from "@/components/ui/SectionHeader";
import type { EventSummary } from "@/types/content";

interface UpcomingEventsSectionProps {
  events: EventSummary[];
}

function formatEventDate(dateTime: string) {
  const date = new Date(dateTime);
  return {
    day: new Intl.DateTimeFormat("en-IN", { day: "numeric" }).format(date),
    month: new Intl.DateTimeFormat("en-IN", { month: "short" }).format(date),
  };
}

export function UpcomingEventsSection({ events }: UpcomingEventsSectionProps) {
  return (
    <Section bordered aria-labelledby="events-heading">
      <Container>
        <SectionHeader
          eyebrow="Events"
          title="Coming up next"
          action={{ href: "/events#upcoming-events", label: "All events" }}
        />

        <SectionIntro>
          <div className="grid gap-4 md:grid-cols-2">
            {events.map((event) => {
              const { day, month } = formatEventDate(event.startDateTime);
              return (
                <article
                  key={event.slug}
                  className="hover-lift flex gap-5 rounded-3xl border border-border bg-paper p-6 shadow-sm"
                >
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-brand-soft text-brand-deep">
                    <span className="font-display text-2xl font-bold leading-none">
                      {day}
                    </span>
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-wider">
                      {month}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                      {event.type.replace("_", " ")}
                    </p>
                    <h3 className="mt-1 font-semibold text-ink">
                      <Link
                        href={`/events#${event.slug}`}
                        className="no-underline hover:text-brand"
                      >
                        {event.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {event.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </SectionIntro>
      </Container>
    </Section>
  );
}
