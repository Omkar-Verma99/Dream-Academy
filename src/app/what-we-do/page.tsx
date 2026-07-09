import {
  Activity,
  Award,
  BookOpen,
  Check,
  Microscope,
  Stethoscope,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { fallbackFocusAreas } from "@/data/fallback";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "What We Do",
  description:
    "Programmes in diabetes care, obesity & metabolic medicine, research, education, community health, and scholarships.",
  path: "/what-we-do",
});

const accents: {
  soft: string;
  text: string;
  ring: string;
  check: string;
  icon: LucideIcon;
}[] = [
  {
    soft: "bg-brand-soft",
    text: "text-brand",
    ring: "border-brand/15",
    check: "bg-brand text-white",
    icon: Activity,
  },
  {
    soft: "bg-crimson-soft",
    text: "text-crimson",
    ring: "border-crimson/15",
    check: "bg-crimson text-white",
    icon: Stethoscope,
  },
  {
    soft: "bg-orange-soft",
    text: "text-orange",
    ring: "border-orange/15",
    check: "bg-orange text-white",
    icon: Microscope,
  },
  {
    soft: "bg-green-soft",
    text: "text-green",
    ring: "border-green/15",
    check: "bg-green text-white",
    icon: BookOpen,
  },
  {
    soft: "bg-purple-soft",
    text: "text-purple",
    ring: "border-purple/15",
    check: "bg-purple text-white",
    icon: UsersRound,
  },
  {
    soft: "bg-teal-soft",
    text: "text-teal",
    ring: "border-teal/15",
    check: "bg-teal text-white",
    icon: Award,
  },
];

export default function WhatWeDoPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Programmes"
        title="What we do"
        lead="Six integrated programmes that connect clinic, classroom, and community — so evidence-based metabolic care reaches both cities and underserved districts."
      />

      <Section pad="sm" aria-labelledby="programme-nav-heading">
        <Container>
          <h2 id="programme-nav-heading" className="sr-only">
            Jump to a programme
          </h2>
          <nav
            aria-label="Programme areas"
            className="flex flex-wrap justify-center gap-2"
          >
            {fallbackFocusAreas.map((area, index) => {
              const accent = accents[index % accents.length];
              return (
                <a
                  key={area.slug}
                  href={`#${area.slug}`}
                  className={`rounded-full border bg-paper px-3.5 py-2 text-xs font-bold no-underline transition hover:no-underline sm:text-sm ${accent.ring} ${accent.text} hover:bg-surface-sunk`}
                >
                  {area.title}
                </a>
              );
            })}
          </nav>

          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {fallbackFocusAreas.map((area, index) => {
              const accent = accents[index % accents.length];
              const Icon = accent.icon;
              return (
                <li key={area.slug} className="h-full">
                  <section
                    id={area.slug}
                    className={`flex h-full flex-col rounded-3xl border bg-paper p-7 shadow-sm sm:p-8 ${accent.ring}`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${accent.soft} ${accent.text}`}
                        aria-hidden="true"
                      >
                        <Icon className="h-7 w-7 stroke-[2.25]" />
                      </span>
                      <h2 className="text-h3 min-w-0 pt-2.5 font-bold text-ink">
                        {area.title}
                      </h2>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-ink-muted sm:text-base">
                      {area.shortDescription}
                    </p>

                    <ul className="mt-6 grid flex-1 gap-2.5 sm:grid-cols-2">
                      {(area.points ?? []).map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 rounded-2xl border border-border/80 bg-surface/60 px-3.5 py-3"
                        >
                          <span
                            className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent.check}`}
                            aria-hidden="true"
                          >
                            <Check className="h-3 w-3 stroke-[3]" />
                          </span>
                          <span className="text-sm font-semibold leading-snug text-ink">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button href="/events#diabetes-camps">See community camps</Button>
            <Button href="/get-involved" variant="secondary">
              Support a programme
            </Button>
            <Button href="/contact" variant="ghost">
              Partner with us
            </Button>
          </div>
        </Container>
      </Section>
    </article>
  );
}
