"use client";

import { useActionState, useState } from "react";

import { saveCamp, type PortalActionState } from "@/app/actions/portal/camps";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/portal/document-builders";
import type { PortalCampDetail } from "@/lib/portal/data";
import { blocksToParagraphs } from "@/lib/sanity/mappers";

const initialState: PortalActionState = { success: false, message: "" };

type CampFormProps = {
  camp?: PortalCampDetail;
};

export function CampForm({ camp }: CampFormProps) {
  const [state, formAction, pending] = useActionState(saveCamp, initialState);
  const [slug, setSlug] = useState(camp?.slug ?? "");
  const reportText = camp?.report ? blocksToParagraphs(camp.report).join("\n\n") : "";

  return (
    <form action={formAction} className="surface-card space-y-6 p-8" encType="multipart/form-data">
      {camp?._id ? <input type="hidden" name="id" value={camp._id} /> : null}

      <div>
        <h2 className="text-h3 font-medium">{camp ? "Edit camp" : "New camp"}</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Add camp details, upload a hero image and gallery media, and publish to the website.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="camp-title" className="block text-sm font-medium text-ink">
            Camp title
          </label>
          <input
            id="camp-title"
            name="title"
            type="text"
            required
            defaultValue={camp?.title}
            className="input-field mt-2"
            onBlur={(event) => {
              if (!slug) setSlug(slugify(event.target.value));
            }}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="camp-slug" className="block text-sm font-medium text-ink">
            URL slug
          </label>
          <input
            id="camp-slug"
            name="slug"
            type="text"
            required
            value={slug}
            onChange={(event) => setSlug(slugify(event.target.value))}
            className="input-field mt-2"
          />
          <p className="mt-1 text-xs text-ink-muted">
            Public URL: /events/camps/{slug || "your-slug"}
          </p>
        </div>

        <div>
          <label htmlFor="camp-location" className="block text-sm font-medium text-ink">
            Location name
          </label>
          <input
            id="camp-location"
            name="locationName"
            type="text"
            required
            defaultValue={camp?.location.name}
            className="input-field mt-2"
          />
        </div>

        <div>
          <label htmlFor="camp-district" className="block text-sm font-medium text-ink">
            District
          </label>
          <input
            id="camp-district"
            name="district"
            type="text"
            required
            defaultValue={camp?.location.district}
            className="input-field mt-2"
          />
        </div>

        <div>
          <label htmlFor="camp-state" className="block text-sm font-medium text-ink">
            State
          </label>
          <input
            id="camp-state"
            name="state"
            type="text"
            required
            defaultValue={camp?.location.state ?? "Uttar Pradesh"}
            className="input-field mt-2"
          />
        </div>

        <div>
          <label htmlFor="camp-date-start" className="block text-sm font-medium text-ink">
            Start date
          </label>
          <input
            id="camp-date-start"
            name="dateStart"
            type="date"
            required
            defaultValue={camp?.dateStart}
            className="input-field mt-2"
          />
        </div>

        <div>
          <label htmlFor="camp-date-end" className="block text-sm font-medium text-ink">
            End date (optional)
          </label>
          <input
            id="camp-date-end"
            name="dateEnd"
            type="date"
            defaultValue={camp?.dateEnd}
            className="input-field mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="camp-video" className="block text-sm font-medium text-ink">
            Video URL (YouTube, etc.)
          </label>
          <input
            id="camp-video"
            name="video"
            type="url"
            defaultValue={camp?.video}
            placeholder="https://"
            className="input-field mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="camp-hero" className="block text-sm font-medium text-ink">
            Hero image
          </label>
          {camp?.heroImage?.asset?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={camp.heroImage.asset.url}
              alt={camp.heroImage.alt ?? camp.title}
              className="mt-2 max-h-48 rounded-xl object-cover"
            />
          ) : null}
          <input
            id="camp-hero"
            name="heroImage"
            type="file"
            accept="image/*"
            className="input-field mt-2"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="camp-photos" className="block text-sm font-medium text-ink">
            Gallery — photos
          </label>
          {camp?.photos?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {camp.photos.map((photo, index) =>
                photo.asset?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${photo.asset.url}-${index}`}
                    src={photo.asset.url}
                    alt={photo.alt ?? `Camp photo ${index + 1}`}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                ) : null,
              )}
            </div>
          ) : null}
          <input
            id="camp-photos"
            name="photos"
            type="file"
            accept="image/*"
            multiple
            className="input-field mt-2"
          />
          <p className="mt-1 text-xs text-ink-muted">
            Select multiple images. New uploads are added to the existing gallery.
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="camp-gallery-videos" className="block text-sm font-medium text-ink">
            Gallery — videos
          </label>
          {camp?.galleryVideos?.length ? (
            <ul className="mt-2 space-y-1 text-xs text-ink-muted">
              {camp.galleryVideos.map((video, index) =>
                video.asset?.url ? (
                  <li key={`${video.asset.url}-${index}`}>
                    Video {index + 1} uploaded
                  </li>
                ) : null,
              )}
            </ul>
          ) : null}
          <input
            id="camp-gallery-videos"
            name="galleryVideos"
            type="file"
            accept="video/*"
            multiple
            className="input-field mt-2"
          />
          <p className="mt-1 text-xs text-ink-muted">
            Upload MP4 or other video files. You can also paste a YouTube link above.
          </p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="camp-report" className="block text-sm font-medium text-ink">
            Field report
          </label>
          <textarea
            id="camp-report"
            name="report"
            rows={8}
            defaultValue={reportText}
            className="input-field mt-2 min-h-[180px]"
            placeholder="Write the camp report. Separate paragraphs with a blank line."
          />
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
          {pending ? "Publishing…" : camp ? "Update camp" : "Publish camp"}
        </Button>
        <Button href="/portal/camps" variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
