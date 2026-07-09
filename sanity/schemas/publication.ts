import { defineField, defineType } from "sanity";

export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: ["paper", "abstract", "guideline", "chapter"],
      },
    }),
    defineField({ name: "authors", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "journal", type: "string" }),
    defineField({ name: "year", type: "number" }),
    defineField({ name: "volume", type: "string" }),
    defineField({ name: "doi", type: "string" }),
    defineField({ name: "pdfFile", type: "file" }),
    defineField({ name: "abstract", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "citation", type: "text" }),
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
