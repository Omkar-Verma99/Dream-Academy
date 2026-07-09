"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useId, useState } from "react";
import {
  ArrowLeft,
  Camera,
  CalendarDays,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
} from "lucide-react";

import { loginStaff, type AuthState } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

const initialState: AuthState = { success: false, message: "" };

const highlights = [
  { icon: Camera, text: "Publish camps, gallery photos & videos" },
  { icon: CalendarDays, text: "Schedule events, CME & webinars" },
  { icon: Shield, text: "Secure staff-only workspace" },
] as const;

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginStaff, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const rememberId = useId();

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="border-b border-border bg-paper px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted no-underline hover:text-brand hover:no-underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to website
          </Link>
          <Image
            src="/images/brand/dream-academy-official.png"
            alt="DREAM Academy"
            width={160}
            height={105}
            className="h-10 w-auto object-contain sm:h-11"
            priority
          />
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-border bg-paper shadow-xl lg:grid-cols-[1.05fr_1fr]">
          <aside className="relative hidden flex-col justify-between bg-brand-gradient p-10 text-white lg:flex">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                Staff workspace
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight">
                DREAM Academy content portal
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">
                Sign in to publish camps, upload gallery media, manage events, and keep the public
                website up to date — no technical tools required.
              </p>
            </div>

            <ul className="mt-10 space-y-4">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-3 text-sm text-white/90">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {item.text}
                  </li>
                );
              })}
            </ul>

            <p className="mt-10 text-xs text-white/70">
              Authorised team members only. Contact your administrator if you need access.
            </p>
          </aside>

          <div className="flex flex-col justify-center p-8 sm:p-10">
            <div className="lg:hidden">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Staff workspace</p>
              <h1 className="mt-2 font-display text-2xl font-bold text-ink">Sign in</h1>
            </div>

            <div className="hidden lg:block">
              <h2 className="font-display text-2xl font-bold text-ink">Welcome back</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Enter your staff email and portal password to continue.
              </p>
            </div>

            <form action={formAction} className="mt-8 space-y-5">
              <div>
                <label htmlFor="staff-email" className="block text-sm font-semibold text-ink">
                  Work email
                </label>
                <div className="relative mt-2">
                  <Mail
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="staff-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="username"
                    placeholder="you@organisation.org"
                    className="input-field input-field--icon"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="staff-password" className="block text-sm font-semibold text-ink">
                    Password
                  </label>
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=Staff%20portal%20password%20help`}
                    className="text-xs font-semibold text-brand no-underline hover:underline"
                  >
                    Need help?
                  </a>
                </div>
                <div className="relative mt-2">
                  <Lock
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="staff-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your portal password"
                    className="input-field input-field--icon pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-ink-muted transition hover:bg-surface-sunk hover:text-ink"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id={rememberId}
                  name="remember"
                  type="checkbox"
                  value="on"
                  defaultChecked
                  className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
                />
                <label htmlFor={rememberId} className="text-sm text-ink-muted">
                  Keep me signed in for 30 days
                </label>
              </div>

              {state.message ? (
                <div
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    state.success
                      ? "border-green/30 bg-green-soft text-green"
                      : "border-orange/30 bg-orange-soft text-orange"
                  }`}
                  role="alert"
                >
                  {state.message}
                </div>
              ) : null}

              <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Signing in…" : "Sign in to portal"}
              </Button>
            </form>

            <p className="mt-8 text-center text-xs leading-relaxed text-ink-muted">
              New here?{" "}
              <Link href="/portal" className="font-semibold text-brand no-underline hover:underline">
                Learn about the staff portal
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
