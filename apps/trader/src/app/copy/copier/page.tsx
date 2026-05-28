import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { MetricGrid } from "@/components/MetricGrid";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";
import { Users, TrendingUp, Wallet, Pause, Play } from "lucide-react";

type Following = {
  id: number;
  provider: string;
  allocation: number;
  pnl: number;
  status: "active" | "paused";
  since: string;
};

const following: Following[] = [
  { id: 1, provider: "Gold Sniper", allocation: 500, pnl: 38.2, status: "active", since: "2026-04-12" },
  { id: 2, provider: "Carry Trade Quant", allocation: 300, pnl: 12.4, status: "active", since: "2026-04-28" },
  { id: 3, provider: "Index Swing Trader", allocation: 200, pnl: -8.6, status: "paused", since: "2026-03-02" },
];

const cols: Column<Following>[] = [
  { key: "provider", header: "Provider", render: (r) => <span className="font-medium text-navy">{r.provider}</span> },
  { key: "allocation", header: "Allocation", align: "right", render: (r) => <span className="text-navy">${r.allocation.toFixed(2)}</span> },
  {
    key: "pnl",
    header: "P&L",
    align: "right",
    render: (r) => (
      <span className={r.pnl >= 0 ? "text-success font-medium" : "text-danger font-medium"}>
        {r.pnl >= 0 ? "+" : ""}${r.pnl.toFixed(2)}
      </span>
    ),
  },
  { key: "since", header: "Since", render: (r) => <span className="text-steel">{r.since}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge tone={r.status === "active" ? "success" : "neutral"}>{r.status}</StatusBadge> },
  {
    key: "actions",
    header: "",
    align: "right",
    render: (r) => (
      <button className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] text-steel hover:border-sky/40 hover:text-navy">
        {r.status === "active" ? <Pause size={11} className="inline mr-1" /> : <Play size={11} className="inline mr-1" />}
        {r.status === "active" ? "Pause" : "Resume"}
      </button>
    ),
  },
];

export default function CopierPage() {
  const totalAllocated = following.reduce((s, f) => s + f.allocation, 0);
  const totalPnl = following.reduce((s, f) => s + f.pnl, 0);

  return (
    <Shell title="GIO4X Copy · Copier">
      <PageHeader
        title="My Copy Trading"
        subtitle="Manage providers you follow and their allocation."
        actions={
          <Link
            href="/copy/discover"
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky px-4 py-2 text-xs font-semibold text-white hover:bg-sky-light"
          >
            Discover providers
          </Link>
        }
      />

      <MetricGrid
        columns={4}
        metrics={[
          { label: "Providers followed", value: String(following.length), icon: <Users size={14} /> },
          { label: "Total allocated", value: `$${totalAllocated.toFixed(2)}`, icon: <Wallet size={14} /> },
          { label: "Open P&L", value: `${totalPnl >= 0 ? "+" : ""}$${totalPnl.toFixed(2)}`, icon: <TrendingUp size={14} />, deltaDirection: totalPnl >= 0 ? "up" : "down", delta: `${((totalPnl / totalAllocated) * 100).toFixed(1)}%` },
          { label: "Avg follow time", value: "47 days" },
        ]}
      />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Providers I follow</CardTitle>
        </CardHeader>
        <CardBody className="px-0 pt-2">
          <DataTable columns={cols} rows={following} />
        </CardBody>
      </Card>
    </Shell>
  );
}
