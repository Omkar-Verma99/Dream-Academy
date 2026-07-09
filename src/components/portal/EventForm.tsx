"use client";

import { useActionState, useState } from "react";

import { saveEvent, type PortalActionState } from "@/app/actions/portal/events";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/portal/document-builders";
import type { PortalEventListItem } from "@/lib/portal/data";

const initialState: PortalActionState = { success: false, message: "" };

const eventTypes = [
  { value: "conference", label: "Conference" },
  { value: "cme", label: "CME" },
  { value: "webinar", label: "Webinar" },
  { value: "camp", label: "Health camp" },
  { value: "campaign", label: "Campaign" },
] as const;

type EventFormProps = {
  event?: PortalEventListItem;
};

function toDatetimeLocal(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
}

export function EventForm({ event }: EventFormProps) {
  const [state, formAction, pending] = useActionState(saveEvent, initialState);
  const [slug, setSlug] = useState(event?.slug ?? "");

  return (
    <form action={formAction} className="surface-card space-y-6 p-8">
      {event?._id ? <input type="hidden" name="id" value={event._id} /> : null}

      <div>
        <h2 className="text-h3 font-medium">{event ? "Edit event" : "New event"}</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Publish conferences, CME sessions, webinars, and scheduled programmes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="event-title" className="block text-sm font-medium text-ink">
            Event title
          </label>
          <input
            id="event-title"
            name="title"
            type="text"
            required
            defaultValue={event?.title}
            className="input-field mt-2"
            onBlur={(blurEvent) => {
              if (!slug) setSlug(slugify(blurEvent.target.value));
            }}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="event-slug" className="block text-sm font-medium text-ink">
            URL slug
          </label>
          <input
            id="event-slug"
            name="slug"
            type="text"
            required
            value={slug}
            onChange={(changeEvent) => setSlug(slugify(changeEvent.target.value))}
            className="input-field mt-2"
          />
        </div>

        <div>
          <label htmlFor="event-type" className="block text-sm font-medium text-ink">
            Type
          </label>
          <select
            id="event-type"
            name="type"
            required
            defaultValue={event?.type ?? "conference"}
            className="input-field mt-2"
          >
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="event-venue" className="block text-sm font-medium text-ink">
            Venue
          </label>
          <input
            id="event-venue"
            name="venue"
            type="text"
            defaultValue={event?.venue}
            className="input-field mt-2"
          />
        </div>

        <div>
          <label htmlFor="event-start" className="block text-sm font-medium text-ink">
            Start date & time
          </label>
          <input
            id="event-start"
            name="startDateTime"
            type="datetime-local"
            required
            defaultValue={toDatetimeLocal(event?.startDateTime)}
            className="input-field mt-2"
          />
        </div>

        <div>
          <label htmlFor="event-end" className="block text-sm font-medium text-ink">
            End date & time (optional)
          </label>
          <input
            id="event-end"
            name="endDateTime"
            type="datetime-local"
            defaultValue={toDatetimeLocal(event?.endDateTime)}
            className="input-field mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="event-description" className="block text-sm font-medium text-ink">
            Description
          </label>
          <textarea
            id="event-description"
            name="description"
            rows={5}
            defaultValue={event?.description}
            className="input-field mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="event-registration" className="block text-sm font-medium text-ink">
            Registration link
          </label>
          <input
            id="event-registration"
            name="registrationUrl"
            type="url"
            defaultValue={event?.registrationUrl}
            placeholder="https://"
            className="input-field mt-2"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="event-virtual"
            name="virtual"
            type="checkbox"
            value="true"
            defaultChecked={event?.virtual}
            className="h-4 w-4"
          />
          <label htmlFor="event-virtual" className="text-sm text-ink">
            Virtual / online event
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="event-featured"
            name="featured"
            type="checkbox"
            value="true"
            defaultChecked={event?.featured ?? true}
            className="h-4 w-4"
          />
          <label htmlFor="event-featured" className="text-sm text-ink">
            Show on homepage
          </label>
        </div>
      </div>

      {state.message ? (
        <p
          className={`text-sm ${state.success ? "text-green" : "text-orange"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Publishing…" : event ? "Update event" : "Publish event"}
        </Button>
        <Button href="/portal/events" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
