import Link from "next/link";
import { Database, Layers, ShieldCheck, ScrollText, Boxes } from "lucide-react";
import { loadTechConsole } from "@/lib/tech-hub-console";
import { KillSwitches } from "@/components/tech/KillSwitches";
import { ModuleToggle } from "@/components/tech/ModuleToggle";

export const dynamic = "force-dynamic";

const STATUS_BADGE: Record<string, string> = {
  available: "bg-emerald-500/15 text-emerald-300",
  beta: "bg-amber-500/15 text-amber-300",
  roadmap: "bg-slate-500/15 text-slate-300",
};

function rel(ts: string): string {
  const d = (Date.now() - new Date(ts).getTime()) / 1000;
  if (d < 60) return `${Math.round(d)}s ago`;
  if (d < 3600) return `${Math.round(d / 60)}m ago`;
  if (d < 86400) return `${Math.round(d / 3600)}h ago`;
  return `${Math.round(d / 86400)}d ago`;
}

export default async function TechDashboard() {
  const res = await loadTechConsole();
  if (!res.ok) {
    return <div className="tech-panel rounded-xl p-8 text-sm text-rose-300">{res.error}</div>;
  }
  const { overview, modules, audit } = res;

  const tiles = [
    { label: "Database", value: overview?.db.size_pretty ?? "—", sub: `${overview?.db.tables ?? 0} tables`, icon: Database },
    { label: "Modules", value: `${overview?.modules.enabled ?? 0}/${overview?.modules.total ?? 0}`, sub: "enabled", icon: Boxes },
    { label: "Super admins", value: String(overview?.super_admins ?? 0), sub: "with full control", icon: ShieldCheck },
    { label: "Actions (24h)", value: String(overview?.audit_24h ?? 0), sub: "audited", icon: ScrollText },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Command Center</h1>
        <p className="text-sm tech-muted">Central control over the platform, infrastructure, integrations, liquidity and security.</p>
      </div>

      {/* Overview tiles */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.label} className="tech-panel rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs tech-muted">{t.label}</span>
                <Icon size={16} className="tech-accent" />
              </div>
              <div className="mt-1 text-2xl font-bold">{t.value}</div>
              <div className="text-[11px] tech-muted">{t.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Emergency controls */}
      <div className="tech-panel rounded-xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-semibold">Emergency Controls</h2>
          <span className="text-[11px] tech-muted">— global kill switches (turn a subsystem OFF instantly)</span>
        </div>
        <KillSwitches settings={overview?.settings ?? {}} />
      </div>

      {/* Modules grid */}
      <div className="tech-panel rounded-xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <Layers size={16} className="tech-accent" />
          <h2 className="text-sm font-semibold">Modules</h2>
          <span className="text-[11px] tech-muted">— enable/disable any module without affecting the rest</span>
        </div>
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((m) => (
            <div key={m.key} className="tech-panel2 flex items-start justify-between gap-3 rounded-lg p-3">
              <Link href={`/tech/${m.key}`} className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium hover:underline">{m.name}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase ${STATUS_BADGE[m.status] ?? ""}`}>{m.status}</span>
                </div>
                <div className="mt-0.5 line-clamp-1 text-[11px] tech-muted">{m.description}</div>
              </Link>
              <ModuleToggle moduleKey={m.key} enabled={m.enabled} />
            </div>
          ))}
        </div>
      </div>

      {/* Audit */}
      <div className="tech-panel rounded-xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <ScrollText size={16} className="tech-accent" />
          <h2 className="text-sm font-semibold">Recent Activity</h2>
        </div>
        {audit.length === 0 ? (
          <div className="text-xs tech-muted">No actions logged yet. Every super-admin change is recorded here.</div>
        ) : (
          <div className="space-y-1">
            {audit.map((a, i) => (
              <div key={i} className="flex items-center justify-between border-b tech-border py-1.5 text-xs last:border-0">
                <span className="flex items-center gap-2">
                  <span className="font-mono tech-accent">{a.action}</span>
                  {a.module && <span className="tech-muted">· {a.module}</span>}
                </span>
                <span className="tech-muted">{a.actor_email} · {rel(a.created_at)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
