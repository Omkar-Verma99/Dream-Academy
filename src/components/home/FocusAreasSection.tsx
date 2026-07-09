import Link from "next/link";
import {
  Activity,
  Award,
  BookOpen,
  Microscope,
  Stethoscope,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader, SectionIntro } from "@/components/ui/SectionHeader";
import type { FocusArea } from "@/types/content";

interface FocusAreasSectionProps {
  focusAreas: FocusArea[];
}

const accents: {
  soft: string;
  text: string;
  ring: string;
  icon: LucideIcon;
}[] = [
  {
    soft: "bg-brand-soft",
    text: "text-brand",
    ring: "group-hover:border-brand/40",
    icon: Activity,
  },
  {
    soft: "bg-crimson-soft",
    text: "text-crimson",
    ring: "group-hover:border-crimson/40",
    icon: Stethoscope,
  },
  {
    soft: "bg-orange-soft",
    text: "text-orange",
    ring: "group-hover:border-orange/40",
    icon: Microscope,
  },
  {
    soft: "bg-green-soft",
    text: "text-green",
    ring: "group-hover:border-green/40",
    icon: BookOpen,
  },
  {
    soft: "bg-purple-soft",
    text: "text-purple",
    ring: "group-hover:border-purple/40",
    icon: UsersRound,
  },
  {
    soft: "bg-teal-soft",
    text: "text-teal",
    ring: "group-hover:border-teal/40",
    icon: Award,
  },
];

export function FocusAreasSection({ focusAreas }: FocusAreasSectionProps) {
  return (
    <Section tone="paper" aria-labelledby="focus-areas-heading">
      <Container>
        <SectionHeader
          eyebrow="What we do"
          title="Six ways we serve"
          description="Care, research, education, and outreach — colourful, practical, and local."
          action={{ href: "/what-we-do", label: "All programmes" }}
        />

        <SectionIntro>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area, index) => {
              const accent = accents[index % accents.length];
              const Icon = accent.icon;
              return (
                <li key={area.slug}>
                  <Link
                    href={`/what-we-do#${area.slug}`}
                    className={`group hover-lift flex h-full flex-col rounded-3xl border border-border bg-paper p-7 no-underline shadow-sm hover:no-underline ${accent.ring}`}
                  >
                    <span
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${accent.soft} ${accent.text}`}
                      aria-hidden="true"
                    >
                      <Icon className="h-7 w-7 stroke-[2.25]" />
                    </span>
                    <h3 className="text-h4 mt-5 text-ink transition-colors group-hover:text-brand">
                      {area.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      {area.shortDescription}
                    </p>
                    <span className="link-arrow mt-5 text-sm">{area.ctaLabel}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </SectionIntro>
      </Container>
    </Section>
  );
}
