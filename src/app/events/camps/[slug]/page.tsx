import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CampGallery } from "@/components/events/CampGallery";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { getCampBySlug } from "@/lib/content/camps";
import { getRecentCampSummaries } from "@/lib/content/camp-summaries";
import { sanityFetch } from "@/lib/sanity/client";
import { campSlugsQuery } from "@/lib/sanity/queries";
import { campDetails } from "@/data/camps";
import { createPageMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>(campSlugsQuery);
  if (slugs?.length) {
    return slugs.map((camp) => ({ slug: camp.slug }));
  }
  return campDetails.map((camp) => ({ slug: camp.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const camp = await getCampBySlug(slug);
  if (!camp) return {};

  return createPageMetadata({
    title: camp.title,
    description: camp.caption,
    path: `/events/camps/${slug}`,
  });
}

function formatDateRange(start: string, end?: string) {
  const formatter = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  if (!end || end === start) return formatter.format(new Date(start));
  return `${formatter.format(new Date(start))} – ${formatter.format(new Date(end))}`;
}

export default async function CampDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const camp = await getCampBySlug(slug);

  if (!camp) {
    notFound();
  }

  const related = (await getRecentCampSummaries(4))
    .filter((item) => item.slug !== camp.slug)
    .slice(0, 3);

  return (
    <article>
      <PageHeader
        eyebrow="Diabetes Camp — Report"
        title={camp.title}
        lead={camp.caption}
        backHref="/events/camps"
        backLabel="Gallery"
      />

      <section className="border-b border-border bg-paper py-8">
        <Container>
          <dl className="flex flex-wrap gap-x-8 gap-y-2 font-sans text-sm text-ink-muted">
            <div>
              <dt className="sr-only">Location</dt>
              <dd>
                {camp.location.name}, {camp.location.district}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Date</dt>
              <dd>{formatDateRange(camp.dateStart, camp.dateEnd)}</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="bg-paper py-12">
        <Container>
          <CampGallery
            title={camp.title}
            photos={camp.photos}
            videoUrl={camp.video}
            videoFiles={camp.videos}
          />

          <div className="prose-editorial mt-12 space-y-6 text-ink-muted">
            {(camp.report ?? []).map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          {camp.statistics?.length ? (
            <section aria-labelledby="camp-stats" className="mt-16">
              <h2 id="camp-stats" className="text-h3 font-medium">
                Camp highlights
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-4">
                {camp.statistics.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-h2 font-light text-ochre">{stat.value}</p>
                    <p className="mt-2 font-sans text-xs uppercase tracking-wider text-ink-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-border bg-surface-sunk py-16">
          <Container>
            <h2 className="text-h3 font-medium">Related camps</h2>
            <ul className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/events/camps/${item.slug}`}
                    className="block no-underline hover:no-underline"
                  >
                    <div className="relative aspect-[4/3] border border-border">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes="33vw"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-h4 mt-4 text-ink hover:text-forest">
                      {item.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </article>
  );
}
