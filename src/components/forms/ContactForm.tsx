"use client";

import { useActionState } from "react";

import { submitContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";

const initialState = { success: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="surface-card space-y-6 p-8 lg:p-10"
      noValidate
    >
      <div>
        <h2 className="text-h3 font-medium">Send a message</h2>
        <p className="mt-2 font-sans text-sm text-ink-muted">
          We aim to respond within two working days.
        </p>
      </div>

      <div>
        <label
          htmlFor="contact-name"
          className="block font-sans text-sm font-medium text-ink"
        >
          Full name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="input-field mt-2"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block font-sans text-sm font-medium text-ink"
        >
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input-field mt-2"
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block font-sans text-sm font-medium text-ink"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          className="input-field mt-2"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block font-sans text-sm font-medium text-ink"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className="input-field mt-2 resize-y"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          value="true"
          required
          className="mt-1"
        />
        <label
          htmlFor="contact-consent"
          className="font-sans text-sm leading-relaxed text-ink-muted"
        >
          I consent to DREAM Academy processing my personal data to respond to
          this enquiry, in accordance with the Privacy Policy.
        </label>
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Sending…" : "Send message"}
      </Button>

      <p
        className="font-sans text-sm text-ink-muted"
        aria-live="polite"
        role="status"
      >
        {state.message}
      </p>
    </form>
  );
}

