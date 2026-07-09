import Link from "next/link";
import {
  CalendarDays,
  Camera,
  ClipboardList,
  FlaskConical,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { logoutStaff } from "@/app/actions/auth";
import { Container } from "@/components/layout/Container";

const links = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/camps", label: "Camps", icon: Camera },
  { href: "/portal/events", label: "Events", icon: CalendarDays },
  { href: "/portal/research", label: "Research", icon: FlaskConical },
  { href: "/portal/submissions", label: "Submissions", icon: ClipboardList },
] as const;

export function PortalNav({ email }: { email: string }) {
  return (
    <header className="border-b border-border bg-paper">
      <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-eyebrow text-brand">Staff portal</p>
          <p className="text-sm text-ink-muted">{email}</p>
        </div>
        <nav aria-label="Portal">
          <ul className="flex flex-wrap items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-medium text-ink transition hover:border-brand/30 hover:text-brand"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <form action={logoutStaff}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-muted transition hover:text-ink"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Log out
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
