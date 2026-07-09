import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  Camera,
  LayoutDashboard,
  LogIn,
  Shield,
} from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getStaffSession } from "@/lib/auth/staff";
import { isSanityConfigured } from "@/lib/sanity/env";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Staff Portal",
  description:
    "DREAM Academy staff portal — log in to publish camps, events, photos, and field reports.",
  path: "/portal",
});

const features = [
  {
    icon: Camera,
    title: "Camps & photos",
    text: "Add camp title, location, dates, hero image, gallery photos and videos, and field report.",
  },
  {
    icon: CalendarDays,
    title: "Events & webinars",
    text: "Schedule conferences, CME sessions, webinars, and registration links.",
  },
  {
    icon: Shield,
    title: "Simple staff login",
    text: "Your team signs in on the website — no Sanity account or technical dashboard needed.",
  },
] as const;

export default async function PortalPage() {
  const session = await getStaffSession();
  if (session) {
    redirect("/portal/dashboard");
  }

  const configured = isSanityConfigured;

  return (
    <article>
      <PageHeader
        eyebrow="Staff"
        title="Content portal"
        lead="One login for your team to publish camps, upload photos and videos, schedule events, and post updates — the public website updates automatically."
      />

      <Section pad="sm">
        <Container>
          <div
            className={`rounded-[28px] border p-7 sm:p-8 ${
              configured
                ? "border-green/20 bg-green-soft/40"
                : "border-orange/20 bg-orange-soft/40"
            }`}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <span
                  className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                    configured ? "bg-green-soft text-green" : "bg-orange-soft text-orange"
                  }`}
                  aria-hidden="true"
                >
                  <LayoutDashboard className="h-7 w-7 stroke-[2.25]" />
                </span>
                <div>
                  <p className="text-eyebrow text-brand">Portal status</p>
                  <h2 className="text-h3 mt-1 font-bold text-ink">
                    {configured
                      ? "Ready — sign in to publish content"
                      : "CMS setup required"}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                    {configured
                      ? "Use your staff email and portal password to add camps, upload photos, and manage events. Changes appear on the public site within about a minute."
                      : "Add Sanity project settings to .env before publishing content."}
                  </p>
                </div>
              </div>
              <Button href="/portal/login" size="sm">
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Sign in to portal
              </Button>
            </div>
          </div>

          <h2 className="text-h3 mt-12 text-center font-bold text-ink">
            What your team can do
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.title}
                  className="rounded-[24px] border border-border bg-paper p-6 shadow-sm"
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5 stroke-[2.25]" />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 rounded-[28px] border border-border bg-surface/60 p-7 sm:p-8">
            <h2 className="text-h4 text-ink">How it works</h2>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
              <li>
                <strong className="text-ink">1. Sign in</strong> at{" "}
                <Link href="/portal/login" className="font-semibold text-brand">
                  /portal/login
                </Link>{" "}
                with your staff email and portal password.
              </li>
              <li>
                <strong className="text-ink">2. Create a camp</strong> — add
                details, upload photos, paste a video link, write the report,
                and publish.
              </li>
              <li>
                <strong className="text-ink">3. It goes live</strong> on Events,
                camp report pages, and the homepage gallery automatically.
              </li>
            </ol>
          </div>
        </Container>
      </Section>
    </article>
  );
}
