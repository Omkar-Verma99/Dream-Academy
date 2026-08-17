import {
  Award,
  GraduationCap,
  Laptop,
  Mic2,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Academy",
  description:
    "Certificate courses, fellowship programmes, webinars, conferences, hands-on workshops, and the online learning portal at DREAM Academy.",
  path: "/academy",
});

const pageNav = [
  { href: "#certificate-courses", label: "Certificate courses" },
  { href: "#fellowship-programs", label: "Fellowships" },
  { href: "#webinars", label: "Webinars" },
  { href: "/media/videos", label: "Health talks" },
  { href: "#conferences", label: "Conferences" },
  { href: "#workshops", label: "Workshops" },
  { href: "#online-learning", label: "Online learning" },
  { href: "/portal/login", label: "Member login" },
] as const;

const accents = {
  brand: {
    soft: "bg-brand-soft",
    text: "text-brand",
    ring: "border-brand/15",
  },
  crimson: {
    soft: "bg-crimson-soft",
    text: "text-crimson",
    ring: "border-crimson/15",
  },
  orange: {
    soft: "bg-orange-soft",
    text: "text-orange",
    ring: "border-orange/15",
  },
  green: {
    soft: "bg-green-soft",
    text: "text-green",
    ring: "border-green/15",
  },
  purple: {
    soft: "bg-purple-soft",
    text: "text-purple",
    ring: "border-purple/15",
  },
  teal: {
    soft: "bg-teal-soft",
    text: "text-teal",
    ring: "border-teal/15",
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

const certificateCourses = [
  {
    title: "Fundamentals of Diabetes Care",
    duration: "4–6 weeks · Blended",
    audience: "MBBS / primary-care physicians, PG trainees",
    summary:
      "Core pathophysiology, diagnosis pathways, glycaemic targets, and safe initiation of foundational therapies — designed for busy clinicians who need a structured, practice-first update.",
    outcomes: [
      "Case-based modules with clinic-ready checklists",
      "Risk stratification for complications",
      "Patient counselling scripts in clear language",
    ],
  },
  {
    title: "Metabolic Medicine for Primary Care",
    duration: "CME certificate · 1–2 days",
    audience: "Family physicians, internists, NCD clinic teams",
    summary:
      "Focuses on obesity, metabolic syndrome, lipids, and hypertension as one clinical continuum — with referral thresholds and camp-to-clinic coordination habits.",
    outcomes: [
      "Practical algorithms for high-volume OPDs",
      "Lifestyle prescription frameworks",
      "Documentation templates for follow-up",
    ],
  },
  {
    title: "Community Screening & Health-Worker Facilitation",
    duration: "Short certificate · Field oriented",
    audience: "Nurses, ANMs, community health workers, camp coordinators",
    summary:
      "Standardised capillary testing, risk communication, documentation, and warm referral pathways so field teams deliver consistent quality at every camp.",
    outcomes: [
      "Field SOPs for screening stations",
      "Consent and counselling essentials",
      "Escalation rules for urgent findings",
    ],
  },
] as const;

const fellowshipTracks = [
  {
    title: "Clinical Diabetes & Advanced Metabolic Care",
    term: "6–12 months",
    text: "Supervised outpatient and clinic exposure under physician mentorship, with emphasis on complex type 2 diabetes, obesity medicine, and complication prevention.",
  },
  {
    title: "Community Metabolic Health",
    term: "6 months",
    text: "Immersion in screening camps, referral audits, and public-health messaging — for clinicians who want fieldwork experience alongside evidence review.",
  },
  {
    title: "Education & Research Mentorship",
    term: "Aligned to projects",
    text: "Structured support for protocol design, abstract preparation, and teaching sessions nested within Academy CME and outreach calendars.",
  },
] as const;

const webinarThemes = [
  {
    title: "Clinical updates",
    text: "Guideline refreshers, therapy sequencing, and case discussions for physicians managing diabetes and related metabolic conditions.",
  },
  {
    title: "Nutrition & lifestyle",
    text: "Evening sessions for clinicians, patients, and caregivers on practical meal patterns, activity, and behaviour change in Indian contexts.",
  },
  {
    title: "Camp & community skills",
    text: "Short briefings for camp teams on screening flow, counselling quality, documentation, and follow-up closing the loop to clinic care.",
  },
  {
    title: "Archive & replay",
    text: "Selected recordings and slide packs remain available for enrolled participants so learning continues after the live hour.",
  },
] as const;

const conferencePillars = [
  {
    title: "Scientific programme",
    text: "Plenaries and parallel sessions on diabetes therapeutics, obesity medicine, public health, and ethical research from camp settings.",
  },
  {
    title: "Skills & teaching tracks",
    text: "Workshops and CME streams that translate science into exam-ready and clinic-ready teaching for postgraduate and primary-care audiences.",
  },
  {
    title: "Community voice",
    text: "Panels that include field experiences — what works in rural screening, patient education in Hindi, and durable referral partnerships.",
  },
  {
    title: "Networking & collaboration",
    text: "Space for institutions, trainees, and civic partners to explore joint studies, scholarships, and regional training circuits.",
  },
] as const;

const workshopModules = [
  {
    title: "Insulin initiation & titration skills",
    format: "Half-day · Hands-on",
    text: "Demonstration and supervised practice around education scripts, safety checks, and common titration pitfalls in primary care.",
  },
  {
    title: "Anthropometry & risk scoring stations",
    format: "Camp prep · Team based",
    text: "How to run reliable waist, BMI, and blood-pressure stations with consistent technique under time pressure.",
  },
  {
    title: "Motivational counselling micro-skills",
    format: "Interactive · Role play",
    text: "Brief, respectful conversations that help people act on diet, activity, and medication adherence after a screening result.",
  },
  {
    title: "Camp operations dry-run",
    format: "Full simulation",
    text: "End-to-end rehearsal of registration, testing flow, counselling booths, and referral documentation before a live rural camp.",
  },
] as const;

const onlineLearningFeatures = [
  {
    title: "Modular courses",
    text: "Self-paced lessons with short assessments, downloadable checklists, and links to upcoming live CME or workshop dates.",
  },
  {
    title: "Resource library",
    text: "Curated patient-education sheets, Hindi/English counselling aids, and clinician reference summaries from Academy programmes.",
  },
  {
    title: "Webinar replays",
    text: "Access to selected past webinars for enrolled learners, with optional discussion prompts for departmental teaching.",
  },
  {
    title: "Progress & certificates",
    text: "Completion tracking for certificate pathways, with digital certificates issued when assessment criteria are met.",
  },
] as const;

export default function AcademyPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Academy"
        title="Learning for better care"
        lead="Certificate courses, fellowships, webinars, conferences, hands-on workshops, and an online learning portal — so clinicians and community teams grow skills that reach patients."
      />

      <Section pad="sm">
        <Container>
          <nav
            aria-label="Academy sections"
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
            DREAM Academy educates the people who deliver diabetes and
            metabolic care — physicians, trainees, nurses, and community health
            workers. Programmes mix evidence updates with field-tested skills
            from camps and clinics across Uttar Pradesh.
          </p>
        </Container>
      </Section>

      <Section
        id="certificate-courses"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="certificate-courses-heading"
      >
        {/* Legacy hash target kept for older links */}
        <span id="courses" className="sr-only" aria-hidden="true" />
        <Container>
          <SectionIntro
            id="certificate-courses-heading"
            eyebrow="Credential pathways"
            title="Certificate courses"
            description="Short, focused programmes that strengthen clinical judgement and counselling — with certificates for continuing professional development where eligibility criteria are met."
            icon={Award}
            accent="brand"
          />

          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {certificateCourses.map((course) => (
              <li
                key={course.title}
                className={`flex h-full flex-col rounded-[28px] border ${accents.brand.ring} bg-paper p-6 shadow-sm sm:p-7`}
              >
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-brand">
                  {course.duration}
                </p>
                <h3 className="text-h4 mt-3 text-ink">{course.title}</h3>
                <p className="mt-2 text-xs font-semibold text-ink-subtle">
                  For · {course.audience}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {course.summary}
                </p>
                <ul className="mt-5 space-y-2">
                  {course.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="rounded-2xl border border-border/80 bg-surface/50 px-3.5 py-2.5 text-sm leading-snug text-ink-muted"
                    >
                      {outcome}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/events#upcoming-events" size="sm">
              See course dates
            </Button>
            <Button href="/contact" variant="secondary" size="sm">
              Enquire about enrolment
            </Button>
          </div>
        </Container>
      </Section>

      <Section
        id="fellowship-programs"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="fellowship-programs-heading"
      >
        <span id="fellowships" className="sr-only" aria-hidden="true" />
        <Container>
          <SectionIntro
            id="fellowship-programs-heading"
            eyebrow="Deep immersion"
            title="Fellowship programmes"
            description="Mentored pathways that combine supervised clinical exposure, community fieldwork, and scholarly activity — for early-career clinicians ready to specialise in metabolic care."
            icon={GraduationCap}
            accent="green"
          />

          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {fellowshipTracks.map((track) => (
              <li
                key={track.title}
                className={`rounded-[28px] border ${accents.green.ring} bg-paper p-6 shadow-sm sm:p-7`}
              >
                <p className="rounded-full bg-green-soft px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-green inline-block">
                  {track.term}
                </p>
                <h3 className="text-h4 mt-4 text-ink">{track.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {track.text}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-[28px] border border-border bg-surface/60 p-7 sm:p-8">
            <h3 className="text-h4 text-ink">What fellows can expect</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted">
              Clear learning objectives, assigned mentors, participation in
              screening camps or clinic sessions, and guidance for abstracts or
              teaching contributions. Seats are limited; selection considers
              clinical background, motivation for community service, and
              availability for the programme term.
            </p>
            <div className="mt-6">
              <Button href="/contact" size="sm">
                Apply or request brochure
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="webinars"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="webinars-heading"
      >
        <Container>
          <SectionIntro
            id="webinars-heading"
            eyebrow="Live learning"
            title="Webinars"
            description="Focused online sessions for clinicians, trainees, and community teams — easy to join from any district, with selected recordings for later review."
            icon={Mic2}
            accent="orange"
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {webinarThemes.map((item) => (
              <li
                key={item.title}
                className={`rounded-[24px] border ${accents.orange.ring} bg-paper p-6 shadow-sm`}
              >
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm leading-relaxed text-ink-muted">
            Upcoming webinar titles and registration links are published with
            our events calendar. Patient-facing sessions use accessible
            language; clinician sessions include Q&amp;A with faculty.
          </p>
          <div className="mt-6">
            <Button href="/events#upcoming-events" size="sm">
              Browse upcoming webinars
            </Button>
          </div>
        </Container>
      </Section>

      <Section
        id="conferences"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="conferences-heading"
      >
        <Container>
          <SectionIntro
            id="conferences-heading"
            eyebrow="Scientific meetings"
            title="Conferences"
            description="Annual and thematic meetings that bring together metabolic medicine, education, and community health — so research and field practice share the same stage."
            icon={Users}
            accent="crimson"
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {conferencePillars.map((item) => (
              <li
                key={item.title}
                className={`rounded-[24px] border ${accents.crimson.ring} bg-paper p-6 shadow-sm`}
              >
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/events#upcoming-events" size="sm">
              Conference calendar
            </Button>
            <Button href="/contact" variant="secondary" size="sm">
              Sponsor or present
            </Button>
          </div>
        </Container>
      </Section>

      <Section
        id="workshops"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="workshops-heading"
      >
        <Container>
          <SectionIntro
            id="workshops-heading"
            eyebrow="Practice by doing"
            title="Hands-on workshops"
            description="Small-group skills labs where teams practise techniques — insulin education, anthropometry, counselling, and camp station design — before applying them with patients."
            icon={Wrench}
            accent="purple"
          />

          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {workshopModules.map((item) => (
              <li
                key={item.title}
                className={`rounded-[28px] border ${accents.purple.ring} bg-paper p-6 shadow-sm sm:p-7`}
              >
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-purple">
                  {item.format}
                </p>
                <h3 className="mt-3 text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-muted">
            Workshops may run stand-alone, within CME days, or as pre-camp
            briefings for partner organisations. Group bookings for
            institutions and district teams can be arranged through contact.
          </p>
        </Container>
      </Section>

      <Section
        id="online-learning"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="online-learning-heading"
      >
        <Container>
          <SectionIntro
            id="online-learning-heading"
            eyebrow="Learn anywhere"
            title="Online learning portal"
            description="A growing digital hub for self-paced modules, resource downloads, and selected webinar archives — complementary to live courses, fellowships, and workshops."
            icon={Laptop}
            accent="teal"
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {onlineLearningFeatures.map((item) => (
              <li
                key={item.title}
                className={`rounded-[24px] border ${accents.teal.ring} bg-paper p-6 shadow-sm`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal"
                    aria-hidden="true"
                  >
                    <Sparkles className="h-4 w-4 stroke-[2.25]" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {item.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-[28px] border border-border bg-brand-deep p-7 text-white sm:p-8">
            <h3 className="text-h4 font-semibold text-white">
              Portal access rolling out
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/85">
              Course pages and enrolment links are published as modules go live.
              Until then, register interest via contact or watch upcoming live
              programmes on the events calendar — many certificate pathways will
              blend online lessons with in-person skills days.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/portal/login" size="sm">
                Member login
              </Button>
              <Button href="/contact" variant="secondary" size="sm" className="border-white/25 bg-transparent text-white hover:bg-white/10">
                Request portal access
              </Button>
              <Button
                href="/events#upcoming-events"
                variant="secondary"
                size="sm"
                className="border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                See live programmes
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
