import {
  Building2,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { aboutParagraphs, founderMotto } from "@/data/fallback";

const valueCards: {
  title: string;
  body: string;
  icon: LucideIcon;
  soft: string;
  tone: string;
}[] = [
  {
    title: "Community first",
    body: "Screening camps and counselling where families actually live.",
    icon: HeartPulse,
    soft: "bg-brand-soft",
    tone: "text-brand",
  },
  {
    title: "Evidence led",
    body: "Research and education that improve day-to-day care.",
    icon: Stethoscope,
    soft: "bg-crimson-soft",
    tone: "text-crimson",
  },
  {
    title: "Transparent trust",
    body: "Registered charity with 12A & 80G compliance.",
    icon: ShieldCheck,
    soft: "bg-green-soft",
    tone: "text-green",
  },
  {
    title: "Clinic + field",
    body: "Chandra Diabetes Clinic driving continuous patient care.",
    icon: Building2,
    soft: "bg-orange-soft",
    tone: "text-orange",
  },
];

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative border-y border-border bg-surface section-pad"
    >
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-eyebrow">Who we are</p>
            <h2 id="about-heading" className="text-h2 mt-5 font-semibold">
              {founderMotto}
            </h2>
            <div className="mt-8 space-y-5">
              {aboutParagraphs.slice(0, 2).map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[1.0625rem] leading-relaxed text-ink-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-9">
              <Button href="/about" variant="secondary">
                Our story
              </Button>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {valueCards.map((card) => {
              const Icon = card.icon;
              return (
                <li
                  key={card.title}
                  className="hover-lift rounded-3xl border border-border bg-paper p-6 shadow-sm"
                >
                  <span
                    className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${card.soft} ${card.tone}`}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5 stroke-[2.25]" />
                  </span>
                  <h3 className="font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {card.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
