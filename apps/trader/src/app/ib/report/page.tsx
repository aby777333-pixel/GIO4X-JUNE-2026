"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { ChipFilter } from "@/components/ChipFilter";
import { MetricGrid } from "@/components/MetricGrid";
import { DataTable, type Column } from "@/components/DataTable";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";
import { Coins, Download, TrendingUp, Users } from "lucide-react";

type Row = { id: number; date: string; clients: number; lots: number; volume: number; commission: number };

const days: Row[] = [
  { id: 1, date: "2026-05-28", clients: 4, lots: 12.4, volume: 1240000, commission: 12.4 },
  { id: 2, date: "2026-05-27", clients: 3, lots: 8.2, volume: 820000, commission: 8.2 },
  { id: 3, date: "2026-05-26", clients: 5, lots: 18.6, volume: 1860000, commission: 18.6 },
  { id: 4, date: "2026-05-25", clients: 2, lots: 4.4, volume: 440000, commission: 4.4 },
  { id: 5, date: "2026-05-24", clients: 4, lots: 9.6, volume: 960000, commission: 9.6 },
];

const cols: Column<Row>[] = [
  { key: "date", header: "Date", render: (r) => <span className="font-medium text-navy">{r.date}</span> },
  { key: "clients", header: "Active clients", align: "right", render: (r) => <span className="text-navy">{r.clients}</span> },
  { key: "lots", header: "Lots", align: "right", render: (r) => <span className="text-navy">{r.lots.toFixed(2)}</span> },
  { key: "volume", header: "Volume (USD)", align: "right", render: (r) => <span className="text-steel">${r.volume.toLocaleString()}</span> },
  { key: "commission", header: "Commission", align: "right", render: (r) => <span className="font-semibold text-success">+${r.commission.toFixed(2)}</span> },
];

const range = ["7D", "30D", "90D", "YTD"] as const;

export default function IbReportPage() {
  const [r, setR] = useState<(typeof range)[number]>("30D");
  const total = days.reduce((s, d) => s + d.commission, 0);

  return (
    <Shell title="IB Report">
      <PageHeader
        title="IB Report"
        subtitle="Day-by-day breakdown of clients, volume, and commission."
        actions={
          <>
            <ChipFilter options={range} value={r} onChange={setR} />
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-navy hover:border-sky/40">
              <Download size={14} /> Export
            </button>
          </>
        }
      />

      <MetricGrid
        columns={4}
        metrics={[
          { label: "Total commission (period)", value: `$${total.toFixed(2)}`, icon: <Coins size={14} />, deltaDirection: "up", delta: "+14% vs prev period" },
          { label: "Total volume", value: `$${days.reduce((s, d) => s + d.volume, 0).toLocaleString()}`, icon: <TrendingUp size={14} /> },
          { label: "Active clients", value: String(Math.max(...days.map((d) => d.clients))), icon: <Users size={14} /> },
          { label: "Avg commission / lot", value: `$${(total / days.reduce((s, d) => s + d.lots, 0)).toFixed(2)}` },
        ]}
      />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Commission trend</CardTitle>
        </CardHeader>
        <CardBody>
          <PerformanceChart />
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Daily breakdown</CardTitle>
        </CardHeader>
        <CardBody className="px-0 pt-2">
          <DataTable columns={cols} rows={days} />
        </CardBody>
      </Card>
    </Shell>
  );
}
