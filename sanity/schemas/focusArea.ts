import { defineField, defineType } from "sanity";

export const focusArea = defineType({
  name: "focusArea",
  title: "Focus Area",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "romanNumeral", type: "string" }),
    defineField({ name: "shortDescription", type: "text" }),
    defineField({ name: "fullContent", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "heroImage", type: "image" }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "ctaLabel", type: "string" }),
  ],
});
