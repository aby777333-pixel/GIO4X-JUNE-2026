"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessagesSquare,
  Ticket,
  Users,
  Contact,
  Receipt,
  BookOpen,
  Banknote,
  Network,
  Copy,
  PieChart,
  Radio,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@gio4x/ui";
import { staffSignOut } from "@/lib/staff-auth-actions";

type Item = { label: string; href: string; icon: LucideIcon };

const nav: Item[] = [
  { label: "Dashboard", href: "/staff", icon: LayoutDashboard },
  { label: "Live Chats", href: "/staff/chats", icon: MessagesSquare },
  { label: "Tickets", href: "/staff/tickets", icon: Ticket },
  { label: "Leads & CRM", href: "/staff/crm", icon: Contact },
  { label: "Customers", href: "/staff/customers", icon: Users },
  { label: "Funds & Settlement", href: "/staff/funds", icon: Banknote },
  { label: "Fee Engine", href: "/staff/fees", icon: Receipt },
  { label: "IB Network", href: "/staff/ib", icon: Network },
  { label: "Copy Trading", href: "/staff/copy", icon: Copy },
  { label: "PAMM / MAM", href: "/staff/pamm", icon: PieChart },
  { label: "General Ledger", href: "/staff/ledger", icon: BookOpen },
  { label: "Event Bus", href: "/staff/events", icon: Radio },
];

export function StaffSidebar({
  name,
  role,
}: {
  name: string;
  role: string;
}) {
  const pathname = usePathname();
  const initials =
    name
      .split(/\s+/)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .slice(0, 2)
      .join("") || "S";

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-navy text-white">
      <div className="px-5 pb-4 pt-6">
        <div className="rounded-lg bg-white/95 px-3 py-2">
          <Image src="/logo.png" alt="GIO4X" width={2924} height={976} priority className="h-9 w-auto" />
        </div>
        <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/60">
          Service Console
        </div>
      </div>

      <div className="px-5">
        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky to-emerald-400 text-[11px] font-bold text-navy">
            {initials}
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-semibold">{name}</div>
            <div className="text-[11px] uppercase tracking-wide text-white/60">{role}</div>
          </div>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-1 px-3">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = href === "/staff" ? pathname === "/staff" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                active ? "bg-white text-navy font-semibold" : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-3">
        <form action={staffSignOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-rose-300"
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
