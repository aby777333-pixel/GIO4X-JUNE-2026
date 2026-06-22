import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";
import { StatusBadge } from "@/components/StatusBadge";
import { Activity, Cable, GitBranch, Layers, AlertTriangle } from "lucide-react";
import { loadTechHub } from "@/lib/tech-hub-data";
import { RefreshButton } from "./refresh-button";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tech Hub · GIO4X Service Console" };

function ago(ts: string | null): string {
  if (!ts) return "—";
  const d = (Date.now() - new Date(ts).getTime()) / 1000;
  if (d < 60) return `${Math.max(0, Math.round(d))}s ago`;
  if (d < 3600) return `${Math.round(d / 60)}m ago`;
  return `${Math.round(d / 3600)}h ago`;
}
function fresh(ts: string | null): boolean {
  return !!ts && Date.now() - new Date(ts).getTime() < 5 * 60 * 1000;
}

// Tech Hub — backend ops console: the liquidity connectors, the bridges that feed
// them, the smart-routing decisions, and the aggregated price book. Admin-only.
export default async function TechHubPage() {
  const res = await loadTechHub();

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-navy">Tech Hub</h1>
          <p className="text-sm text-steel">
            Liquidity connectors, bridges, smart-order routing and the aggregated price book — the plumbing behind the trading engine.
          </p>
        </div>
        <RefreshButton />
      </div>

      {!res.ok ? (
        <Card>
          <CardBody className="flex items-center gap-2 !py-8 text-sm text-rose-700">
            <AlertTriangle size={16} /> {res.error}
          </CardBody>
        </Card>
      ) : (
        (() => {
          const d = res.data;
          const allBridgesGreen = d.bridges.length > 0 && d.bridges.every((b) => b.active && b.last_status === "succeeded" && fresh(b.last_run));
          const stats = [
            { label: "Liquidity connectors", value: `${d.stats.lp_healthy}/${d.stats.lp_total} healthy`, icon: Cable },
            { label: "Bridges", value: allBridgesGreen ? "All green" : "Check status", icon: GitBranch },
            { label: "Symbols streamed", value: String(d.stats.symbols_streamed), icon: Layers },
            { label: "Routing decisions", value: String(d.stats.routes_total), icon: Activity },
          ];
          return (
            <>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Card key={s.label}>
                      <CardBody className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-steel">{s.label}</div>
                          <Icon size={16} className="text-sky" />
                        </div>
                        <div className="mt-1 text-xl font-bold text-navy">{s.value}</div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>

              {/* Liquidity connectors */}
              <Card>
                <CardHeader><CardTitle>Liquidity Connectors</CardTitle></CardHeader>
                <CardBody className="overflow-x-auto px-0 pt-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-steel">
                        <th className="px-5 py-2">Provider</th>
                        <th className="px-3 py-2">Connector</th>
                        <th className="px-3 py-2">Tier</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2 text-right">Markup (bps)</th>
                        <th className="px-3 py-2 text-right">Fill</th>
                        <th className="px-3 py-2 text-right">Latency</th>
                        <th className="px-3 py-2 text-right">Uptime</th>
                        <th className="px-3 py-2 text-right">Heartbeat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.lps.map((lp) => (
                        <tr key={lp.name} className="border-b border-slate-50">
                          <td className="px-5 py-2 font-medium text-navy">{lp.name}</td>
                          <td className="px-3 py-2 text-steel">{lp.connector}</td>
                          <td className="px-3 py-2 text-steel uppercase">{lp.tier ?? "—"}</td>
                          <td className="px-3 py-2">
                            <StatusBadge tone={lp.status === "active" ? "success" : lp.status === "degraded" ? "warning" : "danger"}>
                              {lp.status}
                            </StatusBadge>
                          </td>
                          <td className="px-3 py-2 text-right text-navy">{lp.markup_bps ?? "—"}</td>
                          <td className="px-3 py-2 text-right text-steel">{lp.fill_rate != null ? `${(lp.fill_rate * 100).toFixed(0)}%` : "—"}</td>
                          <td className="px-3 py-2 text-right text-steel">{lp.avg_latency_ms != null ? `${lp.avg_latency_ms}ms` : "—"}</td>
                          <td className="px-3 py-2 text-right text-steel">{lp.uptime_pct != null ? `${lp.uptime_pct}%` : "—"}</td>
                          <td className={`px-3 py-2 text-right ${fresh(lp.last_heartbeat) ? "text-emerald-600" : "text-steel"}`}>{ago(lp.last_heartbeat)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>

              <div className="grid gap-4 lg:grid-cols-2">
                {/* Bridges */}
                <Card>
                  <CardHeader><CardTitle>Bridges</CardTitle></CardHeader>
                  <CardBody className="space-y-2">
                    {d.bridges.length === 0 ? (
                      <div className="text-xs text-steel">No bridges reporting.</div>
                    ) : (
                      d.bridges.map((b) => {
                        const green = b.active && b.last_status === "succeeded" && fresh(b.last_run);
                        return (
                          <div key={b.name} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
                            <div className="flex items-center gap-2">
                              <span className={`inline-block h-2 w-2 rounded-full ${green ? "bg-emerald-500" : "bg-amber-500"}`} />
                              <span className="font-mono text-xs text-navy">{b.name}</span>
                              <span className="text-[10px] text-steel">{b.schedule}</span>
                            </div>
                            <div className="text-[11px] text-steel">{b.last_status ?? "—"} · {ago(b.last_run)}</div>
                          </div>
                        );
                      })
                    )}
                    <p className="pt-1 text-[10px] text-steel">
                      Price + heartbeat bridges run on the terminal every minute. The trade bridge mirrors closed positions into the portal.
                    </p>
                  </CardBody>
                </Card>

                {/* Aggregated book */}
                <Card>
                  <CardHeader><CardTitle>Aggregated Book (NBBO)</CardTitle></CardHeader>
                  <CardBody className="overflow-x-auto px-0 pt-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-steel">
                          <th className="px-5 py-2">Symbol</th>
                          <th className="px-3 py-2 text-right">Best bid</th>
                          <th className="px-3 py-2 text-right">Best ask</th>
                          <th className="px-3 py-2 text-right">Spread</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.book.map((q) => (
                          <tr key={q.symbol} className="border-b border-slate-50">
                            <td className="px-5 py-2 font-medium text-navy">{q.symbol}</td>
                            <td className="px-3 py-2 text-right font-mono text-steel">{q.bid}</td>
                            <td className="px-3 py-2 text-right font-mono text-steel">{q.ask}</td>
                            <td className="px-3 py-2 text-right font-mono text-navy">{q.spread}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </div>

              {/* Recent routing */}
              <Card>
                <CardHeader><CardTitle>Recent Smart-Routing</CardTitle></CardHeader>
                <CardBody className="overflow-x-auto px-0 pt-2">
                  {d.recent_routes.length === 0 ? (
                    <div className="px-5 py-6 text-center text-sm text-steel">No routing decisions yet. They appear here as orders are placed on the terminal.</div>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-steel">
                          <th className="px-5 py-2">Time</th>
                          <th className="px-3 py-2">Symbol</th>
                          <th className="px-3 py-2 text-right">Volume</th>
                          <th className="px-3 py-2">Book</th>
                          <th className="px-3 py-2">Routed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.recent_routes.map((r, i) => (
                          <tr key={i} className="border-b border-slate-50">
                            <td className="px-5 py-2 text-steel">{new Date(r.decided_at).toLocaleString()}</td>
                            <td className="px-3 py-2 font-medium text-navy">{r.symbol}</td>
                            <td className="px-3 py-2 text-right text-steel">{r.volume}</td>
                            <td className="px-3 py-2 text-steel uppercase">{r.decision}</td>
                            <td className="px-3 py-2 text-steel">{r.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </CardBody>
              </Card>

              <p className="text-[11px] text-steel">Snapshot {ago(d.generated_at)}.</p>
            </>
          );
        })()
      )}
    </div>
  );
}
