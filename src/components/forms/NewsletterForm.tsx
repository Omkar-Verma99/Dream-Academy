"use client";

import { useActionState } from "react";

import { subscribeNewsletter } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/Button";

const initialState = { success: false, message: "" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialState,
  );

  return (
    <form action={formAction} className="mt-4" noValidate>
      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="input-field"
            placeholder="you@example.com"
          />
        </div>
        <Button type="submit" variant="ghost" size="sm" disabled={pending} className="w-fit px-0">
          {pending ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      <p
        className="mt-3 font-sans text-sm text-paper/60"
        aria-live="polite"
        role="status"
      >
        {state.message}
      </p>
    </form>
  );
}

