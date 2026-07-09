#!/usr/bin/env node
/**
 * Verifies SANITY_API_TOKEN matches NEXT_PUBLIC_SANITY_PROJECT_ID.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

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
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env");
  process.exit(1);
}

if (!token) {
  console.error("Missing SANITY_API_TOKEN in .env");
  process.exit(1);
}

const query = encodeURIComponent('count(*[_type == "sanity.imageAsset"])');
const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

const res = await fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
});

if (!res.ok) {
  const body = await res.json().catch(() => ({}));
  console.error(`Token check failed for project "${projectId}" (${res.status}).`);
  if (body.errorCode === "SIO-401-AWH") {
    console.error(
      "The token was created for a different Sanity project. Open https://www.sanity.io/manage, select DREAM Academy (r7loshm7), then API → Tokens → Add API token → Editor.",
    );
  } else if (body.message) {
    console.error(body.message);
  }
  process.exit(1);
}

const data = await res.json();
console.log(`OK — token works for project ${projectId} (dataset: ${dataset}).`);
