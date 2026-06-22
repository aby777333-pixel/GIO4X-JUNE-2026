// @gio4x/dealer-core — the wired nervous system of the brokerage.
// Phase 1: foundations (enums, zod schemas, TradeServerBridge + MockBridge).
// Engines (scope resolver, book router, execution router, …) land in later phases.

export * from "./types/enums";
export * from "./types/schemas";
export * from "./bridge/TradeServerBridge";
export * from "./bridge/MockBridge";
