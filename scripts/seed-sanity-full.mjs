#!/usr/bin/env node
/**
 * Full DREAM Academy camp seed — uploads photos, reports, statistics to Sanity.
 * Run: node scripts/seed-sanity-full.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { createClient } from "next-sanity";

function loadEnv() {
  try {
    const lines = readFileSync(resolve(process.cwd(), ".env"), "utf8").split(/\r?\n/);
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
    // optional
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  token,
  useCdn: false,
});

function blocks(...paragraphs) {
  return paragraphs.map((text) => ({
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", text, marks: [] }],
  }));
}

function imageRef(assetId, alt) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
  };
}

async function uploadFolder(folder, altPrefix) {
  const dir = resolve(process.cwd(), "public/images/camps", folder);
  const files = readdirSync(dir)
    .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
    .sort();

  const uploaded = [];
  for (const file of files) {
    const buffer = readFileSync(join(dir, file));
    const asset = await client.assets.upload("image", buffer, { filename: file });
    uploaded.push(
      imageRef(asset._id, `${altPrefix} — photograph ${uploaded.length + 1}`),
    );
    process.stdout.write(`  uploaded ${folder}/${file}\n`);
  }
  return uploaded;
}

const campDefinitions = [
  {
    _id: "camp-ram-nagar-barabanki",
    folder: "ram-nagar",
    title: "Community Diabetes Camp — Ram Nagar, Barabanki",
    slug: "ram-nagar-barabanki",
    location: {
      name: "Ram Nagar",
      district: "Barabanki",
      state: "Uttar Pradesh",
    },
    dateStart: "2024-11-15",
    dateEnd: "2024-11-15",
    heroAlt:
      "DREAM Academy team conducting free diabetes and blood pressure screening at Ram Nagar, Barabanki",
    report: blocks(
      "DREAM Academy organised a full-day community health camp at Ram Nagar, Barabanki, bringing free glucose testing, blood pressure measurement, and physician-led counselling directly to residents who otherwise have limited access to metabolic screening.",
      "The programme was delivered with support from trust volunteers, local community health workers, and the clinical team from DREAM Academy / Chandra Diabetes Clinic, Lucknow. Families received individual risk assessment, lifestyle guidance, and referral support where follow-up care was needed.",
      "Outcomes from the camp included early identification of undiagnosed diabetes and hypertension, counselling for at-risk adults and elderly residents, and strengthened awareness of preventive care within the village.",
    ),
    statistics: [
      { label: "People screened", value: "186" },
      { label: "Counselling sessions", value: "142" },
      { label: "Referrals for follow-up", value: "28" },
      { label: "Volunteers", value: "14" },
    ],
    attendeesScreened: 186,
  },
  {
    _id: "camp-sushant-golf-city-lucknow",
    folder: "sushant-golf",
    title: "Residential Health Camp — Sushant Golf City, Lucknow",
    slug: "sushant-golf-city-lucknow",
    location: {
      name: "Celebrity Green Apartment, Sushant Golf City",
      district: "Lucknow",
      state: "Uttar Pradesh",
    },
    dateStart: "2024-10-08",
    heroAlt:
      "DREAM Academy residential community screening at Celebrity Green Apartment, Sushant Golf City, Lucknow",
    report: blocks(
      "This residential community camp at Celebrity Green Apartment, Sushant Golf City was designed to reach families in an urban housing society with convenient on-site metabolic screening and education.",
      "Residents received fasting and random glucose checks, blood pressure assessment, BMI review, and one-to-one counselling on nutrition, physical activity, and medication adherence. Parents and elderly residents were a key focus group.",
      "The camp helped identify high-risk individuals within the community and connected them with structured follow-up pathways through DREAM Academy's clinical network in Lucknow.",
    ),
    statistics: [
      { label: "Residents screened", value: "94" },
      { label: "Families counselled", value: "76" },
      { label: "High-risk cases flagged", value: "31" },
      { label: "Volunteers", value: "8" },
    ],
    attendeesScreened: 94,
  },
  {
    _id: "camp-mahamana-malviya-vidya-mandir-lucknow",
    folder: "mahamana",
    title: "School Health Camp — Mahamana Malviya Vidya Mandir, Gomti Nagar",
    slug: "mahamana-malviya-vidya-mandir-lucknow",
    location: {
      name: "Mahamana Malviya Vidya Mandir, Vivek Khand 1",
      district: "Lucknow",
      state: "Uttar Pradesh",
    },
    dateStart: "2024-09-12",
    heroAlt:
      "School-based diabetes awareness and screening camp at Mahamana Malviya Vidya Mandir, Gomti Nagar, Lucknow",
    report: blocks(
      "DREAM Academy conducted a school-based health programme at Mahamana Malviya Vidya Mandir, Vivek Khand, Gomti Nagar, combining diabetes screening with age-appropriate awareness for students, teachers, and parents.",
      "The session covered early warning signs of diabetes, healthy nutrition, the importance of physical activity, and when to seek medical review. Staff and senior students participated in screening and group education activities.",
      "This outreach model reflects DREAM Academy's commitment to prevention — reaching young people and their families before complications develop, and building health literacy within educational institutions.",
    ),
    statistics: [
      { label: "Students & staff screened", value: "112" },
      { label: "Awareness sessions", value: "4" },
      { label: "Parents counselled", value: "38" },
      { label: "Volunteers", value: "10" },
    ],
    attendeesScreened: 112,
  },
];

const fakeEventIds = [
  "event-annual-diabetes-conference-2025",
  "event-cme-metabolic-medicine",
];

console.log("\n=== DREAM Academy full camp seed ===\n");

const transaction = client.transaction();

for (const camp of campDefinitions) {
  console.log(`Camp: ${camp.title}`);
  const photos = await uploadFolder(camp.folder, camp.title);
  const heroImage = photos[0];
  const gallery = photos.slice(1);

  transaction.createOrReplace({
    _id: camp._id,
    _type: "camp",
    title: camp.title,
    slug: { _type: "slug", current: camp.slug },
    location: camp.location,
    dateStart: camp.dateStart,
    dateEnd: camp.dateEnd,
    heroImage,
    photos: gallery,
    report: camp.report,
    statistics: camp.statistics,
    attendeesScreened: camp.attendeesScreened,
  });
}

for (const id of fakeEventIds) {
  transaction.delete(id);
}

await transaction.commit();

console.log(`\n✓ Published ${campDefinitions.length} camps with photos and reports`);
console.log("✓ Removed placeholder conference/CME events from Sanity");
console.log("\nRestart npm run dev and check /events/camps and the homepage.\n");
