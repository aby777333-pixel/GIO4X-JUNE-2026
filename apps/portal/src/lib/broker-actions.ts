"use server";

// Broker Control Center (staff module — enhancement prompt §16, increment 1).
// Per-symbol trading controls on the LIVE Raptor terminal, over the existing
// service-role bridge (tech-terminal). Every write is access-checked against
// the staff session and recorded in the terminal's broker_config_audit table.
// Traders have no path to these controls: the audit + instrument writes go
// through the service role only, and this module runs solely inside the
// staff console (role-gated at the layout AND re-checked here).

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/session";
import { canAccessSection } from "@/lib/staff-sections";
import { terminalSelect, terminalPatch, terminalInsert } from "@/lib/tech-terminal";

export type BrokerInstrument = {
  symbol: string;
  type: string;
  description: string | null;
  is_active: boolean;
  spread_markup: number;
  commission_per_lot: number;
  swap_long: number;
  swap_short: number;
  min_lot: number;
  max_lot: number;
  routing_mode: string;
  session_hours: string | null;
};

export type BrokerAuditRow = {
  actor: string; symbol: string; field: string;
  old_value: string | null; new_value: string | null; changed_at: string;
};

// Fields staff may edit, with bounds. Everything here is REAL:
// is_active/min/max/commission enforced in place_market_order, swaps applied
// at close_position, routing_mode consumed by the dealer bridge. spread_markup
// is stored config the pricing layer reads — the demo feed does not apply it
// yet (labelled honestly in the UI).
const EDITABLE: Record<string, { min?: number; max?: number; kind: "number" | "boolean" | "routing" }> = {
  is_active: { kind: "boolean" },
  spread_markup: { kind: "number", min: 0, max: 100 },
  commission_per_lot: { kind: "number", min: 0, max: 500 },
  swap_long: { kind: "number", min: -500, max: 500 },
  swap_short: { kind: "number", min: -500, max: 500 },
  min_lot: { kind: "number", min: 0.01, max: 10 },
  max_lot: { kind: "number", min: 0.01, max: 10000 },
  routing_mode: { kind: "routing" },
};

async function requireBrokerAccess(): Promise<{ ok: true; actor: string } | { ok: false; error: string }> {
  const user = await getCurrentUser();
  const role = user?.profile?.role;
  const sections = (user?.profile as { staff_sections?: string[] | null } | null)?.staff_sections ?? null;
  if (!user || !canAccessSection("broker", role, sections)) {
    return { ok: false, error: "Not authorized for Broker Controls." };
  }
  return { ok: true, actor: user.email ?? user.id };
}

export async function listBrokerInstruments(): Promise<BrokerInstrument[] | null> {
  const gate = await requireBrokerAccess();
  if (!gate.ok) return null;
  const rows = await terminalSelect<BrokerInstrument>(
    "instruments?select=symbol,type,description,is_active,spread_markup,commission_per_lot,swap_long,swap_short,min_lot,max_lot,routing_mode,session_hours&order=symbol.asc",
  );
  return rows;
}

export async function listBrokerAudit(): Promise<BrokerAuditRow[] | null> {
  const gate = await requireBrokerAccess();
  if (!gate.ok) return null;
  return terminalSelect<BrokerAuditRow>(
    "broker_config_audit?select=actor,symbol,field,old_value,new_value,changed_at&order=changed_at.desc&limit=25",
  );
}

export async function updateBrokerInstrument(
  symbol: string,
  field: string,
  value: string | number | boolean,
): Promise<{ ok: boolean; error?: string }> {
  const gate = await requireBrokerAccess();
  if (!gate.ok) return { ok: false, error: gate.error };

  const rule = EDITABLE[field];
  if (!rule) return { ok: false, error: `Field "${field}" is not editable.` };

  let v: string | number | boolean = value;
  if (rule.kind === "number") {
    const n = Number(value);
    if (!Number.isFinite(n)) return { ok: false, error: "Enter a valid number." };
    if (rule.min != null && n < rule.min) return { ok: false, error: `Minimum is ${rule.min}.` };
    if (rule.max != null && n > rule.max) return { ok: false, error: `Maximum is ${rule.max}.` };
    v = n;
  } else if (rule.kind === "boolean") {
    v = value === true || value === "true";
  } else if (rule.kind === "routing") {
    if (!["a_book", "b_book", "hybrid"].includes(String(value))) {
      return { ok: false, error: "Routing must be a_book, b_book or hybrid." };
    }
    v = String(value);
  }

  // Read the current value first so the audit row is truthful.
  const cur = await terminalSelect<Record<string, unknown>>(
    `instruments?symbol=eq.${encodeURIComponent(symbol)}&select=${encodeURIComponent(field)}&limit=1`,
  );
  if (!cur || cur.length === 0) return { ok: false, error: `Unknown symbol ${symbol}.` };
  const oldValue = cur[0][field];

  const res = await terminalPatch(`instruments?symbol=eq.${encodeURIComponent(symbol)}`, { [field]: v });
  if (!res.ok) return res;

  await terminalInsert("broker_config_audit", {
    actor: gate.actor, symbol, field,
    old_value: oldValue == null ? null : String(oldValue),
    new_value: String(v),
  });

  revalidatePath("/staff/broker");
  return { ok: true };
}
