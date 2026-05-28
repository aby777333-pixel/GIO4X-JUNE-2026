import Link from "next/link";
import { Bell, Globe, Link2 } from "lucide-react";

export function TopBar({ title, showDeposit = true }: { title: string; showDeposit?: boolean }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <h1 className="text-lg font-semibold text-navy">{title}</h1>
      <div className="flex items-center gap-3 text-steel">
        {showDeposit ? (
          <Link
            href="/deposits"
            className="rounded-lg bg-sky px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-light"
          >
            Deposit
          </Link>
        ) : null}
        <button className="rounded-lg p-2 hover:bg-slate-50" aria-label="Quick links">
          <Link2 size={16} />
        </button>
        <button className="rounded-lg p-2 hover:bg-slate-50" aria-label="Notifications">
          <Bell size={16} />
        </button>
        <button
          className="flex items-center gap-1 rounded-lg p-2 text-xs hover:bg-slate-50"
          aria-label="Language"
        >
          <Globe size={16} />
        </button>
      </div>
    </header>
  );
}
