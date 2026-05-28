"use client";

import { useState } from "react";
import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { DataTable, type Column } from "@/components/DataTable";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@gio4x/ui";
import { AlertTriangle, ShieldCheck } from "lucide-react";

type WTx = { id: number; date: string; method: string; amount: number; status: "pending" | "completed" | "rejected" };

const past: WTx[] = [
  { id: 1, date: "2026-05-25 09:14", method: "USDT TRC20", amount: 150, status: "pending" },
  { id: 2, date: "2026-05-10 12:00", method: "Visa ****4421", amount: 200, status: "completed" },
  { id: 3, date: "2026-04-28 16:30", method: "Bank — ICICI", amount: 55, status: "completed" },
];

const cols: Column<WTx>[] = [
  { key: "date", header: "Date", render: (r) => <span className="text-steel">{r.date}</span> },
  { key: "method", header: "Method", render: (r) => <span className="text-navy">{r.method}</span> },
  { key: "amount", header: "Amount", align: "right", render: (r) => <span className="font-medium text-navy">${r.amount.toFixed(2)}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge tone={r.status === "completed" ? "success" : r.status === "pending" ? "warning" : "danger"}>{r.status}</StatusBadge> },
];

export default function WithdrawalsPage() {
  const [amount, setAmount] = useState(100);
  const kycVerified = false;

  return (
    <Shell title="Withdrawals">
      <PageHeader
        title="Withdraw Funds"
        subtitle="Withdrawals process within 24 hours on business days. Fees are absorbed by GIO4X."
      />

      {!kycVerified ? (
        <Card className="mb-5 border-amber-200 bg-amber-50">
          <CardBody className="!py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="mt-0.5 text-amber-700" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-amber-900">Verification required</div>
                <div className="mt-0.5 text-xs text-amber-800">
                  We can accept your first deposit before verification, but withdrawals require a
                  completed KYC. It usually takes under 10 minutes.
                </div>
              </div>
              <Link
                href="/verification"
                className="rounded-lg bg-amber-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-800"
              >
                Verify now
              </Link>
            </div>
          </CardBody>
        </Card>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardBody>
            <label className="block text-xs font-medium text-steel">Withdraw from</label>
            <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option>Wallet — $1,232.40 USD</option>
              <option>12044510 — Classic · $1,480.50 USD</option>
            </select>

            <label className="mt-4 block text-xs font-medium text-steel">Amount</label>
            <div className="mt-1 flex items-center rounded-lg border border-slate-200 px-3 py-2">
              <span className="mr-2 text-steel">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-transparent text-sm outline-none"
              />
              <button onClick={() => setAmount(1232.4)} className="text-[11px] font-semibold text-sky">MAX</button>
            </div>

            <label className="mt-4 block text-xs font-medium text-steel">Method</label>
            <div className="mt-1 grid gap-2 md:grid-cols-2">
              {[
                { name: "USDT TRC20", detail: "TQn9...cbLSE" },
                { name: "Visa ****4421", detail: "Used for last deposit" },
                { name: "Bank — ICICI ****8421", detail: "1–3 business days" },
                { name: "Add new method", detail: "" },
              ].map((m) => (
                <button
                  key={m.name}
                  className="flex items-start justify-between rounded-lg border border-slate-200 px-3 py-2 text-left hover:border-sky/40"
                >
                  <div>
                    <div className="text-sm font-medium text-navy">{m.name}</div>
                    {m.detail ? <div className="text-[11px] text-steel">{m.detail}</div> : null}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 text-[11px] text-steel">
                <ShieldCheck size={14} className="text-sky" /> 2FA verification will be requested.
              </div>
              <Button variant="primary" disabled={!kycVerified}>
                Request Withdrawal ${amount.toLocaleString()}
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Withdrawal rules</CardTitle>
          </CardHeader>
          <CardBody className="space-y-2 text-xs text-steel">
            <p>
              <strong className="text-navy">Min:</strong> $10 (crypto) · $50 (card, bank).
            </p>
            <p>
              <strong className="text-navy">Limit:</strong> $50,000 per day.
            </p>
            <p>
              <strong className="text-navy">First withdrawal</strong> must go to the same method used
              for your first deposit (AML rule).
            </p>
            <p>
              <strong className="text-navy">Processing time:</strong> crypto 10–30 min · card 1–2 business
              days · bank 1–3 business days.
            </p>
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Past withdrawals</CardTitle>
        </CardHeader>
        <CardBody className="px-0 pt-2">
          <DataTable columns={cols} rows={past} />
        </CardBody>
      </Card>
    </Shell>
  );
}
