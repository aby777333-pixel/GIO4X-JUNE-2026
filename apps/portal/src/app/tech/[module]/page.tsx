import Link from "next/link";
import { CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import { loadTechModule, loadTechConsole, getSuperAdmin, loadBridges, loadApiKeys, loadSecurityRules, loadFlags } from "@/lib/tech-hub-console";
import { loadTechHub } from "@/lib/tech-hub-data";
import { ModuleToggle } from "@/components/tech/ModuleToggle";
import { SuperAdminToggle } from "@/components/tech/SuperAdminToggle";
import { BridgeManager } from "@/components/tech/BridgeManager";
import { loadSymbols } from "@/lib/tech-symbols";
import { SymbolManager } from "@/components/tech/SymbolManager";
import { ApiKeyManager } from "@/components/tech/ApiKeyManager";
import { SecurityManager } from "@/components/tech/SecurityManager";
import { FlagManager } from "@/components/tech/FlagManager";
import { LiquidityManager } from "@/components/tech/LiquidityManager";
import { ReportingPanel } from "@/components/tech/ReportingPanel";

export const dynamic = "force-dynamic";

const STATUS_BADGE: Record<string, string> = {
  available: "bg-emerald-500/15 text-emerald-300",
  beta: "bg-amber-500/15 text-amber-300",
  roadmap: "bg-slate-500/15 text-slate-300",
};

export default async function ModulePage({ params }: { params: { module: string } }) {
  const m = await loadTechModule(params.module);
  if (!m) {
    return (
      <div className="tech-panel rounded-xl p-8 text-sm tech-muted">
        Unknown module. <Link href="/tech" className="tech-accent underline">Back to Command Center</Link>
      </div>
    );
  }

  // Module-specific live data.
  const liquidity = m.key === "liquidity" ? await loadTechHub() : null;
  const bridges = m.key === "bridges" ? await loadBridges() : null;
  const symbols = m.key === "trading" ? await loadSymbols() : null;
  const apiKeys = m.key === "api" ? await loadApiKeys() : null;
  const secRules = m.key === "security" ? await loadSecurityRules() : null;
  const flags = m.key === "platform" ? await loadFlags() : null;
  const consoleData = ["monitoring", "database", "access", "security"].includes(m.key) ? await loadTechConsole() : null;
  const { user } = await getSuperAdmin();

  return (
    <div className="space-y-6">
      <Link href="/tech" className="inline-flex items-center gap-1.5 text-xs tech-muted hover:tech-accent">
        <ArrowLeft size={14} /> Command Center
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{m.name}</h1>
            <span className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${STATUS_BADGE[m.status] ?? ""}`}>{m.status}</span>
          </div>
          <p className="mt-1 text-sm tech-muted">{m.description}</p>
        </div>
        <div className="flex items-center gap-2 tech-panel rounded-lg px-3 py-2 text-xs">
          <span className="tech-muted">Module</span>
          <ModuleToggle moduleKey={m.key} enabled={m.enabled} />
          <span className={m.enabled ? "text-emerald-400" : "tech-muted"}>{m.enabled ? "Enabled" : "Disabled"}</span>
        </div>
      </div>

      {/* Capabilities (control surface) */}
      <div className="tech-panel rounded-xl p-5">
        <h2 className="mb-3 text-sm font-semibold">Capabilities</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {m.features.map((f) => {
            const live = m.status === "available";
            return (
              <div key={f} className="tech-panel2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs">
                {live ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Circle size={14} className="tech-muted" />}
                <span className={live ? "" : "tech-muted"}>{f}</span>
              </div>
            );
          })}
        </div>
        {m.status !== "available" && (
          <p className="mt-3 text-[11px] tech-muted">
            {m.status === "beta" ? "Partially wired — controls are coming online." : "Planned — provisioned in the registry and ready to build out."}
          </p>
        )}
      </div>

      {/* Bridge registry — build/manage any bridge */}
      {bridges && <BridgeManager bridges={bridges} />}

      {/* Symbol & spread management — live to the trading engine */}
      {symbols && <SymbolManager symbols={symbols} />}

      {/* API / Platform / Security / Reporting modules */}
      {apiKeys && <ApiKeyManager keys={apiKeys} />}
      {flags && <FlagManager flags={flags} />}
      {secRules && <SecurityManager rules={secRules} />}
      {m.key === "reporting" && <ReportingPanel />}

      {/* Liquidity live panel */}
      {liquidity && liquidity.ok && (
        <>
          <LiquidityManager lps={liquidity.data.lps} />
          <div className="tech-panel rounded-xl p-5">
            <h2 className="mb-3 text-sm font-semibold">Liquidity Connectors (live book)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b tech-border text-left tech-muted">
                    <th className="py-2 pr-3">Provider</th><th className="py-2 pr-3">Connector</th><th className="py-2 pr-3">Status</th>
                    <th className="py-2 pr-3 text-right">Markup</th><th className="py-2 pr-3 text-right">Fill</th><th className="py-2 pr-3 text-right">Latency</th>
                  </tr>
                </thead>
                <tbody>
                  {liquidity.data.lps.map((lp) => (
                    <tr key={lp.name} className="border-b tech-border last:border-0">
                      <td className="py-2 pr-3 font-medium">{lp.name}</td>
                      <td className="py-2 pr-3 tech-muted">{lp.connector}</td>
                      <td className="py-2 pr-3"><span className={lp.status === "active" ? "text-emerald-400" : lp.status === "degraded" ? "text-amber-400" : "text-rose-400"}>{lp.status}</span></td>
                      <td className="py-2 pr-3 text-right">{lp.markup_bps ?? "—"} bps</td>
                      <td className="py-2 pr-3 text-right tech-muted">{lp.fill_rate != null ? `${(lp.fill_rate * 100).toFixed(0)}%` : "—"}</td>
                      <td className="py-2 pr-3 text-right tech-muted">{lp.avg_latency_ms != null ? `${lp.avg_latency_ms}ms` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="tech-panel rounded-xl p-5">
            <h2 className="mb-3 text-sm font-semibold">Bridges</h2>
            <div className="space-y-1.5">
              {liquidity.data.bridges.map((b) => (
                <div key={b.name} className="flex items-center justify-between text-xs">
                  <span className="font-mono">{b.name} <span className="tech-muted">{b.schedule}</span></span>
                  <span className={b.last_status === "succeeded" ? "text-emerald-400" : "text-amber-400"}>{b.last_status ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {liquidity && !liquidity.ok && (
        <div className="tech-panel rounded-xl p-5 text-xs text-amber-300">Live data unavailable: {liquidity.error}</div>
      )}

      {/* Monitoring / Database overview */}
      {consoleData && consoleData.ok && (m.key === "monitoring" || m.key === "database") && consoleData.overview && (
        <div className="tech-panel rounded-xl p-5">
          <h2 className="mb-3 text-sm font-semibold">{m.key === "database" ? "Database" : "System"} Health</h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 text-sm">
            <div><div className="text-[11px] tech-muted">DB size</div><div className="font-bold">{consoleData.overview.db.size_pretty}</div></div>
            <div><div className="text-[11px] tech-muted">Tables</div><div className="font-bold">{consoleData.overview.db.tables}</div></div>
            <div><div className="text-[11px] tech-muted">Profiles</div><div className="font-bold">{consoleData.overview.db.profiles}</div></div>
            <div><div className="text-[11px] tech-muted">Trades</div><div className="font-bold">{consoleData.overview.db.trades}</div></div>
          </div>
        </div>
      )}

      {/* Access — super admins */}
      {consoleData && consoleData.ok && m.key === "access" && (
        <div className="tech-panel rounded-xl p-5">
          <h2 className="mb-3 text-sm font-semibold">Administrators</h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b tech-border text-left tech-muted"><th className="py-2 pr-3">User</th><th className="py-2 pr-3">Role</th><th className="py-2 pr-3 text-right">Super Admin</th></tr>
            </thead>
            <tbody>
              {consoleData.admins.map((a) => (
                <tr key={a.id} className="border-b tech-border last:border-0">
                  <td className="py-2 pr-3"><div className="font-medium">{a.full_name || a.email}</div><div className="tech-muted">{a.email}</div></td>
                  <td className="py-2 pr-3 uppercase tech-muted">{a.role}</td>
                  <td className="py-2 pr-3"><SuperAdminToggle userId={a.id} on={a.is_super_admin} self={a.id === user?.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Security — audit */}
      {consoleData && consoleData.ok && m.key === "security" && (
        <div className="tech-panel rounded-xl p-5">
          <h2 className="mb-3 text-sm font-semibold">Audit Trail</h2>
          {consoleData.audit.length === 0 ? (
            <div className="text-xs tech-muted">No security events logged yet.</div>
          ) : (
            <div className="space-y-1">
              {consoleData.audit.map((a, i) => (
                <div key={i} className="flex items-center justify-between border-b tech-border py-1.5 text-xs last:border-0">
                  <span className="font-mono tech-accent">{a.action}{a.module ? ` · ${a.module}` : ""}</span>
                  <span className="tech-muted">{a.actor_email} · {new Date(a.created_at).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
