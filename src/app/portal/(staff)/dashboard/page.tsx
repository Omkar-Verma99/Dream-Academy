import Link from "next/link";
import { CalendarDays, Camera, FlaskConical, Plus } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getPortalCamps, getPortalEvents, getPortalResearch } from "@/lib/portal/data";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Staff Dashboard",
  description: "Manage DREAM Academy camps, events, and content.",
  path: "/portal/dashboard",
});

export default async function PortalDashboardPage() {
  const [camps, events, research] = await Promise.all([
    getPortalCamps(),
    getPortalEvents(),
    getPortalResearch(),
  ]);

  return (
    <Section pad="sm">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-h2 font-bold text-ink">Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-ink-muted">
              Publish camps with photos and videos, schedule events, manage research, and update the public website — no Sanity login needed.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <section className="rounded-[28px] border border-border bg-paper p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Camera className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-semibold text-ink">Camps</h2>
                  <p className="text-sm text-ink-muted">{camps.length} published</p>
                </div>
              </div>
              <Button href="/portal/camps/new" size="sm">
                <Plus className="h-4 w-4" aria-hidden="true" />
                New camp
              </Button>
            </div>
            <ul className="mt-5 space-y-3">
              {camps.slice(0, 4).map((camp) => (
                <li key={camp._id}>
                  <Link
                    href={`/portal/camps/${camp._id}/edit`}
                    className="block rounded-xl border border-border px-4 py-3 text-sm transition hover:border-brand/30"
                  >
                    <span className="font-medium text-ink">{camp.title}</span>
                    <span className="mt-1 block text-ink-muted">
                      {camp.location.district} · {camp.dateStart}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/portal/camps" variant="secondary" size="sm" className="mt-5">
              View all camps
            </Button>
          </section>

          <section className="rounded-[28px] border border-border bg-paper p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-semibold text-ink">Events</h2>
                  <p className="text-sm text-ink-muted">{events.length} published</p>
                </div>
              </div>
              <Button href="/portal/events/new" size="sm">
                <Plus className="h-4 w-4" aria-hidden="true" />
                New event
              </Button>
            </div>
            <ul className="mt-5 space-y-3">
              {events.slice(0, 4).map((event) => (
                <li key={event._id}>
                  <Link
                    href={`/portal/events/${event._id}/edit`}
                    className="block rounded-xl border border-border px-4 py-3 text-sm transition hover:border-brand/30"
                  >
                    <span className="font-medium text-ink">{event.title}</span>
                    <span className="mt-1 block text-ink-muted">
                      {event.type} · {event.startDateTime.slice(0, 10)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/portal/events" variant="secondary" size="sm" className="mt-5">
              View all events
            </Button>
          </section>

          <section className="rounded-[28px] border border-border bg-paper p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <FlaskConical className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-semibold text-ink">Research</h2>
                  <p className="text-sm text-ink-muted">{research.length} published</p>
                </div>
              </div>
              <Button href="/portal/research/new" size="sm">
                <Plus className="h-4 w-4" aria-hidden="true" />
                New project
              </Button>
            </div>
            <ul className="mt-5 space-y-3">
              {research.slice(0, 4).map((project) => (
                <li key={project._id}>
                  <Link
                    href={`/portal/research/${project._id}/edit`}
                    className="block rounded-xl border border-border px-4 py-3 text-sm transition hover:border-brand/30"
                  >
                    <span className="font-medium text-ink">{project.title}</span>
                    <span className="mt-1 block text-ink-muted">
                      {project.status}
                      {project.startDate ? ` · ${project.startDate.slice(0, 10)}` : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/portal/research" variant="secondary" size="sm" className="mt-5">
              View all research
            </Button>
          </section>
        </div>
      </Container>
    </Section>
  );
}
