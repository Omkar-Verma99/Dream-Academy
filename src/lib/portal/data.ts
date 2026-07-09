import { sanityFetch } from "@/lib/sanity/client";

import {
  portalCampByIdQuery,
  portalCampsQuery,
  portalEventByIdQuery,
  portalEventsQuery,
  portalFormSubmissionsQuery,
  portalResearchByIdQuery,
  portalResearchQuery,
} from "./queries";

export type PortalCampListItem = {
  _id: string;
  title: string;
  slug: string;
  location: { name: string; district: string; state: string };
  dateStart: string;
  dateEnd?: string;
  heroImage?: { asset?: { url?: string }; alt?: string };
  video?: string;
};

export type PortalCampDetail = PortalCampListItem & {
  photos?: Array<{
    asset?: { _id?: string; url?: string };
    alt?: string;
    caption?: string;
  }>;
  galleryVideos?: Array<{
    asset?: { _id?: string; url?: string };
    caption?: string;
  }>;
  report?: Array<{ _type: string; children?: Array<{ text?: string }> }>;
};

export type PortalEventListItem = {
  _id: string;
  title: string;
  slug: string;
  type: string;
  startDateTime: string;
  endDateTime?: string;
  venue?: string;
  virtual?: boolean;
  description?: string;
  registrationUrl?: string;
  featured?: boolean;
};

export type PortalResearchListItem = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  status: "ongoing" | "completed" | "planned";
  startDate?: string;
  principalInvestigator?: string;
  bodyText?: string;
};

export type PortalFormSubmission = {
  _id: string;
  formType: string;
  submittedAt: string;
  name?: string;
  email?: string;
  phone?: string;
  pan?: string;
  subject?: string;
  message?: string;
  background?: string;
  amount?: number;
  frequency?: string;
};

export async function getPortalCamps() {
  return (await sanityFetch<PortalCampListItem[]>(portalCampsQuery)) ?? [];
}

export async function getPortalCampById(id: string) {
  return sanityFetch<PortalCampDetail | null>(portalCampByIdQuery, { id });
}

export async function getPortalEvents() {
  return (await sanityFetch<PortalEventListItem[]>(portalEventsQuery)) ?? [];
}

export async function getPortalEventById(id: string) {
  return sanityFetch<PortalEventListItem | null>(portalEventByIdQuery, { id });
}

function blocksToPlainText(
  blocks?: Array<{ children?: Array<{ text?: string }> }>,
): string | undefined {
  if (!blocks?.length) return undefined;
  return blocks
    .map((block) => block.children?.map((child) => child.text ?? "").join("") ?? "")
    .filter(Boolean)
    .join("\n\n");
}

type PortalResearchRecord = PortalResearchListItem & {
  body?: Array<{ children?: Array<{ text?: string }> }>;
};

function mapPortalResearch(record: PortalResearchRecord): PortalResearchListItem {
  return {
    _id: record._id,
    title: record.title,
    slug: record.slug,
    description: record.description,
    status: record.status,
    startDate: record.startDate,
    principalInvestigator: record.principalInvestigator,
    bodyText: blocksToPlainText(record.body),
  };
}

export async function getPortalResearch() {
  const projects = await sanityFetch<PortalResearchRecord[]>(portalResearchQuery);
  return projects?.map(mapPortalResearch) ?? [];
}

export async function getPortalResearchById(id: string) {
  const project = await sanityFetch<PortalResearchRecord | null>(portalResearchByIdQuery, {
    id,
  });
  return project ? mapPortalResearch(project) : null;
}

export async function getPortalFormSubmissions() {
  return (
    (await sanityFetch<PortalFormSubmission[]>(portalFormSubmissionsQuery)) ?? []
  );
}
