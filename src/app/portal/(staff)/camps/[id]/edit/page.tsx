import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { deleteCamp } from "@/app/actions/portal/camps";
import { CampForm } from "@/components/portal/CampForm";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { getPortalCampById } from "@/lib/portal/data";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const camp = await getPortalCampById(id);
  return createPageMetadata({
    title: camp ? `Edit ${camp.title}` : "Edit camp",
    description: "Edit camp content in the DREAM Academy staff portal.",
    path: `/portal/camps/${id}/edit`,
  });
}

export default async function EditCampPage({ params }: PageProps) {
  const { id } = await params;
  const camp = await getPortalCampById(id);
  if (!camp) notFound();

  async function deleteAction() {
    "use server";
    const result = await deleteCamp(id);
    if (result.success) redirect("/portal/camps");
  }

  return (
    <Section pad="sm">
      <Container className="max-w-4xl">
        <CampForm camp={camp} />
        <form action={deleteAction} className="mt-6">
          <button
            type="submit"
            className="text-sm font-medium text-orange transition hover:text-ink"
          >
            Delete this camp
          </button>
        </form>
        <p className="mt-4 text-sm text-ink-muted">
          <Link href="/portal/camps" className="text-brand">
            ← Back to camps
          </Link>
        </p>
      </Container>
    </Section>
  );
}
