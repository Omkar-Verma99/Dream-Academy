import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader, SectionIntro } from "@/components/ui/SectionHeader";
import type {
  PublicationSummary,
  ResearchHighlight,
} from "@/types/content";

interface ResearchHighlightsSectionProps {
  featuredResearch: ResearchHighlight[];
  recentPublications: PublicationSummary[];
}

function formatResearchDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function ResearchHighlightsSection({
  featuredResearch,
  recentPublications,
}: ResearchHighlightsSectionProps) {
  return (
    <Section tone="paper" aria-labelledby="research-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Research"
              title="What we are studying"
              align="left"
              action={{ href: "/research", label: "All research" }}
            />
            <SectionIntro className="mt-8 space-y-4 lg:mt-10">
              {featuredResearch.map((item) => (
                <article
                  key={item.slug}
                  className="hover-lift rounded-3xl border border-border bg-surface p-6 sm:p-7"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                    {formatResearchDate(item.date)}
                  </p>
                  <h3 className="text-h4 mt-2">
                    <Link
                      href="/research#ongoing-projects"
                      className="text-ink no-underline hover:text-brand"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </article>
              ))}
            </SectionIntro>
          </div>

          <aside className="rounded-3xl bg-brand-deep p-8 text-white lg:col-span-5 lg:p-10">
            <p className="text-eyebrow text-eyebrow--on-dark">Publications</p>
            <h3 className="text-h3 mt-4 font-semibold text-white">
              Recent papers
            </h3>
            <ol className="mt-8 space-y-6">
              {recentPublications.slice(0, 4).map((pub) => (
                <li key={pub.slug} className="border-t border-white/15 pt-5 first:border-0 first:pt-0">
                  <Link
                    href="/research#publications"
                    className="font-medium leading-snug text-white no-underline hover:underline"
                  >
                    {pub.title}
                  </Link>
                  <p className="mt-2 text-xs text-white/75">
                    {pub.authors.join(", ")} · <em>{pub.journal}</em> · {pub.year}
                  </p>
                </li>
              ))}
            </ol>
            <Link
              href="/research#publications"
              className="mt-8 inline-flex text-sm font-semibold text-white no-underline hover:underline"
            >
              Browse publications →
            </Link>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
