#!/usr/bin/env node
/**
 * Seeds baseline DREAM Academy content into Sanity (text-only camps/events/blog).
 * Loads variables from .env in the project root.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "next-sanity";

function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), ".env");
    const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env optional if vars already exported
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env");
  process.exit(1);
}

if (!token) {
  console.error(
    "Missing SANITY_API_TOKEN. Create an Editor token at https://www.sanity.io/manage → API → Tokens",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  token,
  useCdn: false,
});

const camps = [
  {
    _id: "camp-ram-nagar-barabanki",
    _type: "camp",
    title: "Camp at Ram Nagar, Barabanki",
    slug: { _type: "slug", current: "ram-nagar-barabanki" },
    location: {
      name: "Ram Nagar",
      district: "Barabanki",
      state: "Uttar Pradesh",
    },
    dateStart: "2024-11-15",
    dateEnd: "2024-11-15",
  },
  {
    _id: "camp-sushant-golf-city-lucknow",
    _type: "camp",
    title: "Camp at Celebrity Green Apartment, Sushant Golf City",
    slug: { _type: "slug", current: "sushant-golf-city-lucknow" },
    location: {
      name: "Celebrity Green Apartment, Sushant Golf City",
      district: "Lucknow",
      state: "Uttar Pradesh",
    },
    dateStart: "2024-10-08",
  },
  {
    _id: "camp-mahamana-malviya-vidya-mandir-lucknow",
    _type: "camp",
    title: "Camp at Mahamana Malviya Vidya Mandir, Vivek Khand, Gomti Nagar",
    slug: { _type: "slug", current: "mahamana-malviya-vidya-mandir-lucknow" },
    location: {
      name: "Mahamana Malviya Vidya Mandir, Vivek Khand 1",
      district: "Lucknow",
      state: "Uttar Pradesh",
    },
    dateStart: "2024-09-12",
  },
];

const events = [
  {
    _id: "event-annual-diabetes-conference-2025",
    _type: "event",
    title: "Annual Diabetes Awareness Conference",
    slug: { _type: "slug", current: "annual-diabetes-conference-2025" },
    type: "conference",
    startDateTime: "2025-11-14T09:00:00+05:30",
    description:
      "A full-day programme on advances in diabetes care, research, and community outreach.",
    registrationUrl: "/events#annual-diabetes-conference-2025",
    featured: true,
  },
  {
    _id: "event-cme-metabolic-medicine",
    _type: "event",
    title: "CME: Metabolic Medicine for Primary Care",
    slug: { _type: "slug", current: "cme-metabolic-medicine" },
    type: "cme",
    startDateTime: "2025-09-20T10:00:00+05:30",
    description:
      "Continuing medical education for physicians managing obesity and metabolic disorders.",
    registrationUrl: "/academy#certificate-courses",
    featured: true,
  },
];

const transaction = client.transaction();
for (const doc of [...camps, ...events]) {
  transaction.createOrReplace(doc);
}

await transaction.commit();
console.log(`Seeded ${camps.length} camps and ${events.length} events to Sanity.`);
