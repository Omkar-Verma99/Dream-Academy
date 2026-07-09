import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  createSessionToken,
  staffSessionCookie,
  verifySessionToken,
} from "./session";

export function getAllowedStaffEmails(): string[] {
  const raw = process.env.STAFF_ALLOWED_EMAILS ?? "";
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isStaffEmailAllowed(email: string): boolean {
  const allowed = getAllowedStaffEmails();
  if (!allowed.length) return false;
  return allowed.includes(email.trim().toLowerCase());
}

export function verifyStaffPassword(password: string): boolean {
  const expected = process.env.STAFF_PORTAL_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export async function getStaffSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(staffSessionCookie.name)?.value;
  return verifySessionToken(token);
}

export async function requireStaffSession() {
  const session = await getStaffSession();
  if (!session) {
    redirect("/portal/login");
  }
  return session;
}

export async function setStaffSession(email: string, remember = false) {
  const maxAgeSeconds = remember ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60;
  const token = await createSessionToken(email, maxAgeSeconds * 1000);
  const cookieStore = await cookies();
  cookieStore.set(staffSessionCookie.name, token, {
    ...staffSessionCookie.options,
    maxAge: maxAgeSeconds,
  });
}

export async function clearStaffSession() {
  const cookieStore = await cookies();
  cookieStore.delete(staffSessionCookie.name);
}
