import {
  BookOpen,
  ClipboardList,
  FileText,
  FlaskConical,
  Handshake,
  Microscope,
  Scale,
  type LucideIcon,
} from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getPublicationDetails, getResearchProjects } from "@/lib/content/research";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Research",
  description:
    "Ongoing projects, completed studies, publications, abstracts, clinical trials, collaborations, and ethics policy at DREAM Academy.",
  path: "/research",
});

const pageNav = [
  { href: "#ongoing-projects", label: "Ongoing projects" },
  { href: "#completed-studies", label: "Completed studies" },
  { href: "#publications", label: "Publications" },
  { href: "#abstracts", label: "Abstracts" },
  { href: "#clinical-trials", label: "Clinical trials" },
  { href: "#collaborations", label: "Collaborations" },
  { href: "#ethics-policy", label: "Ethics & policy" },
] as const;

const accents = {
  brand: {
    soft: "bg-brand-soft",
    text: "text-brand",
    ring: "border-brand/15",
    solid: "bg-brand",
  },
  crimson: {
    soft: "bg-crimson-soft",
    text: "text-crimson",
    ring: "border-crimson/15",
    solid: "bg-crimson",
  },
  orange: {
    soft: "bg-orange-soft",
    text: "text-orange",
    ring: "border-orange/15",
    solid: "bg-orange",
  },
  green: {
    soft: "bg-green-soft",
    text: "text-green",
    ring: "border-green/15",
    solid: "bg-green",
  },
  purple: {
    soft: "bg-purple-soft",
    text: "text-purple",
    ring: "border-purple/15",
    solid: "bg-purple",
  },
  teal: {
    soft: "bg-teal-soft",
    text: "text-teal",
    ring: "border-teal/15",
    solid: "bg-teal",
  },
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

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

const ongoingProjects = (projects: Awaited<ReturnType<typeof getResearchProjects>>) =>
  projects.filter((p) => p.status === "ongoing");
const completedStudies = (projects: Awaited<ReturnType<typeof getResearchProjects>>) =>
  projects.filter((p) => p.status === "completed");

const abstracts = [
  {
    title:
      "Undiagnosed diabetes burden in rural screening camps: interim findings from Barabanki",
    venue: "National Metabolic Health Symposium · Abstract",
    year: 2024,
    summary:
      "Interim analysis of structured community screening suggesting a substantial undiagnosed diabetes load among adults aged 30+, with counselling improving early referral uptake.",
  },
  {
    title:
      "Training community health workers for capillary glucose screening in field settings",
    venue: "UP Public Health Conclave · Poster abstract",
    year: 2024,
    summary:
      "Describes a practical curriculum covering standardised testing, risk communication, documentation, and warm referral pathways from camp to clinic.",
  },
  {
    title:
      "Lifestyle counselling outcomes after peri-urban metabolic risk identification",
    venue: "Diabetes Care Education Meet · Oral abstract",
    year: 2023,
    summary:
      "Reports short-term behavioural and follow-up indicators after nutrition and activity counselling offered during residential community camps in Lucknow.",
  },
] as const;

const clinicalTrialPoints = [
  "Prospective observational cohorts nested within screening camps",
  "Pragmatic lifestyle and education intervention pilots",
  "Quality-improvement audits of referral and follow-up pathways",
  "Secondary analysis of de-identified camp datasets for service planning",
] as const;

const collaborationPillars = [
  {
    title: "Clinical partners",
    text: "Physicians and clinics help design protocols that fit real outpatient workflows and rural referral realities.",
  },
  {
    title: "Academic centres",
    text: "Faculty collaborations support methodology, biostatistics, manuscript development, and trainee mentoring.",
  },
  {
    title: "Community organisations",
    text: "Local civic groups and village leadership enable culturally appropriate recruitment and sustained follow-up.",
  },
  {
    title: "Training networks",
    text: "CME and fellowship pathways connect research findings back into everyday metabolic care teaching.",
  },
] as const;

const ethicsPrinciples = [
  {
    title: "Informed consent",
    text: "Participants receive clear information in accessible language on purpose, procedures, risks, benefits, and the right to withdraw.",
  },
  {
    title: "Ethics review",
    text: "Protocols involving human participants proceed only after appropriate institutional ethics review and risk assessment.",
  },
  {
    title: "Privacy & data protection",
    text: "Identifiable health information is minimised, secured, and used only for stated research or care-improvement purposes.",
  },
  {
    title: "Transparent reporting",
    text: "Methods, limitations, and outcomes are reported honestly — including negative or inconclusive findings.",
  },
  {
    title: "Equity of benefit",
    text: "Studies prioritise questions that can improve care for underserved communities, not only academic metrics.",
  },
  {
    title: "Conflict disclosure",
    text: "Funding sources, partnerships, and potential conflicts of interest are disclosed in proposals and publications.",
  },
] as const;

export default async function ResearchPage() {
  const [researchProjects, publicationDetails] = await Promise.all([
    getResearchProjects(),
    getPublicationDetails(),
  ]);
  const ongoing = ongoingProjects(researchProjects);
  const completed = completedStudies(researchProjects);

  return (
    <article>
      <PageHeader
        eyebrow="Research"
        title="Evidence that reaches the field"
        lead="DREAM Academy advances diabetes and metabolic medicine through ethically conducted projects, publications, collaborations, and community-centred enquiry — so science informs care where it is needed most."
      />

      <Section pad="sm">
        <Container>
          <nav
            aria-label="Research sections"
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

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ink-muted sm:text-base">
            Our research portfolio spans epidemiology, lifestyle intervention,
            health-worker training, and service delivery. Work begins in camps
            and clinics across Uttar Pradesh and is designed to generate
            practical insights for clinicians, educators, and community partners.
          </p>
        </Container>
      </Section>

      <Section
        id="ongoing-projects"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="ongoing-projects-heading"
      >
        <Container>
          <SectionIntro
            id="ongoing-projects-heading"
            eyebrow="Active programmes"
            title="Ongoing projects"
            description="Live studies that combine field screening, clinician oversight, and structured follow-up — building evidence while delivering counselling and referral support."
            icon={FlaskConical}
            accent="brand"
          />

          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {ongoing.map((project) => (
              <li
                key={project.slug}
                className="flex h-full flex-col rounded-[28px] border border-brand/15 bg-paper p-7 shadow-sm sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand">
                    Ongoing
                  </span>
                  <span className="text-xs font-medium text-ink-subtle">
                    Started {formatDate(project.date)}
                  </span>
                </div>
                <h3 className="text-h4 mt-4 text-ink">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {project.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {project.body.map((paragraph) => (
                    <li
                      key={paragraph.slice(0, 40)}
                      className="rounded-2xl border border-border/80 bg-surface/50 px-4 py-3 text-sm leading-relaxed text-ink-muted"
                    >
                      {paragraph}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm font-semibold text-ink">
                  PI · {project.principalInvestigator}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section
        id="completed-studies"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="completed-studies-heading"
      >
        <Container>
          <SectionIntro
            id="completed-studies-heading"
            eyebrow="Finished work"
            title="Completed studies"
            description="Completed programmes whose findings already inform awareness materials, physician teaching, and the design of later screening and lifestyle initiatives."
            icon={ClipboardList}
            accent="green"
          />

          <ul className="mt-10 grid gap-5">
            {completed.map((study) => (
              <li
                key={study.slug}
                className="rounded-[28px] border border-green/15 bg-paper p-7 shadow-sm sm:grid sm:grid-cols-[1fr_auto] sm:gap-8 sm:p-8"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-green-soft px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-green">
                      Completed
                    </span>
                    <span className="text-xs font-medium text-ink-subtle">
                      {formatDate(study.date)}
                    </span>
                  </div>
                  <h3 className="text-h4 mt-4 text-ink">{study.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {study.description}
                  </p>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
                    {study.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                <p className="mt-5 text-sm font-semibold text-ink sm:mt-0 sm:max-w-[12rem] sm:text-right">
                  PI · {study.principalInvestigator}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-ink-muted">
            Additional completed camp analyses and training evaluations are
            summarised in our publications and abstracts below as manuscripts
            and conference outputs are prepared.
          </p>
        </Container>
      </Section>

      <Section
        id="publications"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="publications-heading"
      >
        <Container>
          <SectionIntro
            id="publications-heading"
            eyebrow="Peer outputs"
            title="Publications"
            description="Papers and practice-facing write-ups that document screening outcomes, training models, and patient-education approaches emerging from Academy programmes."
            icon={BookOpen}
            accent="orange"
          />

          <ul className="mt-10 grid gap-5">
            {publicationDetails.map((pub) => (
              <li
                key={pub.slug}
                className="rounded-[28px] border border-orange/15 bg-paper p-7 shadow-sm sm:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-orange">
                  {pub.journal} · {pub.year}
                </p>
                <h3 className="text-h4 mt-2 text-ink">{pub.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  {pub.authors.join(", ")}
                </p>
                {pub.doi ? (
                  <p className="mt-1 text-xs text-ink-subtle">DOI: {pub.doi}</p>
                ) : null}
                <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm leading-relaxed text-ink-muted">
                  {pub.abstract.map((line) => (
                    <p key={line.slice(0, 40)}>{line}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section
        id="abstracts"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="abstracts-heading"
      >
        <Container>
          <SectionIntro
            id="abstracts-heading"
            eyebrow="Conference science"
            title="Abstracts"
            description="Selected abstracts and posters shared at national and regional meetings — often the first step before a full manuscript — capturing camp epidemiology, training design, and lifestyle counselling signals."
            icon={FileText}
            accent="purple"
          />

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {abstracts.map((item) => (
              <li
                key={item.title}
                className="flex h-full flex-col rounded-[24px] border border-purple/15 bg-paper p-6 shadow-sm"
              >
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-purple">
                  {item.year}
                </p>
                <h3 className="mt-3 text-base font-semibold leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-medium text-ink-subtle">
                  {item.venue}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  {item.summary}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section
        id="clinical-trials"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="clinical-trials-heading"
      >
        <Container>
          <SectionIntro
            id="clinical-trials-heading"
            eyebrow="Study designs"
            title="Clinical trials & interventional work"
            description="DREAM Academy focuses on pragmatic, ethics-reviewed studies that strengthen screening, education, and lifestyle support — not speculative product trials. Registrations and investigator details are published when protocols clear review."
            icon={Microscope}
            accent="crimson"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-crimson/15 bg-paper p-7 sm:p-8">
              <h3 className="text-h4 text-ink">Current orientation</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Most Academy studies are observational or pragmatic
                interventional pilots embedded in community camps and clinic
                workflows. Participants receive counselling and referral support
                as part of programme delivery; research elements never replace
                clinically indicated care.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Where a formal trial registration or ethics committee identifier
                applies, those details are listed here alongside status once
                available for public reference.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {clinicalTrialPoints.map((point) => (
                <li
                  key={point}
                  className="rounded-2xl border border-border bg-paper px-4 py-3.5 text-sm font-semibold leading-snug text-ink shadow-sm"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section
        id="collaborations"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="collaborations-heading"
      >
        <Container>
          <SectionIntro
            id="collaborations-heading"
            eyebrow="Partnerships"
            title="Research collaborations"
            description="We welcome ethical partnerships that improve metabolic care delivery — with clinicians, universities, civic groups, and training networks who share a commitment to community benefit and transparent methods."
            icon={Handshake}
            accent="teal"
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {collaborationPillars.map((item) => (
              <li
                key={item.title}
                className="rounded-[24px] border border-teal/15 bg-paper p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-[28px] border border-border bg-surface/60 p-7 sm:p-8">
            <h3 className="text-h4 text-ink">How to collaborate</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted">
              Share a brief concept note covering objectives, population,
              methods, ethics pathway, and expected community benefit. Suitable
              proposals are reviewed for scientific merit, feasibility in camp
              or clinic settings, and alignment with DREAM Academy’s mission.
            </p>
            <div className="mt-6">
              <Button href="/contact" size="sm">
                Discuss a collaboration
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="ethics-policy"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="ethics-policy-heading"
      >
        <Container>
          <SectionIntro
            id="ethics-policy-heading"
            eyebrow="Standards"
            title="Ethics & research policy"
            description="Integrity, participant dignity, and community benefit guide every study. DREAM Academy expects proposals and field activities to meet clear ethical standards before data collection begins."
            icon={Scale}
            accent="brand"
          />

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ethicsPrinciples.map((item) => (
              <li
                key={item.title}
                className="rounded-[24px] border border-border bg-paper p-6 shadow-sm"
              >
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ink-muted">
            Questions about ethics review, data governance, or collaborative
            protocols can be directed through our contact channels. We will
            point you to the appropriate clinical, administrative, or academic
            lead.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Contact research team</Button>
            <Button href="/get-involved#research-collaboration" variant="secondary">
              Partner on a study
            </Button>
          </div>
        </Container>
      </Section>
    </article>
  );
}
