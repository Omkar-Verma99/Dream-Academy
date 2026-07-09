import { Container } from "@/components/layout/Container";
import { Section } from "@/components/ui/Section";
import type { ImpactStat } from "@/types/content";

interface ImpactNumbersSectionProps {
  stats: ImpactStat[];
}

const tones = [
  "from-brand to-brand-deep",
  "from-crimson to-magenta",
  "from-orange to-[#ea580c]",
  "from-green to-teal",
];

export function ImpactNumbersSection({ stats }: ImpactNumbersSectionProps) {
  return (
    <Section aria-label="Impact statistics" tone="surface">
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="text-eyebrow">Our impact</p>
          <h2 className="text-h2 mt-4 font-bold">
            Real numbers. Real communities.
          </h2>
        </div>
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`hover-lift rounded-3xl bg-gradient-to-br p-6 text-white shadow-md sm:p-8 ${tones[index % tones.length]}`}
            >
              <dd className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-3 text-xs font-bold uppercase tracking-wider text-white/85">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
