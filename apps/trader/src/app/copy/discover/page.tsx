"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { ChipFilter } from "@/components/ChipFilter";
import { Sparkline } from "@/components/Sparkline";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardBody, Button } from "@gio4x/ui";
import { Users } from "lucide-react";

type Provider = {
  id: number;
  name: string;
  country: string;
  followers: number;
  aum: number;
  ret12m: number;
  drawdown: number;
  winRate: number;
  risk: "Low" | "Medium" | "High";
  spark: number[];
};

const providers: Provider[] = [
  { id: 1, name: "GIO Alpha — Forex Pro", country: "🇮🇳", followers: 2847, aum: 1240000, ret12m: 64.8, drawdown: 12.4, winRate: 68, risk: "Medium", spark: [100, 105, 112, 118, 116, 125, 132, 138, 142, 158, 162, 165] },
  { id: 2, name: "Gold Sniper", country: "🇦🇪", followers: 1942, aum: 820000, ret12m: 48.2, drawdown: 8.1, winRate: 73, risk: "Low", spark: [100, 103, 108, 112, 115, 119, 123, 128, 134, 141, 145, 148] },
  { id: 3, name: "Nasdaq Momentum", country: "🇺🇸", followers: 1102, aum: 540000, ret12m: 92.4, drawdown: 24.6, winRate: 58, risk: "High", spark: [100, 104, 95, 110, 122, 118, 135, 150, 144, 168, 180, 192] },
  { id: 4, name: "Carry Trade Quant", country: "🇸🇬", followers: 854, aum: 410000, ret12m: 22.6, drawdown: 4.2, winRate: 78, risk: "Low", spark: [100, 101, 103, 104, 106, 108, 110, 113, 116, 118, 121, 123] },
  { id: 5, name: "Crypto Macro Edge", country: "🇬🇧", followers: 1340, aum: 680000, ret12m: 124.5, drawdown: 31.2, winRate: 54, risk: "High", spark: [100, 110, 95, 130, 140, 125, 165, 180, 162, 200, 218, 224] },
  { id: 6, name: "Index Swing Trader", country: "🇨🇦", followers: 612, aum: 280000, ret12m: 36.8, drawdown: 9.4, winRate: 66, risk: "Medium", spark: [100, 102, 105, 108, 110, 114, 118, 122, 127, 130, 134, 137] },
];

const sortBy = ["Top 12M return", "Most followers", "Lowest drawdown", "Highest win rate"] as const;

export default function DiscoverPage() {
  const [sort, setSort] = useState<(typeof sortBy)[number]>("Top 12M return");

  const sorted = [...providers].sort((a, b) => {
    if (sort === "Top 12M return") return b.ret12m - a.ret12m;
    if (sort === "Most followers") return b.followers - a.followers;
    if (sort === "Lowest drawdown") return a.drawdown - b.drawdown;
    return b.winRate - a.winRate;
  });

  return (
    <Shell title="GIO4X Copy · Discover">
      <PageHeader
        title="Discover Strategies"
        subtitle="Browse vetted signal providers and copy their trades to your account."
        actions={<ChipFilter options={sortBy} value={sort} onChange={setSort} />}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sorted.map((p) => (
          <Card key={p.id}>
            <CardBody>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky to-navy text-white">
                    {p.country}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-navy">{p.name}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-steel">
                      <Users size={11} /> {p.followers.toLocaleString()} followers
                    </div>
                  </div>
                </div>
                <StatusBadge tone={p.risk === "High" ? "danger" : p.risk === "Medium" ? "warning" : "success"}>
                  {p.risk}
                </StatusBadge>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-steel-light">12M return</div>
                  <div className={p.ret12m > 0 ? "text-2xl font-bold text-success" : "text-2xl font-bold text-danger"}>
                    {p.ret12m > 0 ? "+" : ""}{p.ret12m.toFixed(1)}%
                  </div>
                </div>
                <Sparkline data={p.spark} up={p.ret12m > 0} />
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="rounded-md bg-slate-50 px-1 py-1.5">
                  <dt className="text-steel">Max DD</dt>
                  <dd className="font-semibold text-navy">{p.drawdown.toFixed(1)}%</dd>
                </div>
                <div className="rounded-md bg-slate-50 px-1 py-1.5">
                  <dt className="text-steel">Win rate</dt>
                  <dd className="font-semibold text-navy">{p.winRate}%</dd>
                </div>
                <div className="rounded-md bg-slate-50 px-1 py-1.5">
                  <dt className="text-steel">AUM</dt>
                  <dd className="font-semibold text-navy">${(p.aum / 1000).toFixed(0)}k</dd>
                </div>
              </dl>

              <div className="mt-4 flex gap-2">
                <Button variant="primary" className="!flex-1">Copy</Button>
                <Button variant="ghost" className="border border-slate-200 !flex-1">Details</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
