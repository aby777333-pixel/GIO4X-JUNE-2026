import { Bell, Globe } from "lucide-react";

export function TopBar({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <h1 className="text-lg font-semibold text-navy">{title}</h1>
      <div className="flex items-center gap-4 text-steel">
        <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:border-sky/40">
          <span className="text-base leading-none">USD</span>
          <span className="text-[10px]">▾</span>
        </button>
        <button className="rounded-lg p-2 hover:bg-slate-50">
          <Bell size={18} />
        </button>
        <button className="rounded-lg p-2 hover:bg-slate-50">
          <Globe size={18} />
        </button>
      </div>
    </header>
  );
}
