import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { MetricGrid } from "@/components/MetricGrid";
import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";
import { LINKS } from "@/lib/constants";
import { Copy, MousePointerClick, QrCode, Link2, Users } from "lucide-react";

const links = [
  { label: "Live account sign-up", url: `${LINKS.raptor.register}?affid=MzQ0OTY=`, clicks: 1240, signups: 86 },
  { label: "Demo account sign-up", url: `${LINKS.raptor.register}?demo=1&affid=MzQ0OTY=`, clicks: 580, signups: 122 },
  { label: "GIO4X website homepage", url: `${LINKS.website.home}?affid=MzQ0OTY=`, clicks: 2840, signups: 0 },
  { label: "Open in Raptor terminal", url: `${LINKS.raptor.terminal}?affid=MzQ0OTY=`, clicks: 412, signups: 28 },
];

export default function ReferralsPage() {
  return (
    <Shell title="Referral Links">
      <PageHeader title="Referral Links" subtitle="Trackable URLs and QR codes for your IB code." />

      <MetricGrid
        columns={4}
        metrics={[
          { label: "Total clicks (30D)", value: "5,072", icon: <MousePointerClick size={14} />, deltaDirection: "up", delta: "+18% MoM" },
          { label: "Sign-ups (30D)", value: "236", icon: <Users size={14} /> },
          { label: "Conversion", value: "4.7%", icon: <Link2 size={14} /> },
          { label: "FTD ratio", value: "62%", icon: <QrCode size={14} /> },
        ]}
      />

      <div className="mt-6 space-y-3">
        {links.map((l) => (
          <Card key={l.label}>
            <CardBody>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-navy">{l.label}</div>
                  <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-[11px] text-steel">
                    <span className="truncate">{l.url}</span>
                    <button className="ml-auto shrink-0 rounded-md bg-sky px-2 py-1 text-[10px] font-medium text-white">
                      <Copy size={10} className="inline" /> Copy
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right"><div className="text-steel">Clicks</div><div className="font-semibold text-navy">{l.clicks.toLocaleString()}</div></div>
                  <div className="text-right"><div className="text-steel">Sign-ups</div><div className="font-semibold text-navy">{l.signups}</div></div>
                  <button className="rounded-md border border-slate-200 px-2 py-1.5 text-steel hover:border-sky/40 hover:text-sky">
                    <QrCode size={12} className="inline" /> QR
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Custom referral builder</CardTitle></CardHeader>
        <CardBody>
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className="block text-xs font-medium text-steel">Destination</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>Live account sign-up</option>
                <option>Demo account sign-up</option>
                <option>GIO4X homepage</option>
                <option>Specific landing page</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-steel">Sub-ID (optional)</label>
              <input type="text" placeholder="e.g. youtube-ad-may" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </div>
            <div className="flex items-end">
              <button className="w-full rounded-lg bg-sky px-3 py-2 text-xs font-semibold text-white hover:bg-sky-light">Generate</button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Shell>
  );
}
