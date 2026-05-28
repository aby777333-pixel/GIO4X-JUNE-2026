// PKCE / OTP auth callback. Supabase email links land here with ?code=...
// We exchange the code for a session, then redirect to ?next= (or /).

import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "@gio4x/supabase";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/";
  const errorDescription = searchParams.get("error_description");

  if (errorDescription) {
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(errorDescription)}`,
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${origin}/auth/login?error=missing_code`,
    );
  }

  const supabase = createServerSupabaseClient(cookies());
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}/auth/login?error=${encodeURIComponent(error.message)}`,
    );
  }

  return NextResponse.redirect(`${origin}${next.startsWith("/") ? next : "/"}`);
}
