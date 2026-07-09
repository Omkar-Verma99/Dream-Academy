import Link from "next/link";

import { EventForm } from "@/components/portal/EventForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "New event",
  description: "Create a new event in the DREAM Academy staff portal.",
  path: "/portal/events/new",
});

export default function NewEventPage() {
  return (
    <Section pad="sm">
      <Container className="max-w-4xl">
        <EventForm />
        <p className="mt-4 text-sm text-ink-muted">
          <Link href="/portal/events" className="text-brand">
            ← Back to events
          </Link>
        </p>
      </Container>
    </Section>
  );
}
