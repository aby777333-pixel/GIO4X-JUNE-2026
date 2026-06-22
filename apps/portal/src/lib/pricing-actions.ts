"use server";

import { revalidatePath } from "next/cache";
import { transformTick, PricingCache, pipSize } from "@gio4x/pricing-core";
import type { ClientTick, InternalTick, PricingContext, RawTick } from "@gio4x/pricing-core";
import { getSupabaseServer } from "./supabase-server";
import { loadPricingConfig } from "./pricing-terminal";

type Rpc = { rpc: (fn: string, args?: Record<string, unknown>) => Promise<{ data: unknown; error: { message: string } | null }> };
export type PricingResult = { ok: true; message?: string } | { ok: false; error: string };

export type PricingPreviewInput = {
  symbol: string; assetClass: string; mid: number; rawSpreadPips: number;
  segment?: string; tradingGroup?: string; country?: string; volumeLots?: number; widenTrigger?: string;
};
export type PricingPreviewResult = { ok: true; client: ClientTick; internal: InternalTick } | { ok: false; error: string };

// Runs the REAL pricing engine (transformTick) against the live config — raw → broker
// → final, with the full INTERNAL breakdown. Internal-only.
export async function previewPricing(input: PricingPreviewInput): Promise<PricingPreviewResult> {
  const cfg = await loadPricingConfig();
  const cache = new PricingCache(cfg);
  const pip = pipSize(input.assetClass, input.symbol);
  const rawSpreadPrice = (Number(input.rawSpreadPips) || 0) * pip;
  const mid = Number(input.mid) || 0;
  const raw: RawTick = { symbol: input.symbol, bid: mid - rawSpreadPrice / 2, ask: mid + rawSpreadPrice / 2, ts: new Date().toISOString() };
  const ctx: PricingContext = {
    accountId: "preview", accountType: "vip", clientGroup: "cg", tradingGroup: input.tradingGroup || "g",
    whiteLabel: "gio4x", country: input.country || "IN", symbol: input.symbol, assetClass: input.assetClass,
    segment: input.segment as PricingContext["segment"], volumeLots: input.volumeLots,
  };
  const market = { activeWidenTriggers: input.widenTrigger ? [input.widenTrigger] : [] };
  const { client, internal } = transformTick(raw, ctx, cache, market);
  return { ok: true, client, internal };
}

async function rpc(fn: string, args: Record<string, unknown>): Promise<PricingResult> {
  const sb = getSupabaseServer() as unknown as Rpc;
  const { error } = await sb.rpc(fn, args);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/tech/spreads");
  return { ok: true };
}

export const upsertSpread = (p: Record<string, unknown>) => rpc("pricing_spread_upsert", { p });
export const toggleSpread = (id: string, enabled: boolean) => rpc("pricing_spread_toggle", { p_id: id, p_enabled: enabled });
export const upsertMarkup = (p: Record<string, unknown>) => rpc("pricing_markup_upsert", { p });
export const toggleMarkup = (id: string, enabled: boolean) => rpc("pricing_markup_toggle", { p_id: id, p_enabled: enabled });
export const deleteMarkup = (id: string) => rpc("pricing_markup_delete", { p_id: id });

export const upsertSmart = (p: Record<string, unknown>) => rpc("pricing_smart_upsert", { p });
export const toggleSmart = (id: string, enabled: boolean) => rpc("pricing_smart_toggle", { p_id: id, p_enabled: enabled });
export const deleteSmart = (id: string) => rpc("pricing_smart_delete", { p_id: id });
export const upsertDynamic = (p: Record<string, unknown>) => rpc("pricing_dynamic_upsert", { p });
export const toggleDynamic = (id: string, enabled: boolean) => rpc("pricing_dynamic_toggle", { p_id: id, p_enabled: enabled });
export const deleteDynamic = (id: string) => rpc("pricing_dynamic_delete", { p_id: id });
