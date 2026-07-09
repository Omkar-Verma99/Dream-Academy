import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", title: "Site Name" }),
    defineField({ name: "tagline", type: "string", title: "Tagline" }),
    defineField({ name: "logo", type: "image", title: "Logo" }),
    defineField({ name: "contactAddress", type: "text", title: "Contact Address" }),
    defineField({ name: "contactEmail", type: "string", title: "Contact Email" }),
    defineField({
      name: "contactPhones",
      type: "array",
      of: [{ type: "string" }],
      title: "Contact Phones",
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "registrationNumbers",
      type: "object",
      fields: [
        { name: "trustDeed", type: "string" },
        { name: "panNumber", type: "string" },
        { name: "section12A", type: "string" },
        { name: "section80G", type: "string" },
        { name: "csrNumber", type: "string" },
      ],
    }),
    defineField({
      name: "impactStats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "value", type: "string" },
            { name: "order", type: "number" },
          ],
        },
      ],
    }),
  ],
});
