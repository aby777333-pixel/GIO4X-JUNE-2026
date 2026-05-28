import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { MetricGrid } from "@/components/MetricGrid";
import { ProgressRing } from "@/components/ProgressRing";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@gio4x/ui";
import { Award, DollarSign, Star, TrendingUp, Users } from "lucide-react";

export default function SignalProviderPage() {
  return (
    <Shell title="STAR Copy · Signal Provider">
      <PageHeader
        title="Become a Signal Provider"
        subtitle="Share your strategy with the GIO4X network and earn a share of follower performance fees."
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Application — Steps</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            {[
              { step: 1, title: "Track record (3+ months)", done: true, hint: "Verified by linking your live account." },
              { step: 2, title: "Strategy summary", done: true, hint: "Describe your edge, instruments, risk model." },
              { step: 3, title: "Performance fee tier", done: false, hint: "Pick 10%, 20%, or 30% — paid out of follower profits." },
              { step: 4, title: "Identity & tax forms", done: false, hint: "Same KYC as a trader, plus a payout agreement." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
                <div
                  className={
                    s.done
                      ? "flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700"
                      : "flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-steel"
                  }
                >
                  {s.done ? "✓" : s.step}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-navy">{s.title}</div>
                  <div className="text-xs text-steel">{s.hint}</div>
                </div>
                {!s.done ? <Button variant="primary" className="!py-1.5 !text-xs">Complete</Button> : null}
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eligibility</CardTitle>
          </CardHeader>
          <CardBody className="flex flex-col items-center text-center">
            <ProgressRing value={50} size={120} stroke={10} />
            <div className="mt-3 text-sm font-semibold text-navy">50% complete</div>
            <div className="mt-1 text-xs text-steel">2 of 4 steps cleared. Submit the remaining steps to go live.</div>
            <ul className="mt-4 w-full space-y-2 text-left text-xs">
              <li className="flex justify-between"><span className="text-steel">Min track record</span><span className="font-medium text-navy">3 months</span></li>
              <li className="flex justify-between"><span className="text-steel">Min equity</span><span className="font-medium text-navy">$500</span></li>
              <li className="flex justify-between"><span className="text-steel">Max DD allowed</span><span className="font-medium text-navy">30%</span></li>
              <li className="flex justify-between"><span className="text-steel">Min trades</span><span className="font-medium text-navy">30</span></li>
            </ul>
          </CardBody>
        </Card>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-navy">Once you go live</h3>
        <MetricGrid
          columns={4}
          metrics={[
            { label: "Performance fee", value: "Up to 30%", icon: <DollarSign size={14} />, hint: "Paid monthly on watermark profits" },
            { label: "Avg fee earned (top 10)", value: "$2.4k / mo", icon: <Award size={14} /> },
            { label: "Followers (median)", value: "180", icon: <Users size={14} /> },
            { label: "Featured slot rotation", value: "Weekly", icon: <Star size={14} />, hint: "Top performers highlighted on Discover" },
          ]}
        />
      </div>

      <Card className="mt-6 border-sky/20 bg-sky/5">
        <CardBody className="flex items-center gap-3">
          <TrendingUp className="text-sky" />
          <div className="text-xs text-navy flex-1">
            Signal providers retain full control over their trading account. We only mirror trades to
            opted-in followers; you never share login credentials.
          </div>
        </CardBody>
      </Card>
    </Shell>
  );
}
