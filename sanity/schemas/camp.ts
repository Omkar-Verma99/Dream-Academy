import { defineField, defineType } from "sanity";

export const camp = defineType({
  name: "camp",
  title: "Camp",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "location",
      type: "object",
      fields: [
        { name: "name", type: "string" },
        { name: "district", type: "string" },
        { name: "state", type: "string" },
        { name: "geoPoint", type: "geopoint" },
      ],
    }),
    defineField({ name: "dateStart", type: "date" }),
    defineField({ name: "dateEnd", type: "date" }),
    defineField({ name: "heroImage", type: "image" }),
    defineField({
      name: "photos",
      type: "array",
      of: [
        {
          type: "image",
          fields: [{ name: "caption", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "galleryVideos",
      type: "array",
      of: [
        {
          type: "file",
          options: { accept: "video/*" },
          fields: [{ name: "caption", type: "string" }],
        },
      ],
    }),
    defineField({ name: "video", type: "url", title: "Video link (YouTube, etc.)" }),
    defineField({ name: "report", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "teamMembers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "trustee" }] }],
    }),
    defineField({ name: "attendeesScreened", type: "number" }),
    defineField({
      name: "seoMeta",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
      ],
    }),
  ],
});
