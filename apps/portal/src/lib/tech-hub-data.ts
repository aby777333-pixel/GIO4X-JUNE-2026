import { getCurrentUser } from "./session";
import { createServiceRoleClient } from "@gio4x/supabase";
import { createClient } from "@supabase/supabase-js";

// Tech Hub data loader (server-only, admin-gated). The LP framework lives in the
// terminal Supabase project; we reach it server-side using the terminal URL +
// service key already stored in the portal's RLS-locked bridge_secrets table
// (read via the portal service-role client) — no new secrets to provision.

export type LpRow = {
  name: string; connector: string; status: string; markup_bps: string | null;
  tier: string | null; fill_rate: number | null; avg_latency_ms: number | null;
  uptime_pct: number | null; healthy: boolean; last_heartbeat: string | null;
};
export type BookRow = { symbol: string; bid: number; ask: number; spread: number; ts: string };
export type RouteRow = { symbol: string; volume: number; decision: string; a_book_pct: number; reason: string; decided_at: string };
export type BridgeRow = { name: string; schedule: string; active: boolean; last_run: string | null; last_status: string | null };
export type TechHub = {
  generated_at: string;
  lps: LpRow[]; book: BookRow[]; recent_routes: RouteRow[]; bridges: BridgeRow[];
  stats: { lp_total: number; lp_healthy: number; symbols_streamed: number; routes_total: number };
};
export type TechHubResult = { ok: true; data: TechHub } | { ok: false; error: string };

export async function loadTechHub(): Promise<TechHubResult> {
  const user = await getCurrentUser();
  const isSuper = Boolean((user?.profile as { is_super_admin?: boolean } | null)?.is_super_admin);
  if (user?.profile?.role !== "admin" && !isSuper) return { ok: false, error: "Admin access only." };

  let admin;
  try {
    admin = createServiceRoleClient();
  } catch {
    return { ok: false, error: "Server service key is not configured on this host." };
  }

  // bridge_secrets isn't in the generated types — loose cast.
  const sb = admin as unknown as {
    from: (t: string) => { select: (c: string) => Promise<{ data: { key: string; value: string }[] | null; error: { message: string } | null }> };
  };
  const { data: rows, error } = await sb.from("bridge_secrets").select("key,value");
  if (error) return { ok: false, error: "Could not read bridge config: " + error.message };
  const cfg = Object.fromEntries((rows ?? []).map((r) => [r.key, r.value]));
  if (!cfg.raptor_url || !cfg.raptor_service_key) {
    return { ok: false, error: "Terminal connection not configured (bridge_secrets missing raptor_url / raptor_service_key)." };
  }

  const terminal = createClient(cfg.raptor_url, cfg.raptor_service_key, { auth: { persistSession: false } });
  const t = terminal as unknown as { rpc: (fn: string) => Promise<{ data: unknown; error: { message: string } | null }> };
  const { data, error: e2 } = await t.rpc("fn_tech_hub");
  if (e2) return { ok: false, error: "Terminal query failed: " + e2.message };
  return { ok: true, data: data as TechHub };
}
