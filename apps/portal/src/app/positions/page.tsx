import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { MetricGrid } from "@/components/MetricGrid";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";
import { ChartLine, TrendingUp, AlertOctagon, Activity } from "lucide-react";

type Position = {
  id: number;
  ticket: string;
  account: string;
  symbol: string;
  side: "BUY" | "SELL";
  lots: number;
  open: number;
  current: number;
  sl?: number;
  tp?: number;
  pnl: number;
  swap: number;
  openedAt: string;
};

const positions: Position[] = [
  { id: 1, ticket: "5532014", account: "12044510", symbol: "EURUSD", side: "BUY", lots: 0.5, open: 1.1532, current: 1.159, sl: 1.145, tp: 1.175, pnl: 29, swap: -0.4, openedAt: "2026-05-27 14:22" },
  { id: 2, ticket: "5532088", account: "12044510", symbol: "XAUUSD", side: "BUY", lots: 0.1, open: 2974.5, current: 2987.45, sl: 2960, tp: 3025, pnl: 12.95, swap: 0, openedAt: "2026-05-28 02:11" },
  { id: 3, ticket: "5532102", account: "15624153", symbol: "GBPUSD", side: "SELL", lots: 0.2, open: 1.27, current: 1.267, sl: 1.275, tp: 1.255, pnl: 6, swap: 0.2, openedAt: "2026-05-28 03:50" },
];

const cols: Column<Position>[] = [
  { key: "ticket", header: "Ticket", render: (r) => <span className="font-mono text-[11px] text-steel">{r.ticket}</span> },
  { key: "account", header: "Account", render: (r) => <span className="text-steel">{r.account}</span> },
  { key: "symbol", header: "Symbol", render: (r) => <span className="font-medium text-navy">{r.symbol}</span> },
  { key: "side", header: "Side", render: (r) => <StatusBadge tone={r.side === "BUY" ? "success" : "danger"}>{r.side}</StatusBadge> },
  { key: "lots", header: "Lots", align: "right", render: (r) => <span className="text-navy">{r.lots.toFixed(2)}</span> },
  { key: "open", header: "Open", align: "right", render: (r) => <span className="text-steel">{r.open}</span> },
  { key: "current", header: "Current", align: "right", render: (r) => <span className="text-navy">{r.current}</span> },
  { key: "sl", header: "SL / TP", align: "right", render: (r) => <span className="text-[11px] text-steel">{r.sl ?? "—"} / {r.tp ?? "—"}</span> },
  { key: "swap", header: "Swap", align: "right", render: (r) => <span className="text-steel">{r.swap.toFixed(2)}</span> },
  {
    key: "pnl",
    header: "P&L",
    align: "right",
    render: (r) => (
      <span className={r.pnl >= 0 ? "font-semibold text-success" : "font-semibold text-danger"}>
        {r.pnl >= 0 ? "+" : ""}${r.pnl.toFixed(2)}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    render: () => (
      <div className="flex gap-1">
        <button className="rounded-md border border-slate-200 px-2 py-1 text-[11px] text-steel hover:border-sky/40 hover:text-navy">Modify</button>
        <button className="rounded-md border border-rose-200 px-2 py-1 text-[11px] text-rose-600 hover:bg-rose-50">Close</button>
      </div>
    ),
  },
];

export default function PositionsPage() {
  const totalPnl = positions.reduce((s, p) => s + p.pnl, 0);
  const totalLots = positions.reduce((s, p) => s + p.lots, 0);

  return (
    <Shell title="Open Positions">
      <PageHeader
        title="Open Positions"
        subtitle="Live positions across all your trading accounts. Modify or close from one place."
      />

      <MetricGrid
        columns={4}
        metrics={[
          { label: "Open positions", value: String(positions.length), icon: <ChartLine size={14} /> },
          { label: "Total lots", value: totalLots.toFixed(2), icon: <Activity size={14} /> },
          { label: "Floating P&L", value: `${totalPnl >= 0 ? "+" : ""}$${totalPnl.toFixed(2)}`, deltaDirection: totalPnl >= 0 ? "up" : "down", delta: "live", icon: <TrendingUp size={14} /> },
          { label: "Margin used", value: "$184.30", icon: <AlertOctagon size={14} />, hint: "Free margin: $1,048.10" },
        ]}
      />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All open positions</CardTitle>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-navy hover:border-sky/40">Close all profitable</button>
            <button className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50">Close all</button>
          </div>
        </CardHeader>
        <CardBody className="px-0 pt-2">
          <DataTable columns={cols} rows={positions} />
        </CardBody>
      </Card>
    </Shell>
  );
}
