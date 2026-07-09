"use client";

import { useActionState } from "react";

import { submitVolunteer } from "@/app/actions/volunteer";

const initialState = { success: false, message: "" };

export function VolunteerForm() {
  const [state, formAction, pending] = useActionState(
    submitVolunteer,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div>
        <label htmlFor="volunteer-name" className="block font-sans text-sm font-medium text-ink">
          Full name
        </label>
        <input
          id="volunteer-name"
          name="name"
          type="text"
          required
          className="mt-2 w-full border border-border bg-surface px-3 py-2 font-sans text-sm"
        />
      </div>
      <div>
        <label htmlFor="volunteer-email" className="block font-sans text-sm font-medium text-ink">
          Email address
        </label>
        <input
          id="volunteer-email"
          name="email"
          type="email"
          required
          className="mt-2 w-full border border-border bg-surface px-3 py-2 font-sans text-sm"
        />
      </div>
      <div>
        <label htmlFor="volunteer-phone" className="block font-sans text-sm font-medium text-ink">
          Phone number
        </label>
        <input
          id="volunteer-phone"
          name="phone"
          type="tel"
          required
          className="mt-2 w-full border border-border bg-surface px-3 py-2 font-sans text-sm"
        />
      </div>
      <div>
        <label htmlFor="volunteer-background" className="block font-sans text-sm font-medium text-ink">
          Background
        </label>
        <select
          id="volunteer-background"
          name="background"
          required
          className="mt-2 w-full border border-border bg-surface px-3 py-2 font-sans text-sm"
        >
          <option value="">Select one</option>
          <option value="healthcare">Healthcare professional</option>
          <option value="student">Medical student</option>
          <option value="community">Community member</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="volunteer-message" className="block font-sans text-sm font-medium text-ink">
          Why would you like to volunteer?
        </label>
        <textarea
          id="volunteer-message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full border border-border bg-surface px-3 py-2 font-sans text-sm"
        />
      </div>
      <div className="flex items-start gap-3">
        <input id="volunteer-consent" name="consent" type="checkbox" value="true" required />
        <label htmlFor="volunteer-consent" className="font-sans text-sm leading-relaxed text-ink-muted">
          I consent to DREAM Academy processing my personal data for volunteer
          coordination, in accordance with the Privacy Policy.
        </label>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="btn-primary w-full rounded-full px-4 py-3 font-sans text-sm font-bold disabled:opacity-50"
      >
        {pending ? "Submitting…" : "Submit application"}
      </button>
      <p className="font-sans text-sm text-ink-muted" aria-live="polite" role="status">
        {state.message}
      </p>
    </form>
  );
}

