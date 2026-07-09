/**
 * Push non-empty variables from .env to Vercel (production, preview, development).
 * Usage: node scripts/push-vercel-env.mjs
 */
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const SENSITIVE = new Set([
  "SANITY_API_TOKEN",
  "STAFF_SESSION_SECRET",
  "STAFF_PORTAL_PASSWORD",
  "RAZORPAY_KEY_SECRET",
  "RAZORPAY_WEBHOOK_SECRET",
  "STRIPE_SECRET_KEY",
  "UPSTASH_REDIS_REST_TOKEN",
  "RESEND_API_KEY",
]);

const TARGETS = ["production", "preview", "development"];

const PRODUCTION_SITE_URL =
  process.env.DREAM_ACADEMY_PRODUCTION_URL ||
  "https://dreamacademy.drkpchandra.com";
const DEVELOPMENT_SITE_URL =
  process.env.DREAM_ACADEMY_DEVELOPMENT_URL || "http://localhost:3000";

/** Variables that should differ per Vercel environment. */
function resolveValue(key, target, vars) {
  if (key !== "NEXT_PUBLIC_SITE_URL") return vars[key];

  switch (target) {
    case "production":
      return PRODUCTION_SITE_URL;
    case "preview":
      // Preview deploys should use each deployment's VERCEL_URL at runtime.
      return process.env.DREAM_ACADEMY_PREVIEW_URL || "";
    case "development":
      return vars[key] || DEVELOPMENT_SITE_URL;
    default:
      return vars[key];
  }
}

function parseEnvFile(path) {
  const vars = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (value) vars[key] = value;
  }
  return vars;
}

function addEnv(key, value, target) {
  const args = [
    "env",
    "add",
    key,
    target,
    "--value",
    value,
    "--yes",
    "--non-interactive",
    "--force",
  ];
  if (SENSITIVE.has(key)) args.push("--sensitive");

  const result = spawnSync("vercel", args, {
    stdio: "pipe",
    encoding: "utf8",
    shell: process.platform === "win32",
  });

  if (result.status === 0) {
    console.log(`✓ ${key} → ${target}`);
    return true;
  }
  console.error(`✗ ${key} → ${target}: ${result.stderr?.trim() || result.stdout?.trim()}`);
  return false;
}

const vars = parseEnvFile(".env");

let ok = 0;
let fail = 0;

for (const target of TARGETS) {
  for (const [key, baseValue] of Object.entries(vars)) {
    const value = resolveValue(key, target, vars);
    if (!value) {
      console.log(`○ ${key} → ${target} (skipped)`);
      continue;
    }
    if (addEnv(key, value, target)) ok += 1;
    else fail += 1;
  }
}

console.log(`\nDone: ${ok} ok, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
