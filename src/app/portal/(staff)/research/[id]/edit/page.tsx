import Link from "next/link";
import { notFound } from "next/navigation";

import { ResearchForm } from "@/components/portal/ResearchForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { getPortalResearchById } from "@/lib/portal/data";
import { createPageMetadata } from "@/lib/metadata";

type EditResearchPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: EditResearchPageProps) {
  const { id } = await params;
  const project = await getPortalResearchById(id);
  return createPageMetadata({
    title: project ? `Edit ${project.title}` : "Edit research project",
    description: "Edit a research project in the DREAM Academy staff portal.",
    path: `/portal/research/${id}/edit`,
  });
}

export default async function EditResearchPage({ params }: EditResearchPageProps) {
  const { id } = await params;
  const project = await getPortalResearchById(id);

  if (!project) notFound();

  return (
    <Section pad="sm">
      <Container className="max-w-4xl">
        <ResearchForm project={project} />
        <p className="mt-4 text-sm text-ink-muted">
          <Link href="/portal/research" className="text-brand">
            ← Back to research
          </Link>
        </p>
      </Container>
    </Section>
  );
}
