import { fallbackEvents } from "@/data/fallback";
import { sanityFetch } from "@/lib/sanity/client";
import {
  allEventsQuery,
  pastEventsQuery,
  upcomingEventsQuery,
} from "@/lib/sanity/queries";
import type { SanityEventRecord } from "@/lib/sanity/mappers";
import type { EventSummary } from "@/types/content";

function mapEvent(event: SanityEventRecord): EventSummary {
  return {
    title: event.title,
    slug: event.slug,
    type: event.type,
    startDateTime: event.startDateTime,
    description: event.description ?? "",
    registrationUrl: event.registrationUrl,
  };
}

export async function getEvents(): Promise<EventSummary[]> {
  const events = await sanityFetch<SanityEventRecord[]>(allEventsQuery);
  if (events?.length) {
    return events.map(mapEvent);
  }
  return fallbackEvents;
}

export async function getUpcomingEvents(limit = 6): Promise<EventSummary[]> {
  const events = await sanityFetch<SanityEventRecord[]>(upcomingEventsQuery, {
    limit: limit - 1,
  });
  if (events?.length) {
    return events.map(mapEvent);
  }

  const now = Date.now();
  return fallbackEvents
    .filter((event) => new Date(event.startDateTime).getTime() >= now)
    .slice(0, limit);
}

export async function getPastEvents(limit = 6): Promise<EventSummary[]> {
  const events = await sanityFetch<SanityEventRecord[]>(pastEventsQuery, {
    limit: limit - 1,
  });
  if (events?.length) {
    return events.map(mapEvent);
  }

  const now = Date.now();
  return fallbackEvents
    .filter((event) => new Date(event.startDateTime).getTime() < now)
    .slice(0, limit);
}
