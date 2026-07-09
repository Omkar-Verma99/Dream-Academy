"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireStaffSession } from "@/lib/auth/staff";
import { slugify, textToPortableText } from "@/lib/portal/document-builders";
import { sanityWriteClient } from "@/lib/sanity/write-client";

export interface PortalActionState {
  success: boolean;
  message: string;
  id?: string;
}

const researchStatuses = ["ongoing", "completed", "planned"] as const;

const researchSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens."),
  description: z.string().optional(),
  status: z.enum(researchStatuses),
  startDate: z.string().optional(),
  principalInvestigator: z.string().optional(),
  body: z.string().optional(),
});

export async function saveResearch(
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

  const parsed = researchSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug") || slugify(String(formData.get("title") ?? "")),
    description: formData.get("description") || undefined,
    status: formData.get("status"),
    startDate: formData.get("startDate") || undefined,
    principalInvestigator: formData.get("principalInvestigator") || undefined,
    body: formData.get("body") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }

  const data = parsed.data;
  const docId = data.id || `research-${data.slug}`;
  const body = textToPortableText(data.body);

  const document = {
    _id: docId,
    _type: "researchProject" as const,
    title: data.title,
    slug: { _type: "slug", current: data.slug },
    ...(data.description ? { description: data.description } : {}),
    status: data.status,
    ...(data.startDate ? { startDate: data.startDate } : {}),
    ...(data.principalInvestigator
      ? { principalInvestigator: data.principalInvestigator }
      : {}),
    ...(body ? { body } : {}),
  };

  await sanityWriteClient.createOrReplace(document);

  revalidatePath("/research");
  revalidatePath("/");
  revalidatePath("/portal/research");
  revalidatePath("/portal/dashboard");

  return {
    success: true,
    message: data.id ? "Research project updated." : "Research project created.",
    id: docId,
  };
}

export async function deleteResearch(projectId: string): Promise<PortalActionState> {
  await requireStaffSession();

  if (!sanityWriteClient) {
    return {
      success: false,
      message: "Sanity write access is not configured.",
    };
  }

  await sanityWriteClient.delete(projectId);

  revalidatePath("/research");
  revalidatePath("/portal/research");
  revalidatePath("/portal/dashboard");

  return { success: true, message: "Research project deleted." };
}
