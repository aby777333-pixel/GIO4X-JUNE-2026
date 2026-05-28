"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { ChipFilter } from "@/components/ChipFilter";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge, type StatusTone } from "@/components/StatusBadge";
import { Card, CardBody } from "@gio4x/ui";
import { Download, Filter } from "lucide-react";

type Tx = {
  id: number;
  date: string;
  type: "Deposit" | "Withdrawal" | "Transfer" | "Rebate" | "Bonus";
  account: string;
  amount: number;
  currency: string;
  method: string;
  reference: string;
  status: "completed" | "pending" | "failed";
};

const all: Tx[] = [
  { id: 1, date: "2026-05-28 04:21", type: "Deposit", account: "12044510", amount: 500, currency: "USD", method: "Visa ****4421", reference: "DEP-9442", status: "completed" },
  { id: 2, date: "2026-05-27 18:55", type: "Rebate", account: "Wallet", amount: 12.4, currency: "USD", method: "IB rebate", reference: "REB-22310", status: "completed" },
  { id: 3, date: "2026-05-26 12:08", type: "Transfer", account: "12044510 → Wallet", amount: 200, currency: "USD", method: "Internal", reference: "TXF-1882", status: "completed" },
  { id: 4, date: "2026-05-25 09:14", type: "Withdrawal", account: "Wallet", amount: 150, currency: "USD", method: "USDT TRC20", reference: "WDR-5612", status: "pending" },
  { id: 5, date: "2026-05-22 14:00", type: "Deposit", account: "15624153", amount: 1000, currency: "USD", method: "Bank Transfer", reference: "DEP-9387", status: "completed" },
  { id: 6, date: "2026-05-18 11:21", type: "Bonus", account: "12044510", amount: 30, currency: "USD", method: "First-Deposit Bonus", reference: "BON-1101", status: "completed" },
  { id: 7, date: "2026-05-15 09:00", type: "Withdrawal", account: "Wallet", amount: 75, currency: "USD", method: "Visa ****4421", reference: "WDR-5550", status: "completed" },
  { id: 8, date: "2026-05-12 16:42", type: "Deposit", account: "12044510", amount: 200, currency: "USD", method: "USDT TRC20", reference: "DEP-9301", status: "completed" },
  { id: 9, date: "2026-05-09 08:30", type: "Rebate", account: "Wallet", amount: 4.6, currency: "USD", method: "IB rebate", reference: "REB-22290", status: "completed" },
  { id: 10, date: "2026-05-02 10:11", type: "Deposit", account: "18433282", amount: 50, currency: "USD", method: "UPI", reference: "DEP-9255", status: "completed" },
];

const toneFor: Record<Tx["status"], StatusTone> = {
  completed: "success",
  pending: "warning",
  failed: "danger",
};

const types = ["All", "Deposit", "Withdrawal", "Transfer", "Rebate", "Bonus"] as const;

const cols: Column<Tx>[] = [
  { key: "date", header: "Date", render: (r) => <span className="text-steel">{r.date}</span> },
  { key: "type", header: "Type", render: (r) => <span className="font-medium text-navy">{r.type}</span> },
  { key: "account", header: "Account", render: (r) => <span className="text-steel">{r.account}</span> },
  { key: "method", header: "Method", render: (r) => <span className="text-steel">{r.method}</span> },
  { key: "reference", header: "Reference", render: (r) => <span className="font-mono text-[11px] text-steel">{r.reference}</span> },
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
  { key: "status", header: "Status", render: (r) => <StatusBadge tone={toneFor[r.status]}>{r.status}</StatusBadge> },
];

export default function HistoryPage() {
  const [type, setType] = useState<(typeof types)[number]>("All");
  const rows = type === "All" ? all : all.filter((t) => t.type === type);

  return (
    <Shell title="Fund History">
      <PageHeader
        title="Fund History"
        subtitle="All money-movement events across your accounts."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-navy hover:border-sky/40">
            <Download size={14} /> Export CSV
          </button>
        }
      />

      <Card>
        <CardBody>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <ChipFilter options={types} value={type} onChange={setType} />
            <div className="flex items-center gap-2 text-xs text-steel">
              <Filter size={14} />
              <input
                type="date"
                defaultValue="2026-05-01"
                className="rounded-md border border-slate-200 px-2 py-1"
              />
              <span>→</span>
              <input
                type="date"
                defaultValue="2026-05-28"
                className="rounded-md border border-slate-200 px-2 py-1"
              />
            </div>
          </div>
          <DataTable columns={cols} rows={rows} />
        </CardBody>
      </Card>
    </Shell>
  );
}
