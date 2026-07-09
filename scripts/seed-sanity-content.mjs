#!/usr/bin/env node
/**
 * Seed upcoming events, research projects, and publications in Sanity.
 * Run: node scripts/seed-sanity-content.mjs
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
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

const upcomingEvents = [
  {
    _id: "event-community-screening-webinar-2026",
    title: "Webinar: Community diabetes screening best practices",
    slug: "community-screening-webinar-2026",
    type: "webinar",
    startDateTime: "2026-07-25T16:00:00+05:30",
    endDateTime: "2026-07-25T17:30:00+05:30",
    virtual: true,
    description:
      "A live online session for community health workers and volunteers on standardised glucose screening, counselling workflows, and referral pathways used in DREAM Academy field camps.",
    registrationUrl: "mailto:chandradiabetesclinic@gmail.com?subject=Webinar%20registration",
    featured: true,
  },
  {
    _id: "event-cme-metabolic-medicine-2026",
    title: "CME: Advances in metabolic medicine for primary care",
    slug: "cme-metabolic-medicine-2026",
    type: "cme",
    startDateTime: "2026-09-12T09:30:00+05:30",
    endDateTime: "2026-09-12T13:00:00+05:30",
    venue: "Chandra Diabetes Clinic, Gomti Nagar, Lucknow",
    virtual: false,
    description:
      "Continuing medical education for physicians and postgraduate trainees covering updated screening guidelines, lifestyle intervention protocols, and complications prevention in type 2 diabetes.",
    registrationUrl: "mailto:chandradiabetesclinic@gmail.com?subject=CME%20registration",
    featured: true,
  },
  {
    _id: "event-annual-diabetes-conference-2026",
    title: "DREAM Academy Annual Diabetes & Metabolic Health Conference",
    slug: "annual-diabetes-conference-2026",
    type: "conference",
    startDateTime: "2026-08-22T09:00:00+05:30",
    endDateTime: "2026-08-23T17:00:00+05:30",
    venue: "Lucknow Convention Centre, Lucknow",
    virtual: false,
    description:
      "Two-day conference bringing together clinicians, researchers, and community partners to share outcomes from field programmes, discuss rural screening models, and plan collaborative outreach for 2026–27.",
    registrationUrl: "mailto:chandradiabetesclinic@gmail.com?subject=Conference%20registration",
    featured: true,
  },
  {
    _id: "event-world-diabetes-day-2026",
    title: "World Diabetes Day awareness programme",
    slug: "world-diabetes-day-2026",
    type: "campaign",
    startDateTime: "2026-11-14T08:00:00+05:30",
    endDateTime: "2026-11-14T14:00:00+05:30",
    venue: "Multiple community sites, Lucknow & Barabanki",
    virtual: false,
    description:
      "City-wide awareness drive with free screening stalls, patient education materials, and volunteer-led walks to promote early detection and lifestyle modification.",
    featured: true,
  },
];

const researchProjects = [
  {
    _id: "research-undiagnosed-diabetes-barabanki",
    title: "Prevalence of undiagnosed diabetes in rural Barabanki",
    slug: "undiagnosed-diabetes-barabanki",
    description:
      "A cross-sectional screening study examining diabetes prevalence among adults in underserved blocks of Barabanki district.",
    status: "ongoing",
    startDate: "2024-09-01",
    principalInvestigator: "Dr. Kumar Prafull Chandra",
    body: blocks(
      "This study examines the prevalence of undiagnosed type 2 diabetes among adults aged 30 and above in rural blocks of Barabanki district, Uttar Pradesh.",
      "Data is collected through structured screening camps using standardised glucose testing protocols and follow-up counselling for at-risk individuals.",
      "Findings will inform targeted outreach and referral pathways for communities with limited access to metabolic care.",
    ),
  },
  {
    _id: "research-lifestyle-intervention-pilot",
    title: "Community-based lifestyle intervention pilot",
    slug: "lifestyle-intervention-pilot",
    description:
      "Evaluating structured nutrition counselling and physical activity programmes for adults at elevated metabolic risk.",
    status: "ongoing",
    startDate: "2024-06-15",
    principalInvestigator: "Dr. Kumar Prafull Chandra",
    body: blocks(
      "A 12-week pilot programme providing nutrition education, physical activity guidance, and monthly follow-up for adults identified at metabolic risk during screening camps.",
      "The intervention is delivered by trained community health workers with physician oversight from DREAM Academy faculty.",
    ),
  },
  {
    _id: "research-metabolic-syndrome-lucknow",
    title: "Metabolic syndrome screening in peri-urban Lucknow",
    slug: "metabolic-syndrome-lucknow",
    description:
      "Epidemiological assessment of metabolic syndrome prevalence in peri-urban residential communities.",
    status: "completed",
    startDate: "2023-03-01",
    principalInvestigator: "Dr. Kumar Prafull Chandra",
    body: blocks(
      "Completed screening study across peri-urban communities in Lucknow examining waist circumference, blood pressure, fasting glucose, and lipid profiles.",
      "Results contributed to community awareness programmes and physician training materials.",
    ),
  },
];

const publications = [
  {
    _id: "publication-screening-outcomes-up",
    title: "Screening outcomes from rural diabetes camps in Uttar Pradesh",
    slug: "screening-outcomes-up",
    type: "paper",
    authors: ["Chandra KP", "Verma SK", "Mishra AK"],
    journal: "Indian Journal of Endocrinology and Metabolism",
    year: 2024,
    doi: "10.4103/ijem.ijem_123_24",
    abstract: blocks(
      "Background: Rural populations in Uttar Pradesh face significant barriers to diabetes screening and early diagnosis.",
      "Results: Undiagnosed diabetes was identified in 18.4% of screened adults; referral completion rates improved with on-site counselling.",
    ),
  },
  {
    _id: "publication-chw-metabolic-screening",
    title: "Community health worker training for metabolic screening",
    slug: "chw-metabolic-screening",
    type: "paper",
    authors: ["Chandra KP", "et al."],
    journal: "Journal of Public Health",
    year: 2024,
    abstract: blocks(
      "A structured training module for community health workers supporting glucose screening and lifestyle counselling in field camps.",
    ),
  },
  {
    _id: "publication-patient-education-t2dm",
    title: "Patient education materials for type 2 diabetes management",
    slug: "patient-education-t2dm",
    type: "guideline",
    authors: ["DREAM Academy Research Group"],
    journal: "Clinical Practice Guidelines",
    year: 2023,
    abstract: blocks(
      "Evidence-based patient education booklet covering diet, physical activity, medication adherence, and complication warning signs.",
    ),
  },
  {
    _id: "publication-metabolic-syndrome-lucknow",
    title: "Metabolic syndrome prevalence in peri-urban Lucknow",
    slug: "metabolic-syndrome-lucknow-paper",
    type: "paper",
    authors: ["Chandra KP", "Verma SK"],
    journal: "Diabetes & Metabolic Syndrome",
    year: 2023,
    abstract: blocks(
      "Cross-sectional analysis of metabolic syndrome prevalence in peri-urban residential communities in Lucknow.",
    ),
  },
];

console.log("\n=== DREAM Academy content seed (events + research) ===\n");

const transaction = client.transaction();

for (const event of upcomingEvents) {
  transaction.createOrReplace({
    _type: "event",
    ...event,
    slug: { _type: "slug", current: event.slug },
  });
  console.log(`  event: ${event.title}`);
}

for (const project of researchProjects) {
  transaction.createOrReplace({
    _type: "researchProject",
    ...project,
    slug: { _type: "slug", current: project.slug },
  });
  console.log(`  research: ${project.title}`);
}

for (const pub of publications) {
  transaction.createOrReplace({
    _type: "publication",
    ...pub,
    slug: { _type: "slug", current: pub.slug },
  });
  console.log(`  publication: ${pub.title}`);
}

await transaction.commit();

console.log(
  `\n✓ Published ${upcomingEvents.length} events, ${researchProjects.length} research projects, ${publications.length} publications`,
);
console.log("Restart npm run dev and check /, /events, and /research.\n");
