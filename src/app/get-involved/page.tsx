import {
  Briefcase,
  FlaskConical,
  HandHeart,
  Heart,
  Users,
  type LucideIcon,
} from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { DonationForm } from "@/components/forms/DonationForm";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Get Involved",
  description:
    "Donate, volunteer, partner through CSR, collaborate on research, or apply for internships at DREAM Academy.",
  path: "/get-involved",
});

const pageNav = [
  { href: "#donate", label: "Donate" },
  { href: "#volunteer", label: "Volunteer" },
  { href: "#csr", label: "CSR partnerships" },
  { href: "#research-collaboration", label: "Research" },
  { href: "#internships", label: "Internships" },
] as const;

const accents = {
  brand: { soft: "bg-brand-soft", text: "text-brand", ring: "border-brand/15" },
  crimson: { soft: "bg-crimson-soft", text: "text-crimson", ring: "border-crimson/15" },
  green: { soft: "bg-green-soft", text: "text-green", ring: "border-green/15" },
  orange: { soft: "bg-orange-soft", text: "text-orange", ring: "border-orange/15" },
  teal: { soft: "bg-teal-soft", text: "text-teal", ring: "border-teal/15" },
} as const;

type AccentKey = keyof typeof accents;

function SectionIntro({
  eyebrow,
  title,
  description,
  icon: Icon,
  accent,
  id,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: AccentKey;
  id: string;
}) {
  const a = accents[accent];
  return (
    <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
        <span
          className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${a.soft} ${a.text}`}
          aria-hidden="true"
        >
          <Icon className="h-7 w-7 stroke-[2.25]" />
        </span>
        <div>
          <p className={`text-eyebrow ${a.text} lg:justify-start`}>{eyebrow}</p>
          <h2 id={id} className="text-h2 mt-2 font-bold text-ink">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

const impactLadder = [
  { amount: "₹1,000", impact: "helps screen several patients at a community camp" },
  { amount: "₹5,000", impact: "supports a rural screening day with counselling" },
  { amount: "₹25,000", impact: "can sponsor training or fellowship support" },
] as const;

const csrPillars = [
  {
    title: "Camp sponsorship",
    text: "Fund glucose screening, counselling, and referral support in underserved blocks.",
  },
  {
    title: "Education grants",
    text: "Support CME, workshops, and scholarships for clinicians serving rural populations.",
  },
  {
    title: "Employee volunteering",
    text: "Engage your team in awareness drives and supervised field programmes.",
  },
  {
    title: "Reporting & compliance",
    text: "Structured utilisation updates suitable for CSR audit and board reporting.",
  },
] as const;

export default function GetInvolvedPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Get Involved"
        title="Support our mission"
        lead="Donate, volunteer, partner through CSR, collaborate on research, or join as an intern — your support extends evidence-based metabolic care across India."
      />

      <Section pad="sm">
        <Container>
          <nav
            aria-label="Get involved sections"
            className="flex flex-wrap justify-center gap-2"
          >
            {pageNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-border bg-paper px-3.5 py-2 text-xs font-semibold text-brand no-underline transition hover:border-brand/30 hover:bg-brand-soft hover:no-underline sm:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      <Section
        id="donate"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="donate-heading"
      >
        <Container>
          <SectionIntro
            id="donate-heading"
            eyebrow="Give"
            title="Donate"
            description="Fund screening programmes, rural camps, and medical education. Eligible gifts may qualify for 80G tax benefits when registration details are active."
            icon={Heart}
            accent="brand"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ul className="space-y-4">
                {impactLadder.map((item) => (
                  <li
                    key={item.amount}
                    className="rounded-2xl border border-border bg-paper px-5 py-4 text-sm"
                  >
                    <strong className="text-ink">{item.amount}</strong>{" "}
                    <span className="text-ink-muted">{item.impact}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                80G receipt reference:{" "}
                <strong className="text-ink">
                  {siteConfig.registration.section80G}
                </strong>
                . For bank transfer or cheque donations, email{" "}
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-[28px] border border-brand/15 bg-paper p-6 shadow-sm sm:p-7">
                <h3 className="text-h4 text-ink">Make a donation</h3>
                <DonationForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="volunteer"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="volunteer-heading"
      >
        <Container>
          <SectionIntro
            id="volunteer-heading"
            eyebrow="Serve"
            title="Volunteer"
            description="Join community health camps, awareness drives, and programme support across Uttar Pradesh. Orientation covers protocols and patient confidentiality."
            icon={HandHeart}
            accent="green"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ul className="space-y-3 text-sm leading-relaxed text-ink-muted">
                <li className="rounded-2xl border border-green/15 bg-paper px-4 py-3">
                  Camp registration, screening stations, and crowd flow
                </li>
                <li className="rounded-2xl border border-green/15 bg-paper px-4 py-3">
                  Patient counselling support under clinician oversight
                </li>
                <li className="rounded-2xl border border-green/15 bg-paper px-4 py-3">
                  Awareness materials and school / community sessions
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <div className="rounded-[28px] border border-green/15 bg-paper p-6 shadow-sm sm:p-7">
                <h3 className="text-h4 text-ink">Volunteer application</h3>
                <VolunteerForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="csr"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="csr-heading"
      >
        <Container>
          <SectionIntro
            id="csr-heading"
            eyebrow="Corporate"
            title="CSR partnerships"
            description="Partner with DREAM Academy through corporate social responsibility programmes that fund camps, clinician training, and community screening circuits."
            icon={Users}
            accent="orange"
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {csrPillars.map((item) => (
              <li
                key={item.title}
                className="rounded-[24px] border border-orange/15 bg-paper p-6 shadow-sm"
              >
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/contact" size="sm">
              Discuss CSR partnership
            </Button>
          </div>
        </Container>
      </Section>

      <Section
        id="research-collaboration"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="research-collaboration-heading"
      >
        <Container>
          <SectionIntro
            id="research-collaboration-heading"
            eyebrow="Science"
            title="Research collaboration"
            description="Work with our clinical and field teams on ethical, community-centred metabolic health studies — from camp epidemiology to education pilots."
            icon={FlaskConical}
            accent="crimson"
          />

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-muted">
            Share a concept note with objectives, population, ethics pathway, and
            expected community benefit. See also our{" "}
            <a href="/research#collaborations" className="font-semibold text-brand">
              research collaborations
            </a>{" "}
            section for partnership models.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact" size="sm">
              Propose a study
            </Button>
            <Button href="/research#ethics-policy" variant="secondary" size="sm">
              Ethics policy
            </Button>
          </div>
        </Container>
      </Section>

      <Section
        id="internships"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="internships-heading"
      >
        <Container>
          <SectionIntro
            id="internships-heading"
            eyebrow="Early career"
            title="Internships"
            description="Short placements for students and early-career professionals in public health, diabetes education, communications, and nonprofit operations."
            icon={Briefcase}
            accent="teal"
          />

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-muted">
            Interns may support camp documentation, patient education content,
            research administration, or outreach coordination — with mentorship
            from faculty and programme leads.
          </p>
          <div className="mt-6">
            <Button href="/contact" size="sm">
              Enquire about internships
            </Button>
          </div>
        </Container>
      </Section>
    </article>
  );
}
