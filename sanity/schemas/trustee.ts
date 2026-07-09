import { defineField, defineType } from "sanity";

export const trustee = defineType({
  name: "trustee",
  title: "Trustee",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "credentials", type: "string" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "order", type: "number" }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Founder", value: "founder" },
          { title: "Trustee", value: "trustee" },
          { title: "Advisor", value: "advisor" },
          { title: "Staff", value: "staff" },
        ],
      },
    }),
  ],
});
