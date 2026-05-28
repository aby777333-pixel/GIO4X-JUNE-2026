"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Users,
  PieChart,
  FileBarChart,
  Network,
  Link2,
  Megaphone,
  UserCircle2,
  LogOut,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@gio4x/ui";

type NavItem = { label: string; href: string; icon: LucideIcon };

const clientNav: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Accounts", href: "/accounts", icon: Briefcase },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Deposits", href: "/deposits", icon: ArrowDownToLine },
  { label: "Withdrawals", href: "/withdrawals", icon: ArrowUpFromLine },
  { label: "Transfers", href: "/transfers", icon: ArrowLeftRight },
  { label: "Copy Trading", href: "/copy", icon: Users },
  { label: "PAMM", href: "/pamm", icon: PieChart },
  { label: "Profile", href: "/profile", icon: UserCircle2 },
];

const ibNav: NavItem[] = [
  { label: "Dashboard", href: "/ib", icon: LayoutDashboard },
  { label: "IB Report", href: "/ib/report", icon: FileBarChart },
  { label: "Multi-Level IB", href: "/ib/tree", icon: Network },
  { label: "Account Report", href: "/ib/accounts", icon: Briefcase },
  { label: "Client Report", href: "/ib/clients", icon: Users },
  { label: "Funds", href: "/ib/funds", icon: Wallet },
  { label: "IB Profile", href: "/ib/profile", icon: UserCircle2 },
  { label: "Referral Links", href: "/ib/referrals", icon: Link2 },
  { label: "Campaign Links", href: "/ib/campaigns", icon: Megaphone },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mode, setMode] = useState<"client" | "ib">(pathname.startsWith("/ib") ? "ib" : "client");
  const items = mode === "ib" ? ibNav : clientNav;

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white">
          <span className="text-sm font-bold">G4</span>
        </div>
        <div className="leading-tight">
          <div className="text-sm font-bold text-navy">GIO4X</div>
          <div className="text-[10px] uppercase tracking-wider text-steel">Trader Area</div>
        </div>
      </div>

      <div className="px-5">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sky to-navy" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-navy">Trader</div>
            <div className="text-[11px] text-steel">UID: 1701808</div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-lg border border-slate-200 text-xs font-medium">
          <button
            onClick={() => setMode("client")}
            className={cn(
              "py-1.5 transition",
              mode === "client" ? "bg-navy text-white" : "bg-white text-steel hover:bg-slate-50",
            )}
          >
            Client
          </button>
          <button
            onClick={() => setMode("ib")}
            className={cn(
              "py-1.5 transition",
              mode === "ib" ? "bg-sky text-white" : "bg-white text-steel hover:bg-slate-50",
            )}
          >
            IB
          </button>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-0.5 overflow-y-auto px-3">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                active
                  ? "bg-sky/10 font-semibold text-sky"
                  : "text-steel hover:bg-slate-50 hover:text-navy",
              )}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        className="mx-3 mb-4 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-steel transition hover:bg-slate-50 hover:text-danger"
        type="button"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
