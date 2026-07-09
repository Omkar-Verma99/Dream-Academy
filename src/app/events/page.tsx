import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  Images,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

import { CampCard } from "@/components/events/CampCard";
import { EventCard } from "@/components/events/EventCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getCampFilterOptions, getRecentCampSummaries } from "@/lib/content/camp-summaries";
import { getPastEvents, getUpcomingEvents } from "@/lib/content/events";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Events",
  description:
    "Upcoming conferences, CME, webinars, diabetes camps, awareness campaigns, and photo galleries from DREAM Academy.",
  path: "/events",
});

const pageNav = [
  { href: "#upcoming-events", label: "Upcoming" },
  { href: "#diabetes-camps", label: "Camps" },
  { href: "/events/camps", label: "Gallery" },
  { href: "#past-events", label: "Past events" },
  { href: "#campaigns", label: "Campaigns" },
] as const;

const accents = {
  brand: { soft: "bg-brand-soft", text: "text-brand" },
  green: { soft: "bg-green-soft", text: "text-green" },
  crimson: { soft: "bg-crimson-soft", text: "text-crimson" },
  orange: { soft: "bg-orange-soft", text: "text-orange" },
} as const;

type AccentKey = keyof typeof accents;

const campaignPillars = [
  {
    title: "Awareness months",
    text: "Structured drives around World Diabetes Day and regional health weeks — posters, talks, and screening sign-up in clinics and communities.",
  },
  {
    title: "School & youth programmes",
    text: "Nutrition, activity, and early-risk education in schools, paired with parent sessions and referral guidance for at-risk families.",
  },
  {
    title: "Rural screening circuits",
    text: "Multi-village outreach with local leaders, ANMs, and camp teams to bring glucose testing and counselling closer to underserved blocks.",
  },
  {
    title: "Media & civic partnerships",
    text: "Collaboration with resident welfare associations, clinics, and local media to sustain messaging beyond a single camp day.",
  },
] as const;

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
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
    </div>
  );
}

export default async function EventsPage() {
  const [upcomingEvents, pastEvents, recentCamps, campStats] = await Promise.all([
    getUpcomingEvents(6),
    getPastEvents(6),
    getRecentCampSummaries(6),
    getCampFilterOptions(),
  ]);

  return (
    <article>
      <PageHeader
        eyebrow="Events"
        title="Camps, learning & community moments"
        lead="Conferences, CME programmes, webinars, and field camps across Uttar Pradesh — browse upcoming programmes or explore our growing archive of community health work."
      />

      <Section pad="sm">
        <Container>
          <nav
            aria-label="Events sections"
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

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Camps documented", value: String(campStats.total) },
              { label: "Districts covered", value: String(campStats.districts.length) },
              { label: "Upcoming programmes", value: String(upcomingEvents.length) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[20px] border border-border bg-paper px-5 py-4 text-center shadow-sm"
              >
                <p className="font-display text-3xl font-bold text-brand">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        id="upcoming-events"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="upcoming-events-heading"
      >
        <Container>
          <SectionIntro
            id="upcoming-events-heading"
            eyebrow="On the calendar"
            title="Upcoming events"
            description="Register for conferences, CME, webinars, and scheduled community programmes."
            icon={CalendarDays}
            accent="brand"
          />

          {upcomingEvents.length ? (
            <ul className="mt-10 grid gap-5 lg:grid-cols-2">
              {upcomingEvents.map((event) => (
                <li key={event.slug}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 rounded-[24px] border border-dashed border-border bg-paper px-6 py-12 text-center text-sm text-ink-muted">
              No upcoming events right now. Check back soon or contact us to partner on a programme.
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="sm">
              Ask about an event
            </Button>
            <Button href="/academy#webinars" variant="secondary" size="sm">
              Academy webinars
            </Button>
          </div>
        </Container>
      </Section>

      <Section
        id="diabetes-camps"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="diabetes-camps-heading"
      >
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              id="diabetes-camps-heading"
              eyebrow="Field programmes"
              title="Recent diabetes camps"
              description="Community screening with glucose testing, counselling, and referral support — each camp has a full photo report."
              icon={HeartHandshake}
              accent="green"
            />
            <Button href="/events/camps" size="sm" className="shrink-0 self-center lg:self-auto">
              Browse all {campStats.total} camps
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {recentCamps.map((camp, index) => (
              <li key={camp.slug}>
                <CampCard camp={camp} priority={index < 2} />
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-[28px] border border-green/15 bg-green-soft/30 p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-paper text-green">
                  <Images className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">Search the full camp archive</h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    Filter by year or district, search by village name, and load camps in batches — fast even with hundreds of reports.
                  </p>
                </div>
              </div>
              <Button href="/events/camps" variant="secondary" size="sm">
                Open camp archive
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="past-events"
        tone="sunk"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="past-events-heading"
      >
        <Container>
          <SectionIntro
            id="past-events-heading"
            eyebrow="Archive"
            title="Past events"
            description="A snapshot of recent conferences, CME sessions, and webinars. Older programmes remain available as your team publishes them."
            icon={CalendarDays}
            accent="orange"
          />

          {pastEvents.length ? (
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {pastEvents.map((event) => (
                <li key={event.slug}>
                  <EventCard event={event} compact />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 text-sm text-ink-muted">Past events will appear here after programmes conclude.</p>
          )}
        </Container>
      </Section>

      <Section
        id="campaigns"
        pad="sm"
        className="scroll-mt-28"
        aria-labelledby="campaigns-heading"
      >
        <Container>
          <SectionIntro
            id="campaigns-heading"
            eyebrow="Public education"
            title="Awareness campaigns"
            description="Sustained messaging on diabetes prevention, early detection, and family counselling — often paired with local camps and clinic outreach."
            icon={Megaphone}
            accent="crimson"
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {campaignPillars.map((item) => (
              <li
                key={item.title}
                className="rounded-[24px] border border-crimson/15 bg-paper p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-[28px] border border-border bg-paper p-7 sm:p-8">
            <h3 className="text-h4 text-ink">Partner on a campaign</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-muted">
              Civic groups, schools, RWAs, and clinics can co-host awareness weeks with DREAM Academy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" size="sm">
                Discuss a campaign
              </Button>
              <Button href="/outreach" variant="secondary" size="sm">
                Community outreach
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
