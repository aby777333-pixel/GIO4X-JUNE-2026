import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { MetricGrid } from "@/components/MetricGrid";
import { Sparkline } from "@/components/Sparkline";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardBody, Button } from "@gio4x/ui";
import { PieChart, TrendingUp, Users, Wallet } from "lucide-react";

const pools = [
  { id: 1, name: "GIO Macro Pool", manager: "Karthik R.", aum: 4.8, investors: 412, ret12m: 32.4, drawdown: 11.2, fee: 20, lockup: "30 days", spark: [100, 104, 108, 112, 115, 118, 122, 126, 128, 130, 131, 132] },
  { id: 2, name: "GIO Yield+ Pool", manager: "Priya M.", aum: 12.4, investors: 1024, ret12m: 18.6, drawdown: 4.8, fee: 15, lockup: "90 days", spark: [100, 102, 103, 105, 107, 109, 111, 113, 115, 116, 118, 119] },
  { id: 3, name: "GIO Aggressive FX", manager: "Anish T.", aum: 2.2, investors: 184, ret12m: 58.2, drawdown: 21.4, fee: 25, lockup: "None", spark: [100, 108, 105, 122, 132, 124, 142, 152, 144, 162, 168, 158] },
];

export default function PammPage() {
  return (
    <Shell title="PAMM">
      <PageHeader
        title="PAMM Pools"
        subtitle="Invest in professionally-managed pools. Your share scales proportionally with the pool's performance."
        actions={
          <Button variant="ghost" className="border border-slate-200">
            Become a Money Manager →
          </Button>
        }
      />

      <MetricGrid
        columns={4}
        metrics={[
          { label: "Active pools", value: String(pools.length), icon: <PieChart size={14} /> },
          { label: "Total AUM", value: `$${pools.reduce((s, p) => s + p.aum, 0).toFixed(1)}M`, icon: <Wallet size={14} /> },
          { label: "Active investors", value: pools.reduce((s, p) => s + p.investors, 0).toLocaleString(), icon: <Users size={14} /> },
          { label: "Median 12M return", value: "+32%", icon: <TrendingUp size={14} />, deltaDirection: "up", delta: "weighted by AUM" },
        ]}
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {pools.map((p) => (
          <Card key={p.id}>
            <CardBody>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-navy">{p.name}</div>
                  <div className="mt-0.5 text-[11px] text-steel">Managed by {p.manager}</div>
                </div>
                <StatusBadge tone={p.drawdown < 10 ? "success" : p.drawdown < 20 ? "warning" : "danger"}>
                  DD {p.drawdown.toFixed(1)}%
                </StatusBadge>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-steel-light">12M return</div>
                  <div className="text-2xl font-bold text-success">+{p.ret12m.toFixed(1)}%</div>
                </div>
                <Sparkline data={p.spark} up />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                <div className="rounded-md bg-slate-50 px-2 py-1.5"><dt className="text-steel">AUM</dt><dd className="font-semibold text-navy">${p.aum.toFixed(1)}M</dd></div>
                <div className="rounded-md bg-slate-50 px-2 py-1.5"><dt className="text-steel">Investors</dt><dd className="font-semibold text-navy">{p.investors}</dd></div>
                <div className="rounded-md bg-slate-50 px-2 py-1.5"><dt className="text-steel">Mgmt fee</dt><dd className="font-semibold text-navy">{p.fee}%</dd></div>
                <div className="rounded-md bg-slate-50 px-2 py-1.5"><dt className="text-steel">Lockup</dt><dd className="font-semibold text-navy">{p.lockup}</dd></div>
              </dl>

              <div className="mt-4 flex gap-2">
                <Button variant="primary" className="!flex-1">Invest</Button>
                <Button variant="ghost" className="border border-slate-200 !flex-1">Tearsheet</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
