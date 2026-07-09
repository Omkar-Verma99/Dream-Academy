import Link from "next/link";

import { ResearchForm } from "@/components/portal/ResearchForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "New research project",
  description: "Create a research project in the DREAM Academy staff portal.",
  path: "/portal/research/new",
});

export default function NewResearchPage() {
  return (
    <Section pad="sm">
      <Container className="max-w-4xl">
        <ResearchForm />
        <p className="mt-4 text-sm text-ink-muted">
          <Link href="/portal/research" className="text-brand">
            ← Back to research
          </Link>
        </p>
      </Container>
    </Section>
  );
}
