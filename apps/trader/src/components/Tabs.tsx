"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@gio4x/ui";

export type Tab = { id: string; label: string; content: ReactNode };

export function Tabs({ tabs, initial }: { tabs: Tab[]; initial?: string }) {
  const [active, setActive] = useState(initial ?? tabs[0]?.id);
  const current = tabs.find((t) => t.id === active);
  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-slate-100">
        {tabs.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative px-4 py-2.5 text-sm transition",
                isActive ? "font-semibold text-navy" : "text-steel hover:text-navy",
              )}
            >
              {t.label}
              {isActive ? (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-sky" />
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="mt-5">{current?.content}</div>
    </div>
  );
}
