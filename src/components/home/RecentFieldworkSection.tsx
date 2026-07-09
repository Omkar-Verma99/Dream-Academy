import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader, SectionIntro } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { CampCard } from "@/components/events/CampCard";
import type { CampListItem } from "@/lib/content/camp-summaries";
import type { CampSummary } from "@/types/content";

interface RecentFieldworkSectionProps {
  camps: CampSummary[];
}

function toListItem(camp: CampSummary): CampListItem {
  return {
    ...camp,
    photoCount: 0,
    galleryImages: [camp.imageSrc],
  };
}

export function RecentFieldworkSection({ camps }: RecentFieldworkSectionProps) {
  const featured = camps[0];
  if (!featured) return null;

  const mosaic = camps.slice(0, 6);

  return (
    <Section tone="surface" aria-labelledby="fieldwork-heading">
      <Container>
        <SectionHeader
          eyebrow="In the community"
          title="Recent fieldwork"
          action={{ href: "/events/camps", label: "Browse all camps" }}
        />

        <SectionIntro>
          <Link
            href={`/events/camps/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-border bg-paper shadow-sm no-underline hover:no-underline lg:grid-cols-2"
          >
            <div className="relative min-h-[280px] overflow-hidden lg:min-h-[360px]">
              <Image
                src={featured.imageSrc}
                alt={featured.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img-zoom object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">
                Latest camp
              </p>
              <h3 className="text-h2 mt-3 font-semibold text-ink transition-colors group-hover:text-brand">
                {featured.title}
              </h3>
              <p className="mt-3 text-sm text-ink-subtle">
                {featured.location.district}, {featured.location.state}
              </p>
              <p className="mt-5 text-[0.975rem] leading-relaxed text-ink-muted">
                {featured.caption}
              </p>
              <span className="link-arrow mt-8">Read full report</span>
            </div>
          </Link>
        </SectionIntro>

        {mosaic.length > 1 ? (
          <div className="mt-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h3 className="text-h3 font-semibold">More recent camps</h3>
              <TextLink href="/events/camps">Full archive</TextLink>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mosaic.slice(1).map((camp) => (
                <li key={camp.slug}>
                  <CampCard camp={toListItem(camp)} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
