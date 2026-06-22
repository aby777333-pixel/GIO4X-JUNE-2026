import { SCOPE_PRECEDENCE, type ScopeType } from "../types/enums";
import type { OrderContext, EffectiveConfig } from "../types/schemas";
import type { BookConfigRow } from "../types/rows";
import type { ConfigCache } from "./ConfigCache";

// Map a scope to its reference value for this order.
export function scopeRefFor(ctx: OrderContext, st: ScopeType): string | null {
  switch (st) {
    case "account": return ctx.accountId;
    case "account_type": return ctx.accountType;
    case "client_group": return ctx.clientGroup;
    case "trading_group": return ctx.tradingGroup;
    case "white_label": return ctx.whiteLabel;
    case "country": return ctx.country;
    case "symbol": return ctx.symbol;
    case "asset_class": return ctx.assetClass;
    case "global": return null;
  }
}

const ENGINE_DEFAULT: Record<string, unknown> = {
  book: "b_book", dealingMode: "full_stp", executionModel: "market",
  volumeThresholdLots: null, profitThresholdUsd: null,
  maxSlippagePoints: 30, maxDeviationPoints: 50, orderTimeoutMs: 3000, requiresDealer: false,
};

// Nullable fields inherit (skip-when-null) up the cascade; non-nullable fields
// always come from the most-specific enabled row. This is the documented,
// snapshot-tested inheritance model: per-field, most-specific-that-provides-it wins.
const NULLABLE = new Set(["volumeThresholdLots", "profitThresholdUsd"]);

const FIELDS: (keyof BookConfigRow)[] = [
  "book", "dealingMode", "executionModel", "volumeThresholdLots", "profitThresholdUsd",
  "maxSlippagePoints", "maxDeviationPoints", "orderTimeoutMs", "requiresDealer",
];

// PURE + synchronous. Reads only the in-memory cache.
export function resolveConfig(ctx: OrderContext, cache: ConfigCache): EffectiveConfig {
  const resolvedFrom: EffectiveConfig["resolvedFrom"] = {};
  const out: Record<string, unknown> = {};

  for (const f of FIELDS) {
    let picked = false;
    for (const st of SCOPE_PRECEDENCE) {
      const ref = scopeRefFor(ctx, st);
      const row = cache.get(st, ref);
      if (!row) continue;
      const v = (row as unknown as Record<string, unknown>)[f as string];
      if (NULLABLE.has(f as string) && (v === null || v === undefined)) continue;
      out[f as string] = v;
      resolvedFrom[f as string] = { scopeType: st, scopeRef: ref, configId: row.id };
      picked = true;
      break;
    }
    if (!picked) {
      out[f as string] = ENGINE_DEFAULT[f as string] ?? null;
      resolvedFrom[f as string] = { scopeType: "global", scopeRef: null, configId: "engine-default" };
    }
  }

  return {
    book: out.book as EffectiveConfig["book"],
    dealingMode: out.dealingMode as EffectiveConfig["dealingMode"],
    executionModel: out.executionModel as EffectiveConfig["executionModel"],
    requiresDealer: Boolean(out.requiresDealer),
    maxSlippagePoints: out.maxSlippagePoints as number,
    maxDeviationPoints: out.maxDeviationPoints as number,
    orderTimeoutMs: out.orderTimeoutMs as number,
    volumeThresholdLots: (out.volumeThresholdLots as number | null) ?? null,
    profitThresholdUsd: (out.profitThresholdUsd as number | null) ?? null,
    resolvedFrom,
  };
}
