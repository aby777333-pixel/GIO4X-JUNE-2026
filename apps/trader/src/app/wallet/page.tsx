import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { MetricGrid } from "@/components/MetricGrid";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge, type StatusTone } from "@/components/StatusBadge";
import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  History,
  Wallet,
  TrendingUp,
  Coins,
} from "lucide-react";

type Tx = {
  id: number;
  date: string;
  type: "Deposit" | "Withdrawal" | "Transfer" | "Rebate";
  account: string;
  amount: number;
  currency: string;
  method: string;
  status: "completed" | "pending" | "failed";
};

const recent: Tx[] = [
  { id: 1, date: "2026-05-28 04:21", type: "Deposit", account: "12044510", amount: 500, currency: "USD", method: "Visa ****4421", status: "completed" },
  { id: 2, date: "2026-05-27 18:55", type: "Rebate", account: "Wallet", amount: 12.4, currency: "USD", method: "IB rebate", status: "completed" },
  { id: 3, date: "2026-05-26 12:08", type: "Transfer", account: "12044510 → Wallet", amount: 200, currency: "USD", method: "Internal", status: "completed" },
  { id: 4, date: "2026-05-25 09:14", type: "Withdrawal", account: "Wallet", amount: 150, currency: "USD", method: "USDT TRC20", status: "pending" },
  { id: 5, date: "2026-05-22 14:00", type: "Deposit", account: "15624153", amount: 1000, currency: "USD", method: "Bank Transfer", status: "completed" },
];

const toneFor: Record<Tx["status"], StatusTone> = {
  completed: "success",
  pending: "warning",
  failed: "danger",
};

const cols: Column<Tx>[] = [
  { key: "date", header: "Date", render: (r) => <span className="text-steel">{r.date}</span> },
  {
    key: "type",
    header: "Type",
    render: (r) => <span className="font-medium text-navy">{r.type}</span>,
  },
  { key: "account", header: "Account", render: (r) => <span className="text-steel">{r.account}</span> },
  { key: "method", header: "Method", render: (r) => <span className="text-steel">{r.method}</span> },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (r) => (
      <span className={r.type === "Withdrawal" ? "text-danger" : "text-success font-medium"}>
        {r.type === "Withdrawal" ? "-" : "+"}
        {r.amount.toFixed(2)} {r.currency}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (r) => <StatusBadge tone={toneFor[r.status]}>{r.status}</StatusBadge>,
  },
];

export default function WalletPage() {
  return (
    <Shell title="Wallet">
      <PageHeader
        title="Wallet"
        subtitle="Unified balance and transaction history across all your accounts."
        actions={
          <>
            <Link
              href="/deposits"
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-light"
            >
              <ArrowDownToLine size={14} /> Deposit
            </Link>
            <Link
              href="/withdrawals"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-navy hover:border-sky/40"
            >
              <ArrowUpFromLine size={14} /> Withdraw
            </Link>
            <Link
              href="/transfers"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-navy hover:border-sky/40"
            >
              <ArrowLeftRight size={14} /> Transfer
            </Link>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="overflow-hidden">
          <div className="relative bg-gradient-to-br from-navy via-navy-dark to-navy/80 px-8 py-7 text-white">
            <div className="text-xs uppercase tracking-wider text-sky-light">Wallet Balance</div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl font-bold">1,232.40</span>
              <span className="text-lg text-white/70">USD</span>
            </div>
            <div className="mt-1 text-xs text-white/60">≈ ₹ 1,02,569.20 · ≈ 0.0146 BTC</div>
            <div className="mt-6 flex gap-2">
              <Link
                href="/deposits"
                className="rounded-lg bg-sky px-4 py-2 text-xs font-semibold transition hover:bg-sky-light"
              >
                Deposit Now
              </Link>
              <Link
                href="/transfers"
                className="rounded-lg bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur hover:bg-white/20"
              >
                Transfer to Account
              </Link>
            </div>
          </div>
          <CardBody className="!pt-5">
            <MetricGrid
              columns={3}
              metrics={[
                { label: "Total deposited", value: "$2,150.00", icon: <ArrowDownToLine size={14} /> },
                { label: "Total withdrawn", value: "$405.00", icon: <ArrowUpFromLine size={14} /> },
                { label: "Total rebates", value: "$24.80", icon: <Coins size={14} /> },
              ]}
            />
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>This month</CardTitle>
            </CardHeader>
            <CardBody>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-steel">Deposits</span>
                  <span className="font-semibold text-navy">$1,500.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-steel">Withdrawals</span>
                  <span className="font-semibold text-navy">$150.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-steel">Transfers</span>
                  <span className="font-semibold text-navy">$200.00</span>
                </li>
                <li className="flex items-center justify-between border-t border-slate-100 pt-2">
                  <span className="text-steel">Net flow</span>
                  <span className="font-semibold text-success">+$1,150.00</span>
                </li>
              </ul>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
            </CardHeader>
            <CardBody className="space-y-2 text-sm">
              <Link href="/bank-accounts" className="flex items-center justify-between rounded-lg px-2 py-2 text-navy hover:bg-slate-50">
                <span className="flex items-center gap-2"><Wallet size={14} /> Manage payment methods</span>
                <span className="text-steel-light">→</span>
              </Link>
              <Link href="/statements" className="flex items-center justify-between rounded-lg px-2 py-2 text-navy hover:bg-slate-50">
                <span className="flex items-center gap-2"><History size={14} /> Account statements</span>
                <span className="text-steel-light">→</span>
              </Link>
              <Link href="/funds/history" className="flex items-center justify-between rounded-lg px-2 py-2 text-navy hover:bg-slate-50">
                <span className="flex items-center gap-2"><TrendingUp size={14} /> Full transaction history</span>
                <span className="text-steel-light">→</span>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <Link href="/funds/history" className="text-xs font-medium text-sky hover:underline">
            View all →
          </Link>
        </CardHeader>
        <CardBody className="px-0 pt-2">
          <DataTable columns={cols} rows={recent} />
        </CardBody>
      </Card>
    </Shell>
  );
}
