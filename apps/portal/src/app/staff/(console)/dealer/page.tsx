import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";
import { Activity, Cable, ShieldAlert, Layers, Wallet, ArrowLeftRight } from "lucide-react";
import { loadDealerOverview, loadBookConfigs } from "@/lib/dealer-cockpit";
import { RoutingPreview } from "@/components/dealer/RoutingPreview";
import { DealerSyncButton } from "@/components/dealer/DealerSyncButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dealer Desk · GIO4X" };

const usd = (n: number | undefined) => `$${(n ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const BOOK_TONE: Record<string, string> = { a_book: "bg-emerald-100 text-emerald-700", b_book: "bg-amber-100 text-amber-700", hybrid: "bg-sky-100 text-sky-700" };

export default async function DealerCockpitPage() {
  const [ov, configs] = await Promise.all([loadDealerOverview(), loadBookConfigs()]);
  if (!ov) {
    return (
      <Card><CardBody className="!py-8 text-sm text-steel">Dealer-desk access required (roles: dealer / risk_manager / head_of_dealing / admin).</CardBody></Card>
    );
  }

  const tiles = [
    { label: "Liquidity providers", value: `${ov.lp_active}/${ov.lp_total} active`, icon: Cable },
    { label: "Open interventions", value: String(ov.open_interventions), icon: Activity },
    { label: "Toxic clients", value: String(ov.toxic_clients), icon: ShieldAlert },
    { label: "Surveillance flags", value: String(ov.open_flags), icon: ShieldAlert },
    { label: "Book configs", value: String(ov.book_configs), icon: Layers },
    { label: "Revenue (today)", value: usd(ov.revenue_today), icon: Wallet },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-navy">Dealer Desk</h1>
          <p className="text-sm text-steel">A/B-book routing, exposure, risk and liquidity — the trading control center. Engine: <code>@gio4x/dealer-core</code> · trade server: GIO Raptor.</p>
        </div>
        <DealerSyncButton />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {tiles.map((t) => { const Icon = t.icon; return (
          <Card key={t.label}><CardBody className="py-4">
            <div className="flex items-center justify-between"><span className="text-[11px] text-steel">{t.label}</span><Icon size={15} className="text-sky" /></div>
            <div className="mt-1 text-lg font-bold text-navy">{t.value}</div>
          </CardBody></Card>
        ); })}
      </div>

      {/* Live routing preview — the engine wired to the DB */}
      <RoutingPreview />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Liquidity Providers</CardTitle></CardHeader>
          <CardBody className="overflow-x-auto px-0 pt-2">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-100 text-left text-[11px] uppercase text-steel"><th className="px-5 py-2">Provider</th><th className="px-3 py-2">Status</th><th className="px-3 py-2 text-right">Priority</th><th className="px-3 py-2 text-right">Reject</th><th className="px-3 py-2 text-right">Fill</th></tr></thead>
              <tbody>
                {ov.lps.map((l) => (
                  <tr key={l.name} className="border-b border-slate-50">
                    <td className="px-5 py-2 font-medium text-navy">{l.name} {l.is_primary && <span className="text-[10px] text-sky">primary</span>}</td>
                    <td className="px-3 py-2"><span className={l.status === "active" ? "text-emerald-600" : l.status === "degraded" ? "text-amber-600" : "text-rose-600"}>{l.status}</span></td>
                    <td className="px-3 py-2 text-right text-steel">{l.priority}</td>
                    <td className="px-3 py-2 text-right text-steel">{(l.reject_rate * 100).toFixed(1)}%</td>
                    <td className="px-3 py-2 text-right text-steel">{l.avg_fill_ms != null ? `${l.avg_fill_ms}ms` : "—"}</td>
                  </tr>
                ))}
                {ov.lps.length === 0 && <tr><td colSpan={5} className="px-5 py-6 text-center text-steel">No providers configured.</td></tr>}
              </tbody>
            </table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Live Exposure (by symbol)</CardTitle></CardHeader>
          <CardBody className="overflow-x-auto px-0 pt-2">
            {ov.exposure.length === 0 ? (
              <div className="px-5 py-6 text-center text-sm text-steel">No exposure snapshot yet (populated by the position-sync job).</div>
            ) : (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-100 text-left text-[11px] uppercase text-steel"><th className="px-5 py-2">Symbol</th><th className="px-3 py-2 text-right">Net (lots)</th><th className="px-3 py-2 text-right">Gross</th></tr></thead>
                <tbody>{ov.exposure.map((e) => (
                  <tr key={e.ref} className="border-b border-slate-50"><td className="px-5 py-2 font-medium text-navy">{e.ref}</td>
                    <td className={`px-3 py-2 text-right ${e.net_lots >= 0 ? "text-emerald-600" : "text-rose-600"}`}>{e.net_lots >= 0 ? "+" : ""}{e.net_lots}</td>
                    <td className="px-3 py-2 text-right text-steel">{e.gross_lots}</td></tr>
                ))}</tbody>
              </table>
            )}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Book Configuration Matrix</CardTitle></CardHeader>
        <CardBody className="overflow-x-auto px-0 pt-2">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-100 text-left text-[11px] uppercase text-steel"><th className="px-5 py-2">Scope</th><th className="px-3 py-2">Book</th><th className="px-3 py-2">Dealing</th><th className="px-3 py-2">Execution</th><th className="px-3 py-2 text-right">Vol cap</th><th className="px-3 py-2 text-right">Priority</th></tr></thead>
            <tbody>
              {configs.map((c) => (
                <tr key={c.id} className={`border-b border-slate-50 ${c.enabled ? "" : "opacity-50"}`}>
                  <td className="px-5 py-2 font-medium text-navy">{c.scope_type}{c.scope_ref ? `: ${c.scope_ref}` : ""}</td>
                  <td className="px-3 py-2"><span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${BOOK_TONE[c.book] ?? ""}`}>{c.book}</span></td>
                  <td className="px-3 py-2 text-steel">{c.dealing_mode}</td>
                  <td className="px-3 py-2 text-steel">{c.execution_model}</td>
                  <td className="px-3 py-2 text-right text-steel">{c.volume_threshold_lots ?? "—"}</td>
                  <td className="px-3 py-2 text-right text-steel">{c.priority}</td>
                </tr>
              ))}
              {configs.length === 0 && <tr><td colSpan={6} className="px-5 py-6 text-center text-steel">No book config rows.</td></tr>}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {(ov.recent_switches.length > 0 || ov.recent_alerts.length > 0) && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Recent Book Switches</CardTitle></CardHeader>
            <CardBody className="space-y-1 pt-2 text-xs">
              {ov.recent_switches.length === 0 ? <span className="text-steel">None.</span> : ov.recent_switches.map((s, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-50 py-1.5"><span className="flex items-center gap-1.5"><ArrowLeftRight size={12} className="text-steel" /> {s.account_id}: {s.from_book ?? "—"} → <b className="text-navy">{s.to_book}</b></span><span className="text-steel">{s.triggered_by}</span></div>
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader><CardTitle>Active Alerts</CardTitle></CardHeader>
            <CardBody className="space-y-1 pt-2 text-xs">
              {ov.recent_alerts.length === 0 ? <span className="text-steel">None.</span> : ov.recent_alerts.map((a, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-50 py-1.5"><span className="font-medium text-navy">{a.title}</span><span className={a.severity === "critical" ? "text-rose-600" : a.severity === "warning" ? "text-amber-600" : "text-steel"}>{a.category}</span></div>
              ))}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
