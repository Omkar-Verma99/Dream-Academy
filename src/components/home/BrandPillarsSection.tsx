import Link from "next/link";
import {
  FlaskConical,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { brandPillars, brandTaglineParts } from "@/data/brand";

const pillarIcons: Record<(typeof brandPillars)[number]["key"], LucideIcon> = {
  research: FlaskConical,
  education: GraduationCap,
  innovation: Lightbulb,
  community: Users,
  compassion: HeartHandshake,
  collaboration: Handshake,
};

export function BrandPillarsSection() {
  return (
    <section
      aria-labelledby="pillars-heading"
      className="section-pad relative overflow-hidden border-y border-border-strong bg-surface-sunk"
    >
      <div
        className="section-bg-blur absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "url(/images/camps/sushant-golf/02.jpeg)" }}
        aria-hidden="true"
      />
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-paper/90 p-8 text-center shadow-sm backdrop-blur-sm sm:p-10">
          <p className="text-eyebrow mx-auto justify-center">Our pillars</p>
          <h2 id="pillars-heading" className="text-h2 mt-5 font-bold">
            Six values. One mission.
          </h2>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-bold uppercase tracking-wide">
            {brandTaglineParts.map((part, index) => (
              <span key={part.text} className="inline-flex items-center gap-3">
                {index > 0 ? (
                  <span className="text-border-strong" aria-hidden="true">
                    |
                  </span>
                ) : null}
                <span className={part.tone}>{part.text}</span>
              </span>
            ))}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
          {brandPillars.map((pillar) => {
            const Icon = pillarIcons[pillar.key];
            return (
              <li key={pillar.key} className="h-full">
                <Link
                  href={pillar.href}
                  className="group flex h-full flex-col items-center rounded-3xl border-2 border-transparent bg-paper p-5 text-center shadow-md no-underline transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:no-underline sm:p-6"
                >
                  <span className={`pillar-orb ${pillar.orb}`} aria-hidden="true">
                    <Icon className="h-7 w-7 stroke-[2.25]" />
                  </span>
                  <h3 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-ink">
                    {pillar.label}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-muted">
                    {pillar.motto}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
