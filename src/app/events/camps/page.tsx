import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { CampsArchive } from "@/components/events/CampsArchive";
import { Section } from "@/components/ui/Section";
import {
  getCampFilterOptions,
  getCampSummariesPage,
} from "@/lib/content/camp-summaries";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Gallery — camps & field media",
  description:
    "Browse diabetes camp photos, videos, and community screening reports across Uttar Pradesh — search by year, district, and location.",
  path: "/events/camps",
});

export default async function CampsArchivePage() {
  const [initial, filters] = await Promise.all([
    getCampSummariesPage({ page: 1 }),
    getCampFilterOptions(),
  ]);

  return (
    <article>
      <PageHeader
        eyebrow="Gallery"
        title="Camp photos, videos & reports"
        lead="Every camp includes a gallery of photos and videos plus a field report. Search by year or district, then open a camp and click any item to view it full size."
        backHref="/events#diabetes-camps"
        backLabel="Events hub"
      />

      <Section pad="sm">
        <Container>
          <CampsArchive initial={initial} filters={filters} />
        </Container>
      </Section>
    </article>
  );
}
