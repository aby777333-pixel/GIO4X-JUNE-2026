"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { ChipFilter } from "@/components/ChipFilter";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { MetricGrid } from "@/components/MetricGrid";
import { Card, CardBody } from "@gio4x/ui";
import { Download, History as HistoryIcon, TrendingUp, TrendingDown, Activity } from "lucide-react";

type Trade = {
  id: number;
  ticket: string;
  account: string;
  symbol: string;
  side: "BUY" | "SELL";
  lots: number;
  open: number;
  close: number;
  pnl: number;
  openedAt: string;
  closedAt: string;
};

const trades: Trade[] = [
  { id: 1, ticket: "5531944", account: "12044510", symbol: "EURUSD", side: "BUY", lots: 0.3, open: 1.155, close: 1.158, pnl: 9, openedAt: "2026-05-27 10:14", closedAt: "2026-05-27 12:42" },
  { id: 2, ticket: "5531855", account: "12044510", symbol: "XAUUSD", side: "SELL", lots: 0.05, open: 2990, close: 2987, pnl: 1.5, openedAt: "2026-05-26 22:01", closedAt: "2026-05-27 06:18" },
  { id: 3, ticket: "5531701", account: "15624153", symbol: "GBPJPY", side: "BUY", lots: 0.1, open: 189.5, close: 188.8, pnl: -4.7, openedAt: "2026-05-25 14:30", closedAt: "2026-05-26 09:10" },
  { id: 4, ticket: "5531622", account: "12044510", symbol: "US100", side: "BUY", lots: 0.2, open: 18500, close: 18620, pnl: 24, openedAt: "2026-05-24 16:00", closedAt: "2026-05-25 13:45" },
  { id: 5, ticket: "5531555", account: "12044510", symbol: "BTCUSD", side: "SELL", lots: 0.01, open: 85500, close: 84200, pnl: 13, openedAt: "2026-05-23 18:00", closedAt: "2026-05-24 11:20" },
];

const cols: Column<Trade>[] = [
  { key: "closed", header: "Closed", render: (r) => <span className="text-steel">{r.closedAt}</span> },
  { key: "ticket", header: "Ticket", render: (r) => <span className="font-mono text-[11px] text-steel">{r.ticket}</span> },
  { key: "symbol", header: "Symbol", render: (r) => <span className="font-medium text-navy">{r.symbol}</span> },
  { key: "side", header: "Side", render: (r) => <StatusBadge tone={r.side === "BUY" ? "success" : "danger"}>{r.side}</StatusBadge> },
  { key: "lots", header: "Lots", align: "right", render: (r) => <span className="text-navy">{r.lots.toFixed(2)}</span> },
  { key: "open", header: "Open", align: "right", render: (r) => <span className="text-steel">{r.open}</span> },
  { key: "close", header: "Close", align: "right", render: (r) => <span className="text-navy">{r.close}</span> },
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
];

const range = ["7D", "30D", "90D", "1Y", "All"] as const;

export default function HistoryPage() {
  const [r, setR] = useState<(typeof range)[number]>("30D");
  const wins = trades.filter((t) => t.pnl > 0);
  const losses = trades.filter((t) => t.pnl <= 0);
  const totalPnl = trades.reduce((s, t) => s + t.pnl, 0);
  const winRate = (wins.length / trades.length) * 100;

  return (
    <Shell title="Trade History">
      <PageHeader
        title="Trade History"
        subtitle="Every closed trade across all live and demo accounts."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-navy hover:border-sky/40">
            <Download size={14} /> Export CSV
          </button>
        }
      />

      <MetricGrid
        columns={4}
        metrics={[
          { label: "Closed trades", value: String(trades.length), icon: <HistoryIcon size={14} /> },
          { label: "Win rate", value: `${winRate.toFixed(0)}%`, icon: <Activity size={14} /> },
          { label: "Realised P&L", value: `${totalPnl >= 0 ? "+" : ""}$${totalPnl.toFixed(2)}`, icon: totalPnl >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />, deltaDirection: totalPnl >= 0 ? "up" : "down" },
          { label: "Avg trade", value: `$${(totalPnl / trades.length).toFixed(2)}` },
        ]}
      />

      <Card className="mt-6">
        <CardBody>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <ChipFilter options={range} value={r} onChange={setR} />
            <div className="flex gap-2 text-xs">
              <select className="rounded-md border border-slate-200 px-2 py-1">
                <option>All accounts</option>
                <option>12044510 (Classic)</option>
                <option>15624153 (Swap-Free STP)</option>
                <option>18433282 (Cent)</option>
              </select>
              <select className="rounded-md border border-slate-200 px-2 py-1">
                <option>All symbols</option>
                <option>EURUSD</option>
                <option>XAUUSD</option>
              </select>
            </div>
          </div>
          <DataTable columns={cols} rows={trades} />
        </CardBody>
      </Card>
    </Shell>
  );
}
