import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("DREAM Academy Portal")
    .items([
      S.listItem()
        .title("Site settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Camps & field reports")
        .schemaType("camp")
        .child(S.documentTypeList("camp").title("Camps")),
      S.listItem()
        .title("Events & programmes")
        .schemaType("event")
        .child(S.documentTypeList("event").title("Events")),
      S.listItem()
        .title("Blog & updates")
        .schemaType("blogPost")
        .child(S.documentTypeList("blogPost").title("Posts")),
      S.divider(),
      S.listItem()
        .title("Research projects")
        .schemaType("researchProject")
        .child(S.documentTypeList("researchProject").title("Projects")),
      S.listItem()
        .title("Publications")
        .schemaType("publication")
        .child(S.documentTypeList("publication").title("Publications")),
      S.divider(),
      S.listItem()
        .title("Trustees & team")
        .schemaType("trustee")
        .child(S.documentTypeList("trustee").title("People")),
      S.listItem()
        .title("Programme areas")
        .schemaType("focusArea")
        .child(S.documentTypeList("focusArea").title("What we do")),
    ]);
