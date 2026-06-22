import { createServiceRoleClient } from "@gio4x/supabase";

// Server-only access to the terminal Supabase project (where instruments, positions,
// LP config etc. live). Uses the terminal URL + service key already stored in the
// portal's RLS-locked bridge_secrets. We talk to it over PostgREST/fetch (no
// supabase-js realtime client, which needs a WebSocket polyfill on Node).

async function terminalCfg(): Promise<{ url: string; key: string } | null> {
  let admin;
  try { admin = createServiceRoleClient(); } catch { return null; }
  const sb = admin as unknown as { from: (t: string) => { select: (c: string) => Promise<{ data: { key: string; value: string }[] | null }> } };
  const { data } = await sb.from("bridge_secrets").select("key,value");
  const cfg = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  if (!cfg.raptor_url || !cfg.raptor_service_key) return null;
  return { url: cfg.raptor_url, key: cfg.raptor_service_key };
}

function headers(key: string, extra?: Record<string, string>) {
  return { apikey: key, Authorization: `Bearer ${key}`, ...(extra ?? {}) };
}

export async function terminalSelect<T = unknown>(path: string): Promise<T[] | null> {
  const c = await terminalCfg();
  if (!c) return null;
  const r = await fetch(`${c.url}/rest/v1/${path}`, { headers: headers(c.key), cache: "no-store" });
  if (!r.ok) return null;
  return (await r.json()) as T[];
}

export async function terminalPatch(path: string, body: unknown): Promise<{ ok: boolean; error?: string }> {
  const c = await terminalCfg();
  if (!c) return { ok: false, error: "Terminal connection not configured." };
  const r = await fetch(`${c.url}/rest/v1/${path}`, {
    method: "PATCH", headers: headers(c.key, { "Content-Type": "application/json", Prefer: "return=minimal" }), body: JSON.stringify(body),
  });
  if (!r.ok) return { ok: false, error: (await r.text()).slice(0, 180) };
  return { ok: true };
}

export async function terminalInsert(path: string, body: unknown): Promise<{ ok: boolean; error?: string }> {
  const c = await terminalCfg();
  if (!c) return { ok: false, error: "Terminal connection not configured." };
  const r = await fetch(`${c.url}/rest/v1/${path}`, {
    method: "POST", headers: headers(c.key, { "Content-Type": "application/json", Prefer: "return=minimal" }), body: JSON.stringify(body),
  });
  if (!r.ok) return { ok: false, error: (await r.text()).slice(0, 180) };
  return { ok: true };
}

export async function terminalDelete(path: string): Promise<{ ok: boolean; error?: string }> {
  const c = await terminalCfg();
  if (!c) return { ok: false, error: "Terminal connection not configured." };
  const r = await fetch(`${c.url}/rest/v1/${path}`, { method: "DELETE", headers: headers(c.key, { Prefer: "return=minimal" }) });
  if (!r.ok) return { ok: false, error: (await r.text()).slice(0, 180) };
  return { ok: true };
}
