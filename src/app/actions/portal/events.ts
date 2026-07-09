"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireStaffSession } from "@/lib/auth/staff";
import { slugify } from "@/lib/portal/document-builders";
import { sanityWriteClient } from "@/lib/sanity/write-client";

export interface PortalActionState {
  success: boolean;
  message: string;
  id?: string;
}

const eventTypes = [
  "conference",
  "cme",
  "webinar",
  "camp",
  "campaign",
] as const;

const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens."),
  type: z.enum(eventTypes),
  startDateTime: z.string().min(1, "Start date and time are required."),
  endDateTime: z.string().optional(),
  venue: z.string().optional(),
  virtual: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  description: z.string().optional(),
  registrationUrl: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined),
  featured: z
    .string()
    .optional()
    .transform((value) => value === "true"),
});

export async function saveEvent(
  _prevState: PortalActionState,
  formData: FormData,
): Promise<PortalActionState> {
  await requireStaffSession();

  if (!sanityWriteClient) {
    return {
      success: false,
      message: "Sanity write access is not configured (SANITY_API_TOKEN missing).",
    };
  }

  const parsed = eventSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug") || slugify(String(formData.get("title") ?? "")),
    type: formData.get("type"),
    startDateTime: formData.get("startDateTime"),
    endDateTime: formData.get("endDateTime") || undefined,
    venue: formData.get("venue") || undefined,
    virtual: formData.get("virtual"),
    description: formData.get("description") || undefined,
    registrationUrl: formData.get("registrationUrl") || undefined,
    featured: formData.get("featured"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }

  const data = parsed.data;
  const docId = data.id || `event-${data.slug}`;

  const toSanityDatetime = (value: string) => {
    if (value.includes("+") || value.endsWith("Z")) return value;
    return `${value}:00+05:30`;
  };

  const document = {
    _id: docId,
    _type: "event" as const,
    title: data.title,
    slug: { _type: "slug", current: data.slug },
    type: data.type,
    startDateTime: toSanityDatetime(data.startDateTime),
    ...(data.endDateTime ? { endDateTime: toSanityDatetime(data.endDateTime) } : {}),
    ...(data.venue ? { venue: data.venue } : {}),
    virtual: data.virtual ?? false,
    ...(data.description ? { description: data.description } : {}),
    ...(data.registrationUrl ? { registrationUrl: data.registrationUrl } : {}),
    featured: data.featured ?? true,
  };

  await sanityWriteClient.createOrReplace(document);

  revalidatePath("/events");
  revalidatePath("/");
  revalidatePath("/portal/events");
  revalidatePath("/portal/dashboard");

  return {
    success: true,
    message: data.id ? "Event updated and published." : "Event created and published.",
    id: docId,
  };
}

export async function deleteEvent(eventId: string): Promise<PortalActionState> {
  await requireStaffSession();

  if (!sanityWriteClient) {
    return {
      success: false,
      message: "Sanity write access is not configured.",
    };
  }

  await sanityWriteClient.delete(eventId);

  revalidatePath("/events");
  revalidatePath("/portal/events");
  revalidatePath("/portal/dashboard");

  return { success: true, message: "Event deleted." };
}
