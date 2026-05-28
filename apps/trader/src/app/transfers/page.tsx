"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@gio4x/ui";
import { ArrowLeftRight, ArrowRight } from "lucide-react";

const sources = [
  { id: "wallet", label: "Wallet", balance: 1232.4, currency: "USD" },
  { id: "12044510", label: "12044510 · MT4 · Classic", balance: 1480.5, currency: "USD" },
  { id: "15624153", label: "15624153 · MT5 · Swap-Free STP", balance: 0, currency: "USD" },
  { id: "18433282", label: "18433282 · MT5 · Cent", balance: 0.02, currency: "USC" },
];

export default function TransfersPage() {
  const [from, setFrom] = useState("wallet");
  const [to, setTo] = useState("12044510");
  const [amount, setAmount] = useState(100);

  const fromAcc = sources.find((s) => s.id === from)!;
  const toAcc = sources.find((s) => s.id === to)!;

  return (
    <Shell title="Transfers">
      <PageHeader
        title="Internal Transfers"
        subtitle="Move funds instantly between your Wallet and trading accounts."
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardBody>
            <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
              <div>
                <label className="block text-xs font-medium text-steel">From</label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  {sources.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
                <div className="mt-1 text-[11px] text-steel">
                  Available: {fromAcc.balance.toFixed(2)} {fromAcc.currency}
                </div>
              </div>

              <div className="flex items-end justify-center pb-2">
                <button
                  onClick={() => { setFrom(to); setTo(from); }}
                  className="rounded-full border border-slate-200 bg-white p-2 text-sky shadow-sm transition hover:rotate-180"
                  aria-label="Swap"
                  type="button"
                >
                  <ArrowLeftRight size={16} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-steel">To</label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  {sources.filter((s) => s.id !== from).map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
                <div className="mt-1 text-[11px] text-steel">
                  Current: {toAcc.balance.toFixed(2)} {toAcc.currency}
                </div>
              </div>
            </div>

            <label className="mt-5 block text-xs font-medium text-steel">Amount</label>
            <div className="mt-1 flex items-center rounded-lg border border-slate-200 px-3 py-2">
              <span className="mr-2 text-steel">{fromAcc.currency === "USC" ? "¢" : "$"}</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-transparent text-sm outline-none"
              />
              <button onClick={() => setAmount(fromAcc.balance)} className="text-[11px] font-semibold text-sky">
                MAX
              </button>
            </div>

            <div className="mt-5 rounded-lg bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-steel">{fromAcc.label}</span>
                <ArrowRight size={14} className="text-sky" />
                <span className="text-steel">{toAcc.label}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
                <div>
                  <div className="text-steel">You send</div>
                  <div className="mt-1 font-semibold text-navy">{amount.toFixed(2)} {fromAcc.currency}</div>
                </div>
                <div>
                  <div className="text-steel">Fee</div>
                  <div className="mt-1 font-semibold text-success">$0.00</div>
                </div>
                <div>
                  <div className="text-steel">They receive</div>
                  <div className="mt-1 font-semibold text-navy">
                    {fromAcc.currency === toAcc.currency ? amount.toFixed(2) : (amount * 100).toFixed(0)} {toAcc.currency}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <Button variant="primary">Transfer Now</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardBody className="space-y-2 text-xs text-steel">
            <p>Transfers between accounts of the same currency are instant and free.</p>
            <p>Cross-currency transfers (e.g. USD → USC) use a 1:100 fixed rate for cent accounts.</p>
            <p>You can transfer up to <strong className="text-navy">$100,000 per day</strong>.</p>
            <p>Transfers count toward IB volume tracking the moment they settle.</p>
          </CardBody>
        </Card>
      </div>
    </Shell>
  );
}
