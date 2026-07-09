import Link from "next/link";
import { Plus } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getPortalResearch } from "@/lib/portal/data";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Manage research",
  description: "Create and edit research projects in the DREAM Academy staff portal.",
  path: "/portal/research",
});

export default async function PortalResearchPage() {
  const projects = await getPortalResearch();

  return (
    <Section pad="sm">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-h2 font-bold text-ink">Research</h1>
            <p className="mt-2 text-sm text-ink-muted">
              Publish ongoing studies and completed research. Up to two ongoing projects appear on the homepage.
            </p>
          </div>
          <Button href="/portal/research/new" size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New project
          </Button>
        </div>

        <ul className="mt-8 grid gap-4">
          {projects.map((project) => (
            <li
              key={project._id}
              className="flex flex-col gap-4 rounded-[24px] border border-border bg-paper p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="font-semibold text-ink">{project.title}</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {project.status}
                  {project.startDate ? ` · ${project.startDate.slice(0, 10)}` : ""}
                </p>
              </div>
              <Button href={`/portal/research/${project._id}/edit`} size="sm" variant="secondary">
                Edit
              </Button>
            </li>
          ))}
        </ul>

        {!projects.length ? (
          <p className="mt-8 text-sm text-ink-muted">No research projects yet. Create your first project.</p>
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
