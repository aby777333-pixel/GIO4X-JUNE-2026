import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export type { Database, Json, Tables, TablesInsert, TablesUpdate, Enums } from "./types";
export { Constants } from "./types";
export type AppSupabaseClient = SupabaseClient<Database>;

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://tdifcayznqnaduchzfqz.supabase.co";

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

let browserClient: AppSupabaseClient | null = null;

export function getBrowserClient(): AppSupabaseClient {
  if (!browserClient) {
    browserClient = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, flowType: "pkce" },
    });
  }
  return browserClient;
}

// Server-side client. Pass the service-role key explicitly when you need
// to bypass RLS (e.g. webhook handlers). Falls back to the anon key for
// read-only server components.
export function getServerClient(serviceRoleKey?: string): AppSupabaseClient {
  return createClient<Database>(
    SUPABASE_URL,
    serviceRoleKey ?? SUPABASE_ANON_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
