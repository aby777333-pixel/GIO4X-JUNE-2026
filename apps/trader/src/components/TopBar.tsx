"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Globe, ChevronDown, Search, ChartLine, Settings, LogOut, UserCircle2 } from "lucide-react";
import { LINKS } from "@/lib/constants";

export function TopBar({ title, showDeposit = true }: { title: string; showDeposit?: boolean }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-3">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-semibold text-navy">{title}</h1>
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-light" />
          <input
            type="search"
            placeholder="Search accounts, trades, help..."
            className="w-72 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-sky/40 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-steel">
        {showDeposit ? (
          <Link
            href="/deposits"
            className="rounded-lg bg-sky px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-light"
          >
            Deposit
          </Link>
        ) : null}
        <Link
          href={LINKS.raptor.terminal}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-navy hover:border-sky/40"
        >
          <ChartLine size={12} /> Open Raptor
        </Link>
        <Link href="/notifications" className="relative rounded-lg p-2 hover:bg-slate-50">
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </Link>
        <button className="flex items-center gap-1 rounded-lg px-2 py-2 text-xs hover:bg-slate-50">
          <Globe size={14} /> <span className="hidden sm:inline">EN</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs hover:border-sky/40"
          >
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-sky to-navy" />
            <span className="hidden text-navy sm:inline">Sankar G</span>
            <ChevronDown size={12} />
          </button>
          {profileOpen ? (
            <div className="absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 px-4 py-3">
                <div className="text-sm font-semibold text-navy">Sankar G</div>
                <div className="text-[11px] text-steel">UID: 1701808 · Gold Partner</div>
              </div>
              <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-navy hover:bg-slate-50">
                <UserCircle2 size={14} /> Profile
              </Link>
              <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-navy hover:bg-slate-50">
                <Settings size={14} /> Settings
              </Link>
              <Link href="/security" className="flex items-center gap-2 px-4 py-2 text-sm text-navy hover:bg-slate-50">
                <Bell size={14} /> Security
              </Link>
              <button className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2 text-left text-sm text-rose-600 hover:bg-slate-50">
                <LogOut size={14} /> Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
