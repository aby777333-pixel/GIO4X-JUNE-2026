import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@gio4x/ui";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Coins, Calendar, Download } from "lucide-react";

type Payout = { id: number; date: string; amount: number; method: string; ref: string; status: "completed" | "pending" };
const payouts: Payout[] = [
  { id: 1, date: "2026-05-01", amount: 482.5, method: "USDT TRC20", ref: "IBP-1102", status: "completed" },
  { id: 2, date: "2026-04-01", amount: 396.2, method: "USDT TRC20", ref: "IBP-1080", status: "completed" },
  { id: 3, date: "2026-03-01", amount: 412.7, method: "USDT TRC20", ref: "IBP-1058", status: "completed" },
];

const cols: Column<Payout>[] = [
  { key: "date", header: "Date", render: (r) => <span className="text-navy">{r.date}</span> },
  { key: "amount", header: "Amount", align: "right", render: (r) => <span className="font-semibold text-success">${r.amount.toFixed(2)}</span> },
  { key: "method", header: "Method", render: (r) => <span className="text-steel">{r.method}</span> },
  { key: "ref", header: "Reference", render: (r) => <span className="font-mono text-[11px] text-steel">{r.ref}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge tone="success">{r.status}</StatusBadge> },
];

export default function IbFundsPage() {
  return (
    <Shell title="IB Funds">
      <PageHeader title="IB Funds" subtitle="Your rebate wallet and payout history." />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="overflow-hidden">
          <div className="relative bg-gradient-to-br from-white via-sky/5 to-sky/15 p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky/20 blur-3xl" />
            <div className="relative">
              <div className="text-xs uppercase tracking-wider text-sky">Available rebate</div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-bold text-navy">48.30</span>
                <span className="text-lg text-steel">USD</span>
              </div>
              <div className="mt-1 text-xs text-steel-light">Total lifetime: $1,840.20 · This month: $48.30</div>
              <div className="mt-5 flex gap-2">
                <Button variant="primary">Withdraw Rebate</Button>
                <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-navy transition hover:border-sky/40">
                  Transfer to Wallet
                </button>
              </div>
            </div>
          </div>
          <CardBody>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-steel">Avg / month</div>
                <div className="mt-1 text-sm font-semibold text-navy">$430</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-steel">Avg / lot</div>
                <div className="mt-1 text-sm font-semibold text-navy">$1.00</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-steel">Next payout</div>
                <div className="mt-1 text-sm font-semibold text-navy">1 Jun 2026</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Payout settings</CardTitle></CardHeader>
          <CardBody className="space-y-3 text-xs text-steel">
            <div className="flex items-start gap-2"><Calendar size={14} className="mt-0.5 text-sky" /><span>Auto-payout on the <strong className="text-navy">1st of each month</strong> when balance ≥ $50.</span></div>
            <div className="flex items-start gap-2"><Coins size={14} className="mt-0.5 text-sky" /><span>Method: <strong className="text-navy">USDT TRC20</strong> · TQn9...cbLSE</span></div>
            <button className="mt-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-navy hover:border-sky/40">Change settings</button>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Payout history</CardTitle>
          <button className="inline-flex items-center gap-1 text-xs font-medium text-sky hover:underline">
            <Download size={12} /> Export
          </button>
        </CardHeader>
        <CardBody className="px-0 pt-2">
          <DataTable columns={cols} rows={payouts} />
        </CardBody>
      </Card>
    </Shell>
  );
}
