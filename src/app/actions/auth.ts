"use server";

import { redirect } from "next/navigation";

import {
  clearStaffSession,
  isStaffEmailAllowed,
  setStaffSession,
  verifyStaffPassword,
} from "@/lib/auth/staff";

export interface AuthState {
  success: boolean;
  message: string;
}

export async function loginStaff(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  if (!process.env.STAFF_PORTAL_PASSWORD || !process.env.STAFF_SESSION_SECRET) {
    return {
      success: false,
      message:
        "Staff portal is not configured yet. Ask your administrator to set STAFF_PORTAL_PASSWORD and STAFF_ALLOWED_EMAILS in .env.",
    };
  }

  if (!isStaffEmailAllowed(email)) {
    return {
      success: false,
      message: "This email is not authorised for the staff portal.",
    };
  }

  if (!verifyStaffPassword(password)) {
    return { success: false, message: "Incorrect password." };
  }

  const remember = formData.get("remember") === "on";
  await setStaffSession(email, remember);
  redirect("/portal/dashboard");
}

export async function logoutStaff() {
  await clearStaffSession();
  redirect("/portal/login");
}
