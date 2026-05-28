import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { MetricGrid } from "@/components/MetricGrid";
import { AccountChip } from "@/components/AccountChip";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardBody } from "@gio4x/ui";
import { LINKS } from "@/lib/constants";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpFromLine,
  Briefcase,
  ChartLine,
  KeyRound,
  Plus,
  Settings2,
  Wallet,
} from "lucide-react";

type Account = {
  id: string;
  platform: "MT4" | "MT5";
  type: string;
  currency: string;
  balance: number;
  equity: number;
  leverage: string;
  server: string;
  status: "live" | "demo" | "archived";
};

const accounts: Account[] = [
  {
    id: "18433282",
    platform: "MT5",
    type: "Cent Swap-Free STP",
    currency: "USC",
    balance: 0.02,
    equity: 0.02,
    leverage: "1:500",
    server: "GIO4X-Live01",
    status: "live",
  },
  {
    id: "15624153",
    platform: "MT5",
    type: "Swap-Free STP",
    currency: "USD",
    balance: 0,
    equity: 0,
    leverage: "1:500",
    server: "GIO4X-Live01",
    status: "live",
  },
  {
    id: "12044510",
    platform: "MT4",
    type: "Classic",
    currency: "USD",
    balance: 1480.5,
    equity: 1492.2,
    leverage: "1:400",
    server: "GIO4X-Live02",
    status: "live",
  },
  {
    id: "99001122",
    platform: "MT5",
    type: "Premium Demo",
    currency: "USD",
    balance: 10000,
    equity: 10245.6,
    leverage: "1:500",
    server: "GIO4X-Demo",
    status: "demo",
  },
];

const fmt = (n: number, c: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: c === "USC" ? "USD" : c }).format(n);

export default function AccountsPage() {
  const live = accounts.filter((a) => a.status === "live");
  const demo = accounts.filter((a) => a.status === "demo");
  const totalEquity = live.reduce(
    (sum, a) => sum + (a.currency === "USC" ? a.equity / 100 : a.equity),
    0,
  );

  return (
    <Shell title="Accounts">
      <PageHeader
        title="Accounts"
        subtitle="All your trading accounts in one place. Open new ones, fund them, switch between live and demo."
        actions={
          <>
            <Link
              href={LINKS.raptor.register}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-light"
            >
              <Plus size={14} />
              Open Live Account
            </Link>
            <Link
              href="/accounts/demo"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-navy hover:border-sky/40"
            >
              <Plus size={14} />
              New Demo
            </Link>
          </>
        }
      />

      <MetricGrid
        metrics={[
          { label: "Live accounts", value: String(live.length), icon: <Briefcase size={14} /> },
          {
            label: "Total equity (USD)",
            value: `$${totalEquity.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: <Wallet size={14} />,
            deltaDirection: "up",
            delta: "+0.79% today",
          },
          { label: "Demo accounts", value: String(demo.length), icon: <ChartLine size={14} /> },
          { label: "Open positions", value: "0", icon: <ChartLine size={14} />, hint: "across all live accounts" },
        ]}
      />

      <div className="mt-6 space-y-3">
        {accounts.map((acc) => (
          <Card key={acc.id} className="!rounded-xl">
            <CardBody className="!pt-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky/10 text-sky">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <AccountChip platform={acc.platform} />
                      <span className="text-lg font-bold text-navy">{acc.id}</span>
                      <StatusBadge tone={acc.status === "live" ? "success" : acc.status === "demo" ? "info" : "neutral"}>
                        {acc.status.toUpperCase()}
                      </StatusBadge>
                    </div>
                    <div className="mt-0.5 text-xs text-steel">
                      {acc.type} · {acc.server} · Leverage {acc.leverage}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-steel-light">Balance</div>
                    <div className="text-base font-semibold text-navy">{fmt(acc.balance, acc.currency)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-steel-light">Equity</div>
                    <div className="text-base font-semibold text-navy">{fmt(acc.equity, acc.currency)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-steel-light">Currency</div>
                    <div className="text-base font-semibold text-navy">{acc.currency}</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                {acc.status === "live" ? (
                  <>
                    <Link
                      href="/deposits"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-sky px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-light"
                    >
                      <ArrowDownToLine size={12} /> Deposit
                    </Link>
                    <Link
                      href="/withdrawals"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-navy hover:border-sky/40"
                    >
                      <ArrowUpFromLine size={12} /> Withdraw
                    </Link>
                    <Link
                      href="/transfers"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-navy hover:border-sky/40"
                    >
                      <ArrowLeftRight size={12} /> Transfer
                    </Link>
                  </>
                ) : null}
                <Link
                  href={LINKS.raptor.terminal}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-navy hover:border-sky/40"
                >
                  <ChartLine size={12} /> Open in Raptor
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-navy hover:border-sky/40"
                >
                  <KeyRound size={12} /> Change Password
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-navy hover:border-sky/40"
                >
                  <Settings2 size={12} /> Settings
                </button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
