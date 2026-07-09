import Image from "next/image";
import {
  BookOpen,
  FlaskConical,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  aboutParagraphs,
  fallbackTrustees,
  founderMessage,
  founderMotto,
  founderQuote,
} from "@/data/fallback";
import { getTransparencyDocuments } from "@/data/transparency-documents";
import { TransparencyDocumentGrid } from "@/components/transparency/TransparencyDocumentGrid";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "About DREAM Academy",
  description:
    "Learn about DREAM Academy — a registered charitable trust advancing diabetes research, metabolic medicine, and community health across India.",
  path: "/about",
});

const pageNav = [
  { href: "#motto", label: "Motto" },
  { href: "#vision-mission", label: "Vision & mission" },
  { href: "#founder", label: "Founder" },
  { href: "#trustees", label: "Trustees" },
  { href: "#registrations", label: "Registrations" },
] as const;

const values: {
  title: string;
  text: string;
  icon: LucideIcon;
  soft: string;
  tone: string;
}[] = [
  {
    title: "Scientific integrity",
    text: "Evidence guides every clinical and research decision.",
    icon: FlaskConical,
    soft: "bg-brand-soft",
    tone: "text-brand",
  },
  {
    title: "Compassionate service",
    text: "Patients and communities are at the centre of our work.",
    icon: HeartHandshake,
    soft: "bg-crimson-soft",
    tone: "text-crimson",
  },
  {
    title: "Educational excellence",
    text: "We invest in training the next generation of healthcare professionals.",
    icon: BookOpen,
    soft: "bg-orange-soft",
    tone: "text-orange",
  },
  {
    title: "Transparency",
    text: "We operate with accountability to donors, partners, and the public.",
    icon: ShieldCheck,
    soft: "bg-green-soft",
    tone: "text-green",
  },
  {
    title: "Equity",
    text: "We prioritise underserved and rural populations in programme design.",
    icon: Users,
    soft: "bg-purple-soft",
    tone: "text-purple",
  },
];

const mottoParts = [
  { label: "Research with purpose", tone: "text-brand", soft: "bg-brand-soft" },
  {
    label: "Educate with passion",
    tone: "text-crimson",
    soft: "bg-crimson-soft",
  },
  {
    label: "Serve with compassion",
    tone: "text-green",
    soft: "bg-green-soft",
  },
  {
    label: "Transform lives",
    tone: "text-orange",
    soft: "bg-orange-soft",
  },
] as const;

export default function AboutPage() {
  const founder = fallbackTrustees.find((t) => t.category === "founder");

  return (
    <article>
      <PageHeader
        eyebrow="About"
        title="About DREAM Academy"
        lead={`${siteConfig.fullName} — a registered charitable trust advancing diabetes research, metabolic medicine, education, and community health.`}
      />

      <Section pad="sm">
        <Container>
          <nav
            aria-label="On this page"
            className="flex flex-wrap justify-center gap-2"
          >
            {pageNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-border bg-paper px-4 py-2 text-sm font-semibold text-brand no-underline transition hover:border-brand/30 hover:bg-brand-soft hover:no-underline"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center text-base leading-relaxed text-ink-muted">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        id="motto"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="motto-heading"
      >
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-eyebrow mx-auto justify-center">
              Founder&apos;s motto
            </p>
            <h2 id="motto-heading" className="sr-only">
              Founder&apos;s motto
            </h2>
            <blockquote className="mt-5">
              <p className="font-display text-2xl font-medium leading-snug text-ink sm:text-3xl lg:text-4xl">
                “{founderMotto}”
              </p>
            </blockquote>
          </div>

          <ul className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mottoParts.map((part) => (
              <li
                key={part.label}
                className={`rounded-2xl border border-border/70 px-4 py-4 text-center ${part.soft}`}
              >
                <p className={`text-sm font-bold leading-snug ${part.tone}`}>
                  {part.label}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section
        id="vision-mission"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="vision-heading"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-eyebrow mx-auto justify-center">Purpose</p>
            <h2 id="vision-heading" className="text-h2 mt-4 font-bold text-ink">
              Vision, mission & values
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-brand/15 bg-brand-soft/40 p-7 sm:p-8">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white"
                aria-hidden="true"
              >
                <Users className="h-6 w-6 stroke-[2.25]" />
              </span>
              <h3 className="text-h4 mt-5 text-ink">Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                A healthier India where every community has access to
                evidence-based diabetes and metabolic care — regardless of
                geography, income, or background.
              </p>
            </div>
            <div className="rounded-[28px] border border-crimson/15 bg-crimson-soft/50 p-7 sm:p-8">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-crimson text-white"
                aria-hidden="true"
              >
                <HeartHandshake className="h-6 w-6 stroke-[2.25]" />
              </span>
              <h3 className="text-h4 mt-5 text-ink">Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                To advance diabetes research, metabolic medicine, medical
                education, and community health through rigorous science,
                compassionate outreach, and institutional collaboration.
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <li
                  key={value.title}
                  className="rounded-[24px] border border-border bg-paper p-6 shadow-sm"
                >
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${value.soft} ${value.tone}`}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5 stroke-[2.25]" />
                  </span>
                  <p className="mt-4 font-semibold text-ink">{value.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {value.text}
                  </p>
                </li>
              );
            })}
            <li className="flex flex-col justify-center rounded-[24px] border border-dashed border-border bg-surface/70 p-6 sm:col-span-2 lg:col-span-1">
              <p className="text-sm font-semibold text-ink">Guided by one belief</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                “{founderQuote}”
              </p>
            </li>
          </ul>
        </Container>
      </Section>

      {founder ? (
        <Section
          id="founder"
          tone="surface"
          pad="sm"
          className="scroll-mt-28"
          aria-labelledby="founder-heading"
        >
          <Container>
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
              <p className="text-eyebrow lg:justify-start">Founder</p>
              <h2
                id="founder-heading"
                className="text-h2 mt-4 font-bold text-ink"
              >
                Founder&apos;s message
              </h2>
              <p className="mt-3 text-sm text-ink-muted sm:text-base">
                {founderMessage.welcomeTitle}
              </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-[28px] border border-border bg-paper shadow-sm">
              <div className="grid lg:grid-cols-12">
                <aside className="border-b border-border bg-surface-sunk/60 p-7 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
                  <figure className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[22px] bg-[#dfe6f2] lg:max-w-none">
                    {founder.imageSrc ? (
                      <Image
                        src={founder.imageSrc}
                        alt={founder.imageAlt ?? founder.name}
                        fill
                        sizes="(max-width: 1024px) 90vw, 30vw"
                        className="object-cover object-top"
                        style={
                          founder.imagePosition
                            ? { objectPosition: founder.imagePosition }
                            : undefined
                        }
                        priority
                      />
                    ) : null}
                  </figure>
                  <div className="mt-6 text-center lg:text-left">
                    <p className="font-semibold text-ink">
                      {founderMessage.signatoryName}
                    </p>
                    <p className="mt-1 text-sm font-medium text-brand">
                      {founderMessage.signatoryRole}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">
                      {founderMessage.signatoryOrg}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
                      {founderMessage.signatoryFullName}
                    </p>
                  </div>
                </aside>

                <div className="p-7 sm:p-8 lg:col-span-8 lg:p-10 xl:p-12">
                  <p className="text-sm font-semibold text-ink">
                    {founderMessage.greeting}
                  </p>

                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                    {founderMessage.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-border pt-6">
                    <p className="text-sm text-ink-muted">
                      {founderMessage.closing}
                    </p>
                    <p className="mt-3 font-semibold text-ink">
                      {founderMessage.signatoryName}
                    </p>
                    <p className="text-sm text-brand">
                      {founderMessage.signatoryRole}
                    </p>
                    <p className="text-sm text-ink-muted">
                      {founderMessage.signatoryOrg}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section
        id="trustees"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="trustees-heading"
      >
        <Container>
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <p className="text-eyebrow lg:justify-start">Governance</p>
            <h2
              id="trustees-heading"
              className="text-h2 mt-4 font-bold text-ink"
            >
              Board of trustees
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
              DREAM Academy is governed by a board of trustees committed to
              transparent, accountable charitable work.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {fallbackTrustees.map((member) => (
              <li
                key={member.name}
                className="flex h-full flex-col overflow-hidden rounded-[24px] border border-border bg-paper shadow-sm"
              >
                {member.imageSrc ? (
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-surface-sunk">
                    <Image
                      src={member.imageSrc}
                      alt={member.imageAlt ?? member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top"
                      style={
                        member.imagePosition
                          ? { objectPosition: member.imagePosition }
                          : undefined
                      }
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-base font-semibold leading-snug text-ink sm:text-lg">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-brand">
                    {member.role}
                  </p>
                  {member.credentials ? (
                    <p className="mt-1 text-xs leading-snug text-ink-subtle">
                      {member.credentials}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {member.summary}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section
        id="registrations"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="registrations-heading"
      >
        <Container>
          <div className="rounded-[28px] border border-border bg-paper p-8 shadow-sm sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-start gap-4">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand"
                aria-hidden="true"
              >
                <Scale className="h-6 w-6 stroke-[2.25]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-eyebrow">Compliance</p>
                <h2
                  id="registrations-heading"
                  className="text-h2 mt-3 font-bold text-ink"
                >
                  Registrations & certifications
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  DREAM Academy is registered as a charitable trust under the
                  Indian Trusts Act, 1882. These details are maintained for
                  public reference.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <TransparencyDocumentGrid
                documents={getTransparencyDocuments("registration")}
                compact
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/transparency/certificates" size="sm">
                All certificates
              </Button>
              <Button href="/transparency" variant="secondary" size="sm">
                Transparency hub
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
