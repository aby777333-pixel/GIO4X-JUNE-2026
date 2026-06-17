// raptor-trade-bridge — pulls newly-closed positions from the GIO RAPTOR
// terminal project and mirrors them into this portal's public.trades via the
// idempotent bridge_ingest_position() RPC. Runs on a 1-minute pg_cron schedule.
//
// Config lives in the portal's private public.bridge_secrets table (RLS-locked):
//   raptor_url, raptor_service_key  — terminal project URL + service-role key
//   bridge_secret                   — shared secret the cron caller must send
// The function reads it with the auto-injected SUPABASE_SERVICE_ROLE_KEY, so no
// custom function secrets need to be provisioned.
//
// Auth: verify_jwt is disabled; the function self-guards with bridge_secret.

import { createClient } from "jsr:@supabase/supabase-js@2";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

Deno.serve(async (req) => {
  const portal = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Load config from the private table.
  const { data: cfgRows, error: cfgErr } = await portal
    .from("bridge_secrets")
    .select("key,value");
  if (cfgErr) return json({ ok: false, error: "config read failed: " + cfgErr.message }, 500);
  const cfg = Object.fromEntries((cfgRows ?? []).map((r) => [r.key, r.value]));

  // Shared-secret gate — only the scheduled caller can run the sync.
  if (!cfg.bridge_secret || req.headers.get("x-bridge-secret") !== cfg.bridge_secret) {
    return json({ ok: false, error: "forbidden" }, 403);
  }
  if (!cfg.raptor_url || !cfg.raptor_service_key) {
    return json({ ok: false, error: "raptor config missing" }, 500);
  }

  const raptor = createClient(cfg.raptor_url, cfg.raptor_service_key);

  // Only mirror accounts that have an explicit mapping.
  const { data: maps, error: mapErr } = await portal
    .from("bridge_account_map")
    .select("raptor_account_id");
  if (mapErr) return json({ ok: false, error: mapErr.message }, 500);
  const acctIds = (maps ?? []).map((m) => m.raptor_account_id);
  if (acctIds.length === 0) return json({ ok: true, ingested: 0, note: "no mapped accounts" });

  // Watermark = latest already-mirrored close. gte + RPC idempotency means we
  // never miss a boundary row and never double-insert.
  const { data: wm } = await portal
    .from("trades")
    .select("closed_at")
    .eq("source", "raptor")
    .not("closed_at", "is", null)
    .order("closed_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const since = wm?.closed_at ?? "1970-01-01T00:00:00Z";

  const { data: positions, error: posErr } = await raptor
    .from("positions")
    .select(
      "id,account_id,symbol,direction,size,open_price,close_price,realized_pnl,commission,swap_accrued,status,opened_at,closed_at",
    )
    .eq("status", "closed")
    .in("account_id", acctIds)
    .gte("closed_at", since)
    .order("closed_at", { ascending: true })
    .limit(500);
  if (posErr) return json({ ok: false, error: posErr.message }, 500);

  let ingested = 0;
  for (const p of positions ?? []) {
    const { data: tid, error } = await portal.rpc("bridge_ingest_position", { p });
    if (error) return json({ ok: false, error: error.message, ingested }, 500);
    if (tid) ingested++;
  }
  return json({ ok: true, scanned: (positions ?? []).length, ingested });
});
