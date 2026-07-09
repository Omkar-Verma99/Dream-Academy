"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireStaffSession } from "@/lib/auth/staff";
import {
  fileReference,
  imageReference,
  slugify,
  textToPortableText,
} from "@/lib/portal/document-builders";
import { sanityWriteClient } from "@/lib/sanity/write-client";

export interface PortalActionState {
  success: boolean;
  message: string;
  id?: string;
}

const campSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens."),
  locationName: z.string().min(2, "Location name is required."),
  district: z.string().min(2, "District is required."),
  state: z.string().min(2, "State is required."),
  dateStart: z.string().min(1, "Start date is required."),
  dateEnd: z.string().optional(),
  report: z.string().optional(),
  video: z
    .string()
    .optional()
    .transform((value) => value?.trim() || undefined)
    .refine((value) => !value || /^https?:\/\//.test(value), {
      message: "Video must be a valid URL.",
    }),
});

async function uploadImage(file: File): Promise<string | null> {
  if (!file?.size || !sanityWriteClient) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await sanityWriteClient.assets.upload("image", buffer, {
    filename: file.name,
    contentType: file.type || "image/jpeg",
  });
  return asset._id;
}

async function uploadVideo(file: File): Promise<string | null> {
  if (!file?.size || !sanityWriteClient) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await sanityWriteClient.assets.upload("file", buffer, {
    filename: file.name,
    contentType: file.type || "video/mp4",
  });
  return asset._id;
}

export async function saveCamp(
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

  const parsed = campSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug") || slugify(String(formData.get("title") ?? "")),
    locationName: formData.get("locationName"),
    district: formData.get("district"),
    state: formData.get("state"),
    dateStart: formData.get("dateStart"),
    dateEnd: formData.get("dateEnd") || undefined,
    report: formData.get("report") || undefined,
    video: formData.get("video") || undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }

  const data = parsed.data;
  const docId = data.id || `camp-${data.slug}`;

  const existing = data.id
    ? await sanityWriteClient.fetch<{
        heroImage?: { asset?: { _ref?: string } };
        photos?: Array<{ asset?: { _ref?: string }; alt?: string; caption?: string }>;
        galleryVideos?: Array<{ asset?: { _ref?: string }; caption?: string }>;
      } | null>(`*[_type == "camp" && _id == $id][0]{ heroImage, photos, galleryVideos }`, {
        id: data.id,
      })
    : null;

  const heroFile = formData.get("heroImage");
  let heroImage = existing?.heroImage;
  if (heroFile instanceof File && heroFile.size > 0) {
    const assetId = await uploadImage(heroFile);
    if (assetId) {
      heroImage = imageReference(assetId, data.title);
    }
  }

  const galleryFiles = formData.getAll("photos").filter(
    (entry): entry is File => entry instanceof File && entry.size > 0,
  );

  const newPhotos = [];
  for (const file of galleryFiles) {
    const assetId = await uploadImage(file);
    if (assetId) {
      newPhotos.push(imageReference(assetId, data.title));
    }
  }

  const photos = [...(existing?.photos ?? []), ...newPhotos];

  const galleryVideoFiles = formData.getAll("galleryVideos").filter(
    (entry): entry is File => entry instanceof File && entry.size > 0,
  );

  const newGalleryVideos = [];
  for (const file of galleryVideoFiles) {
    const assetId = await uploadVideo(file);
    if (assetId) {
      newGalleryVideos.push(fileReference(assetId, data.title));
    }
  }

  const galleryVideos = [...(existing?.galleryVideos ?? []), ...newGalleryVideos];

  const document = {
    _id: docId,
    _type: "camp" as const,
    title: data.title,
    slug: { _type: "slug", current: data.slug },
    location: {
      name: data.locationName,
      district: data.district,
      state: data.state,
    },
    dateStart: data.dateStart,
    ...(data.dateEnd ? { dateEnd: data.dateEnd } : {}),
    ...(heroImage ? { heroImage } : {}),
    ...(photos.length ? { photos } : {}),
    ...(galleryVideos.length ? { galleryVideos } : {}),
    ...(data.video ? { video: data.video } : {}),
    ...(textToPortableText(data.report)
      ? { report: textToPortableText(data.report) }
      : {}),
  };

  await sanityWriteClient.createOrReplace(document);

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/events/camps");
  revalidatePath(`/events/camps/${data.slug}`);
  revalidatePath("/portal/camps");
  revalidatePath("/portal/dashboard");

  return {
    success: true,
    message: data.id ? "Camp updated and published." : "Camp created and published.",
    id: docId,
  };
}

export async function deleteCamp(campId: string): Promise<PortalActionState> {
  await requireStaffSession();

  if (!sanityWriteClient) {
    return {
      success: false,
      message: "Sanity write access is not configured.",
    };
  }

  await sanityWriteClient.delete(campId);

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/events/camps");
  revalidatePath("/portal/camps");
  revalidatePath("/portal/dashboard");

  return { success: true, message: "Camp deleted." };
}
