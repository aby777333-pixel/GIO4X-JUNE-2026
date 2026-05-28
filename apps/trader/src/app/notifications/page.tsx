"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { ChipFilter } from "@/components/ChipFilter";
import { Card, CardBody } from "@gio4x/ui";
import { StatusBadge } from "@/components/StatusBadge";
import { AlertTriangle, ArrowDownToLine, Award, CheckCircle, ChartLine, Info, Users } from "lucide-react";

type Notif = {
  id: number;
  type: "trade" | "funds" | "kyc" | "promo" | "system" | "ib";
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

const all: Notif[] = [
  { id: 1, type: "funds", title: "Deposit confirmed", body: "$500 credited to account 12044510 via Visa **** 4421.", time: "5 min ago", unread: true },
  { id: 2, type: "trade", title: "Take Profit hit", body: "XAUUSD BUY 0.1 lot closed at +$12.95.", time: "32 min ago", unread: true },
  { id: 3, type: "kyc", title: "Selfie verification in review", body: "We'll notify you within 10 minutes.", time: "2 hours ago", unread: false },
  { id: 4, type: "promo", title: "Trade & Win — 8 days left", body: "You're 12 lots away from the Top 10 in May.", time: "Yesterday", unread: false },
  { id: 5, type: "ib", title: "New client signed up", body: "LOGUPRABHU T joined under your IB code (UID 24819714).", time: "Yesterday", unread: false },
  { id: 6, type: "system", title: "Maintenance — Sunday 2 AM IST", body: "GIO Raptor servers will be unavailable for ~10 minutes.", time: "2 days ago", unread: false },
];

const iconFor = {
  trade: ChartLine,
  funds: ArrowDownToLine,
  kyc: CheckCircle,
  promo: Award,
  system: Info,
  ib: Users,
} as const;

const toneFor = {
  trade: "success",
  funds: "info",
  kyc: "warning",
  promo: "warning",
  system: "neutral",
  ib: "info",
} as const;

const filters = ["All", "Unread", "Trade", "Funds", "KYC", "Promo", "IB"] as const;

export default function NotificationsPage() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const rows = all.filter((n) => {
    if (f === "All") return true;
    if (f === "Unread") return n.unread;
    return n.type === f.toLowerCase();
  });
  const unread = all.filter((n) => n.unread).length;

  return (
    <Shell title="Notifications">
      <PageHeader
        title="Notifications"
        subtitle={`You have ${unread} unread notification${unread === 1 ? "" : "s"}.`}
        actions={
          <>
            <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-navy hover:border-sky/40">
              Mark all read
            </button>
            <ChipFilter options={filters} value={f} onChange={setF} />
          </>
        }
      />

      <Card>
        <CardBody className="space-y-2">
          {rows.map((n) => {
            const Icon = iconFor[n.type];
            return (
              <div
                key={n.id}
                className={
                  n.unread
                    ? "flex items-start gap-3 rounded-lg border border-sky/20 bg-sky/5 p-4"
                    : "flex items-start gap-3 rounded-lg border border-slate-100 p-4"
                }
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sky">
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-navy">{n.title}</span>
                    <StatusBadge tone={toneFor[n.type]}>{n.type}</StatusBadge>
                    {n.unread ? <span className="h-2 w-2 rounded-full bg-sky" /> : null}
                  </div>
                  <p className="mt-0.5 text-sm text-steel">{n.body}</p>
                </div>
                <span className="shrink-0 text-[11px] text-steel-light">{n.time}</span>
              </div>
            );
          })}
        </CardBody>
      </Card>

      <Card className="mt-6 border-amber-200 bg-amber-50 hidden">
        <CardBody>
          <AlertTriangle size={14} />
        </CardBody>
      </Card>
    </Shell>
  );
}
