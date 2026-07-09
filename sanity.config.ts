import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { structure } from "./sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "dream-academy",
  title: "DREAM Academy Portal",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});
