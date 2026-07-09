import Link from "next/link";

import { CampForm } from "@/components/portal/CampForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "New camp",
  description: "Create a new diabetes camp report with photos and field notes.",
  path: "/portal/camps/new",
});

export default function NewCampPage() {
  return (
    <Section pad="sm">
      <Container className="max-w-4xl">
        <CampForm />
        <p className="mt-4 text-sm text-ink-muted">
          <Link href="/portal/camps" className="text-brand">
            ← Back to camps
          </Link>
        </p>
      </Container>
    </Section>
  );
}
