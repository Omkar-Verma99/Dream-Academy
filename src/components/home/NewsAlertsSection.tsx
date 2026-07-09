import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SectionHeader, SectionIntro } from "@/components/ui/SectionHeader";
import type { NewsAlert } from "@/data/news";

interface NewsAlertsSectionProps {
  alerts: NewsAlert[];
}

function formatNewsDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function NewsAlertsSection({ alerts }: NewsAlertsSectionProps) {
  const items = alerts.slice(0, 3);

  return (
    <section
      aria-labelledby="news-heading"
      className="section-pad relative overflow-hidden border-t border-border-strong bg-paper"
    >
      <div
        className="section-bg-blur absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "url(/images/camps/mahamana/02.jpeg)" }}
        aria-hidden="true"
      />
      <div
        className="absolute left-0 top-0 h-full w-1.5 bg-brand-gradient sm:w-2"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeader
          eyebrow="Updates"
          title="Stories from our work"
          description="Camp reports, outreach moments, and clinic news — tap any story for photos and the full report."
          action={{ href: "/events/camps", label: "See all camps" }}
        />

        <SectionIntro>
          <div className="grid gap-6 lg:grid-cols-3">
            {items.map((item, index) => (
              <article
                key={item.id}
                className={`group overflow-hidden rounded-3xl border border-border bg-paper shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  index === 0 ? "lg:row-span-1" : ""
                }`}
              >
                <Link
                  href={item.href}
                  className="block no-underline hover:no-underline"
                >
                  <div
                    className={`relative overflow-hidden ${
                      index === 0 ? "aspect-[16/11]" : "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="img-zoom object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand shadow">
                      {formatNewsDate(item.date)}
                    </span>
                  </div>
                  <div className="border-t border-border p-6">
                    <h3 className="text-h4 text-ink transition-colors group-hover:text-brand">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                      {item.excerpt}
                    </p>
                    {item.location ? (
                      <p className="mt-3 text-xs font-semibold text-ink-subtle">
                        {item.location}
                      </p>
                    ) : null}
                    <span className="link-arrow mt-4 text-sm">Read camp report</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </SectionIntro>
      </Container>
    </section>
  );
}
