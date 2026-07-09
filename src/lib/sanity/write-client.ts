import "server-only";

import { createClient } from "next-sanity";

import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "./env";

const token = process.env.SANITY_API_TOKEN;

export const isSanityWriteConfigured = Boolean(
  sanityProjectId && token,
);

export const sanityWriteClient = isSanityWriteConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      token,
      useCdn: false,
    })
  : null;
