import Link from "next/link";
import { Plus } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getPortalEvents } from "@/lib/portal/data";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Manage events",
  description: "Create and edit events in the DREAM Academy staff portal.",
  path: "/portal/events",
});

export default async function PortalEventsPage() {
  const events = await getPortalEvents();

  return (
    <Section pad="sm">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-h2 font-bold text-ink">Events</h1>
            <p className="mt-2 text-sm text-ink-muted">
              Publish conferences, CME sessions, webinars, and awareness programmes.
            </p>
          </div>
          <Button href="/portal/events/new" size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New event
          </Button>
        </div>

        <ul className="mt-8 grid gap-4">
          {events.map((event) => (
            <li
              key={event._id}
              className="flex flex-col gap-4 rounded-[24px] border border-border bg-paper p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="font-semibold text-ink">{event.title}</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {event.type} · {event.startDateTime.slice(0, 10)}
                  {event.venue ? ` · ${event.venue}` : ""}
                </p>
              </div>
              <Button href={`/portal/events/${event._id}/edit`} size="sm" variant="secondary">
                Edit
              </Button>
            </li>
          ))}
        </ul>

        {!events.length ? (
          <p className="mt-8 text-sm text-ink-muted">No events yet. Create your first event.</p>
        ) : null}

        <p className="mt-8 text-sm text-ink-muted">
          <Link href="/portal/dashboard" className="text-brand">
            ← Back to dashboard
          </Link>
        </p>
      </Container>
    </Section>
  );
}
