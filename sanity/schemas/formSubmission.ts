import { defineField, defineType } from "sanity";

export const formSubmission = defineType({
  name: "formSubmission",
  title: "Form submission",
  type: "document",
  readOnly: true,
  fields: [
    defineField({
      name: "formType",
      title: "Form type",
      type: "string",
      options: {
        list: [
          { title: "Contact", value: "contact" },
          { title: "Volunteer", value: "volunteer" },
          { title: "Newsletter", value: "newsletter" },
          { title: "Donation", value: "donation" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "pan", title: "PAN", type: "string" }),
    defineField({ name: "subject", title: "Subject", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", rows: 4 }),
    defineField({ name: "background", title: "Background", type: "string" }),
    defineField({ name: "amount", title: "Amount (INR)", type: "number" }),
    defineField({
      name: "frequency",
      title: "Frequency",
      type: "string",
      options: {
        list: [
          { title: "One-time", value: "one-time" },
          { title: "Monthly", value: "monthly" },
        ],
      },
    }),
    defineField({
      name: "payload",
      title: "Raw payload",
      type: "text",
      rows: 6,
      description: "Full submitted data as JSON (backup).",
    }),
  ],
  orderings: [
    {
      title: "Submitted (newest)",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      formType: "formType",
      name: "name",
      email: "email",
      submittedAt: "submittedAt",
    },
    prepare({ formType, name, email, submittedAt }) {
      const title = name || email || "Anonymous";
      const date = submittedAt
        ? new Date(submittedAt).toLocaleString("en-IN")
        : "";
      return {
        title: `${formType ?? "form"} — ${title}`,
        subtitle: date,
      };
    },
  },
});
