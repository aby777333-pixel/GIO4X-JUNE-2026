import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export type { Database } from "./types";
export type AppSupabaseClient = SupabaseClient<Database>;

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://tdifcayznqnaduchzfqz.supabase.co";

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

let browserClient: AppSupabaseClient | null = null;

export function getBrowserClient(): AppSupabaseClient {
  if (!browserClient) {
    browserClient = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return browserClient;
}

export function getServerClient(serviceRoleKey?: string): AppSupabaseClient {
  return createClient<Database>(
    SUPABASE_URL,
    serviceRoleKey ?? SUPABASE_ANON_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
