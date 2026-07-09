import Link from "next/link";
import { Plus } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getPortalCamps } from "@/lib/portal/data";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Manage camps",
  description: "Create and edit diabetes camp reports in the DREAM Academy staff portal.",
  path: "/portal/camps",
});

export default async function PortalCampsPage() {
  const camps = await getPortalCamps();

  return (
    <Section pad="sm">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-h2 font-bold text-ink">Camps</h1>
            <p className="mt-2 text-sm text-ink-muted">
              Add camp details, upload photos, and publish field reports to the website.
            </p>
          </div>
          <Button href="/portal/camps/new" size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New camp
          </Button>
        </div>

        <ul className="mt-8 grid gap-4">
          {camps.map((camp) => (
            <li
              key={camp._id}
              className="flex flex-col gap-4 rounded-[24px] border border-border bg-paper p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="font-semibold text-ink">{camp.title}</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {camp.location.name}, {camp.location.district} · {camp.dateStart}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={`/portal/camps/${camp._id}/edit`} size="sm" variant="secondary">
                  Edit
                </Button>
                <Button href={`/events/camps/${camp.slug}`} size="sm" variant="ghost">
                  View live
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {!camps.length ? (
          <p className="mt-8 text-sm text-ink-muted">No camps yet. Create your first camp report.</p>
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
