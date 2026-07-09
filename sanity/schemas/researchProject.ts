import { defineField, defineType } from "sanity";

export const researchProject = defineType({
  name: "researchProject",
  title: "Research project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Ongoing", value: "ongoing" },
          { title: "Completed", value: "completed" },
          { title: "Planned", value: "planned" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "principalInvestigator", type: "string" }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status" },
  },
});
