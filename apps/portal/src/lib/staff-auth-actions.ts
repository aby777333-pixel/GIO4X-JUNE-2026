"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@gio4x/supabase";

// ---------------------------------------------------------------------------
// Staff portal auth — a single SHARED username + password (env-configured)
// gates the staff console. On success we sign into a designated backing
// staff/admin Supabase account, so every existing /staff page keeps reading
// data under the same RLS-bound session it always has (nothing about staff
// data access changes — only the human-facing login does).
//
// Env (server-only):
//   STAFF_PORTAL_USERNAME          — the shared username staff type
//   STAFF_PORTAL_PASSWORD          — the shared password staff type
//   STAFF_PORTAL_ACCOUNT_EMAIL     — backing Supabase staff/admin email
//   STAFF_PORTAL_ACCOUNT_PASSWORD  — backing Supabase staff/admin password
// ---------------------------------------------------------------------------

export type StaffAuthResult = { ok: true; redirectTo?: string } | { ok: false; error: string };

// Length-independent, branch-light comparison to avoid trivial timing oracles.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

export async function staffSignIn(formData: FormData): Promise<StaffAuthResult> {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  if (!username || !password) {
    return { ok: false, error: "Username and password are required." };
  }

  const expectedUser = process.env.STAFF_PORTAL_USERNAME ?? "";
  const expectedPass = process.env.STAFF_PORTAL_PASSWORD ?? "";
  const backingEmail = process.env.STAFF_PORTAL_ACCOUNT_EMAIL ?? "";
  const backingPass = process.env.STAFF_PORTAL_ACCOUNT_PASSWORD ?? "";

  if (!expectedUser || !expectedPass || !backingEmail || !backingPass) {
    return {
      ok: false,
      error: "Staff portal is not configured yet. Please contact an administrator.",
    };
  }

  // Validate the shared credential (constant-ish time on both fields).
  const userOk = safeEqual(username, expectedUser);
  const passOk = safeEqual(password, expectedPass);
  if (!userOk || !passOk) {
    return { ok: false, error: "Invalid staff username or password." };
  }

  // Establish the backing staff Supabase session so RLS-bound pages work.
  const supabase = createServerSupabaseClient(cookies());
  const { data, error } = await supabase.auth.signInWithPassword({
    email: backingEmail,
    password: backingPass,
  });
  if (error || !data.user) {
    return {
      ok: false,
      error: "Staff portal sign-in failed. The backing account is misconfigured.",
    };
  }

  // Defense in depth: the backing account must really be staff/admin.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();
  const role = profile?.role;
  if (role !== "staff" && role !== "admin") {
    await supabase.auth.signOut();
    return { ok: false, error: "The backing account is not a staff/admin user." };
  }

  revalidatePath("/staff", "layout");
  return { ok: true, redirectTo: "/staff" };
}

export async function staffSignOut(): Promise<void> {
  const supabase = createServerSupabaseClient(cookies());
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/staff/login");
}
