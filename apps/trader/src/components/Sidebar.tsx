"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  ShieldCheck,
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
  Star,
  Gift,
  Download,
  Wrench,
  Sparkles,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@gio4x/ui";

type NavLeaf = {
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: string;
};

type NavBranch = {
  label: string;
  icon: LucideIcon;
  badge?: string;
  children: NavLeaf[];
};

type NavItem = NavLeaf | NavBranch;

const isBranch = (item: NavItem): item is NavBranch =>
  (item as NavBranch).children !== undefined;

const clientNav: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Accounts", href: "/accounts", icon: Briefcase },
  {
    label: "Funds",
    icon: Wallet,
    children: [
      { label: "Deposit", href: "/deposits" },
      { label: "Withdrawal", href: "/withdrawals" },
      { label: "Transfer", href: "/transfers" },
      { label: "History", href: "/funds/history" },
    ],
  },
  { label: "STAR Trading", href: "/star-trading", icon: Star, badge: "NEW" },
  {
    label: "STAR Copy",
    icon: Users,
    badge: "NEW",
    children: [
      { label: "Discover", href: "/copy/discover" },
      { label: "Copier", href: "/copy/copier" },
      { label: "Signal Provider", href: "/copy/signal-provider" },
    ],
  },
  { label: "Promotions", href: "/promotions", icon: Gift },
  { label: "Downloads", href: "/downloads", icon: Download },
  {
    label: "Tools",
    icon: Wrench,
    children: [
      { label: "CopyTrade", href: "/tools/copytrade" },
      { label: "WebTrader4", href: "/tools/webtrader4" },
      { label: "WebTrader5", href: "/tools/webtrader5" },
      { label: "Star Matrix Tools", href: "/tools/star-matrix" },
      { label: "Notional Volume Calculator", href: "/tools/notional-calc" },
    ],
  },
  { label: "POINTS MALL", href: "/points", icon: Sparkles },
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

function NavBranchItem({ branch, pathname }: { branch: NavBranch; pathname: string }) {
  const hasActiveChild = branch.children.some((c) => pathname === c.href);
  const [open, setOpen] = useState(hasActiveChild);
  useEffect(() => {
    if (hasActiveChild) setOpen(true);
  }, [hasActiveChild]);

  const Icon = branch.icon;
  const Chevron = open ? ChevronDown : ChevronRight;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
          hasActiveChild
            ? "font-semibold text-navy"
            : "text-steel hover:bg-slate-50 hover:text-navy",
        )}
      >
        <Icon size={16} />
        <span className="flex-1 text-left">{branch.label}</span>
        {branch.badge ? (
          <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-rose-600">
            {branch.badge}
          </span>
        ) : null}
        <Chevron size={14} className="text-steel-light" />
      </button>
      {open ? (
        <div className="ml-7 mt-0.5 space-y-0.5 border-l border-slate-100 pl-3">
          {branch.children.map((leaf) => {
            const active = pathname === leaf.href;
            return (
              <Link
                key={leaf.href}
                href={leaf.href}
                className={cn(
                  "block rounded-md px-2 py-1.5 text-xs transition",
                  active
                    ? "bg-sky/10 font-semibold text-sky"
                    : "text-steel hover:bg-slate-50 hover:text-navy",
                )}
              >
                {leaf.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function NavLeafItem({ leaf, pathname }: { leaf: NavLeaf; pathname: string }) {
  const Icon = leaf.icon;
  const active = pathname === leaf.href;
  return (
    <Link
      href={leaf.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
        active
          ? "bg-sky/10 font-semibold text-sky"
          : "text-steel hover:bg-slate-50 hover:text-navy",
      )}
    >
      {Icon ? <Icon size={16} /> : null}
      <span className="flex-1">{leaf.label}</span>
      {leaf.badge ? (
        <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-rose-600">
          {leaf.badge}
        </span>
      ) : null}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const isIbRoute = pathname.startsWith("/ib");
  const [mode, setMode] = useState<"client" | "ib">(isIbRoute ? "ib" : "client");

  useEffect(() => {
    setMode(isIbRoute ? "ib" : "client");
  }, [isIbRoute]);

  const items = mode === "ib" ? ibNav : clientNav;
  const homeHref = mode === "ib" ? "/ib" : "/";

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white">
          <span className="text-sm font-bold">G4</span>
        </div>
        <div className="leading-tight">
          <div className="text-sm font-bold text-navy">GIO4X</div>
          <div className="text-[10px] uppercase tracking-wider text-steel">
            {mode === "ib" ? "IB Portal" : "Client Area"}
          </div>
        </div>
      </div>

      <div className="px-5">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sky to-navy" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-navy">Sankar G</div>
            <div className="text-[11px] text-steel">UID: 1701808</div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-lg border border-slate-200 text-xs font-medium">
          <Link
            href="/"
            onClick={() => setMode("client")}
            className={cn(
              "py-1.5 text-center transition",
              mode === "client" ? "bg-navy text-white" : "bg-white text-steel hover:bg-slate-50",
            )}
          >
            Client
          </Link>
          <Link
            href="/ib"
            onClick={() => setMode("ib")}
            className={cn(
              "py-1.5 text-center transition",
              mode === "ib" ? "bg-sky text-white" : "bg-white text-steel hover:bg-slate-50",
            )}
          >
            IB
          </Link>
        </div>
      </div>

      {mode === "client" ? (
        <div className="mt-3 space-y-0.5 px-3">
          <Link
            href="/verification"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
              pathname === "/verification"
                ? "bg-sky/10 font-semibold text-sky"
                : "text-steel hover:bg-slate-50 hover:text-navy",
            )}
          >
            <ShieldCheck size={16} />
            <span>Verification</span>
          </Link>
          <Link
            href="/downloads"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
              pathname === "/downloads"
                ? "bg-sky/10 font-semibold text-sky"
                : "text-steel hover:bg-slate-50 hover:text-navy",
            )}
          >
            <Download size={16} />
            <span>Download</span>
          </Link>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-steel transition hover:bg-slate-50 hover:text-danger"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      ) : null}

      <nav className="mt-3 flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        <div className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-wider text-steel-light">
          {mode === "ib" ? "Partner" : "Trading"}
        </div>
        {items.map((item) =>
          isBranch(item) ? (
            <NavBranchItem key={item.label} branch={item} pathname={pathname} />
          ) : (
            <NavLeafItem key={item.href} leaf={item} pathname={pathname} />
          ),
        )}
        {mode === "ib" ? (
          <button
            type="button"
            className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-steel transition hover:bg-slate-50 hover:text-danger"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        ) : null}
      </nav>

      <div className="border-t border-slate-100 px-5 py-3 text-[10px] text-steel-light">
        Home →{" "}
        <Link href={homeHref} className="text-sky hover:underline">
          {mode === "ib" ? "/ib" : "/"}
        </Link>
      </div>
    </aside>
  );
}
