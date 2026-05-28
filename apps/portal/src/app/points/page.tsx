import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@gio4x/ui";
import { StatusBadge } from "@/components/StatusBadge";
import { Coins, Gift, Sparkles, Trophy } from "lucide-react";

const rewards = [
  { id: 1, name: "Trading credit — $25", cost: 2500, category: "Cash" },
  { id: 2, name: "Trading credit — $100", cost: 9500, category: "Cash" },
  { id: 3, name: "AirPods Pro", cost: 22000, category: "Gear" },
  { id: 4, name: "iPad Air (M3)", cost: 78000, category: "Gear" },
  { id: 5, name: "Spread discount — 30 days", cost: 4000, category: "Trading perk" },
  { id: 6, name: "Priority support — 30 days", cost: 1500, category: "Service" },
  { id: 7, name: "GIO4X Hoodie", cost: 1800, category: "Swag" },
  { id: 8, name: "MacBook Air M4", cost: 145000, category: "Gear" },
];

const points = 12480;

export default function PointsMallPage() {
  return (
    <Shell title="POINTS MALL">
      <PageHeader title="POINTS MALL" subtitle="Earn 1 point per traded lot. Redeem for credit, gear, and trading perks." />

      <Card className="mb-6 overflow-hidden">
        <div className="relative bg-gradient-to-r from-white via-sky/5 to-sky/15 px-8 py-7">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sky/20 blur-3xl" />
          <div className="relative flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-sky">Available Points</div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-5xl font-bold text-navy">{points.toLocaleString()}</span>
                <span className="pb-2 text-sm text-steel">pts</span>
              </div>
              <div className="mt-1 text-xs text-steel-light">Lifetime earned: 24,820 · Redeemed: 12,340</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur">
                <div className="text-[10px] uppercase text-steel">Tier</div>
                <div className="mt-1 flex items-center gap-1 text-sm font-bold text-navy">
                  <Trophy size={14} className="text-amber-500" /> Gold
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur">
                <div className="text-[10px] uppercase text-steel">Next tier</div>
                <div className="mt-1 text-sm font-bold text-navy">7,520 pts → Platinum</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rewards catalogue</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {rewards.map((r) => {
              const affordable = points >= r.cost;
              return (
                <div
                  key={r.id}
                  className="flex flex-col rounded-xl border border-slate-100 p-4 transition hover:border-sky/30"
                >
                  <div className="flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 text-3xl">
                    {r.category === "Cash" ? "💵" : r.category === "Gear" ? "🎧" : r.category === "Swag" ? "👕" : r.category === "Service" ? "🎧" : "⚡"}
                  </div>
                  <div className="mt-3 text-sm font-semibold text-navy">{r.name}</div>
                  <div className="mt-0.5 text-[11px] text-steel">{r.category}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm font-bold text-navy">
                      <Coins size={12} className="text-sky" /> {r.cost.toLocaleString()}
                    </span>
                    {affordable ? (
                      <Button variant="primary" className="!py-1.5 !text-xs">Redeem</Button>
                    ) : (
                      <StatusBadge tone="neutral">{(r.cost - points).toLocaleString()} more</StatusBadge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <Card className="mt-6 border-sky/20 bg-sky/5">
        <CardBody className="flex items-center gap-3">
          <Sparkles className="text-sky" />
          <div className="text-xs text-navy">
            Earn faster: <strong>2x points on Gold trades</strong> until 31 May,
            and <strong>3x points on first-trade-of-the-day</strong> all month long.
          </div>
        </CardBody>
      </Card>

      <Card className="mt-6 hidden">
        <CardBody>
          <Gift size={14} />
        </CardBody>
      </Card>
    </Shell>
  );
}
