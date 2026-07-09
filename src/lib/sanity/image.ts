import createImageUrlBuilder from "@sanity/image-url";

import { sanityDataset, sanityProjectId } from "./env";

const builder = createImageUrlBuilder({
  projectId: sanityProjectId || "placeholder",
  dataset: sanityDataset,
});

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
