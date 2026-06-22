// Honest capability status per module. A capability is "live" only when it is
// actually wired to a working control on that module's page; everything else is
// "planned" (provisioned in the registry, not yet operational). Keep these in
// sync with the panels rendered in app/tech/[module]/page.tsx.
export const CAPABILITY_LIVE: Record<string, string[]> = {
  platform: ["Feature create/edit/enable/disable/delete", "Feature toggles & deployment"],
  api: ["API key create/regenerate/suspend/revoke", "Rate limiting & throttling"],
  marketplace: ["Install extensions", "Custom plugins", "Per-broker enable/disable"],
  devtools: ["Environment variables"],
  bridges: [
    "MT4 & MT5 bridges", "Proprietary platform bridge", "Liquidity provider connectors",
    "Payment gateway connectors", "Banking connectors", "CRM connectors",
    "KYC provider connectors", "TradingView integration", "External app integrations",
  ],
  liquidity: ["LP configuration", "Markup & spread", "Aggregation", "Smart order routing", "A-Book/B-Book/Hybrid", "Execution routing"],
  spreads: [
    "Global & per-symbol spreads", "Per-symbol commission (live)",
    "Spread profiles (retail/pro/vip/institutional/IB)", "Per-LP markup (live)",
    "Aggregation / best bid-ask", "Change history & audit", "Rollback-ready",
  ],
  trading: ["Symbol & contract specs", "Instrument create/delete", "Asset categories"],
  signals: ["Signal providers", "Copy trading", "PAMM/MAM strategies"],
  access: ["Super admin management", "Technical admin management", "Access audit trails"],
  broker_ops: ["White-label provisioning", "Multi-brand"],
  reporting: ["Liquidity", "Security", "Export PDF/Excel/CSV/JSON"],
  infra: ["Servers & cloud"],
  monitoring: ["System health", "Database monitoring", "Audit logs", "Performance analytics"],
  database: ["Health monitoring"],
  automation: ["Scheduled jobs", "Workflow automation"],
  security: ["MFA controls", "IP whitelisting", "Geo restrictions", "Security event monitoring"],
};

export function isCapabilityLive(moduleKey: string, feature: string): boolean {
  return CAPABILITY_LIVE[moduleKey]?.includes(feature) ?? false;
}
