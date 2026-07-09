import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { deleteEvent } from "@/app/actions/portal/events";
import { EventForm } from "@/components/portal/EventForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { getPortalEventById } from "@/lib/portal/data";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const event = await getPortalEventById(id);
  return createPageMetadata({
    title: event ? `Edit ${event.title}` : "Edit event",
    description: "Edit event content in the DREAM Academy staff portal.",
    path: `/portal/events/${id}/edit`,
  });
}

export default async function EditEventPage({ params }: PageProps) {
  const { id } = await params;
  const event = await getPortalEventById(id);
  if (!event) notFound();

  async function deleteAction() {
    "use server";
    const result = await deleteEvent(id);
    if (result.success) redirect("/portal/events");
  }

  return (
    <Section pad="sm">
      <Container className="max-w-4xl">
        <EventForm event={event} />
        <form action={deleteAction} className="mt-6">
          <button
            type="submit"
            className="text-sm font-medium text-orange transition hover:text-ink"
          >
            Delete this event
          </button>
        </form>
        <p className="mt-4 text-sm text-ink-muted">
          <Link href="/portal/events" className="text-brand">
            ← Back to events
          </Link>
        </p>
      </Container>
    </Section>
  );
}
