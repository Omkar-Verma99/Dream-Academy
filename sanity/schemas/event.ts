import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Conference", value: "conference" },
          { title: "CME", value: "cme" },
          { title: "Webinar", value: "webinar" },
          { title: "Health camp", value: "camp" },
          { title: "Campaign", value: "campaign" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "startDateTime",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({ name: "endDateTime", type: "datetime" }),
    defineField({ name: "venue", type: "string" }),
    defineField({ name: "virtual", type: "boolean", initialValue: false }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "registrationUrl", type: "url" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Show on homepage",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "type", media: "coverImage" },
  },
});
