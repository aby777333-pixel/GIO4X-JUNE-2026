import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, Button } from "@gio4x/ui";
import { LINKS } from "@/lib/constants";
import { ExternalLink, Monitor, Smartphone } from "lucide-react";

export default function WebTrader4Page() {
  return (
    <Shell title="WebTrader 4">
      <PageHeader
        title="WebTrader 4"
        subtitle="MT4 in the browser — same execution as the desktop terminal, no install."
        actions={
          <Link
            href={LINKS.raptor.webtrader4}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky px-4 py-2 text-xs font-semibold text-white hover:bg-sky-light"
          >
            <ExternalLink size={14} /> Launch WebTrader 4
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h3 className="text-sm font-semibold text-navy">Quick login</h3>
            <div className="mt-3 space-y-3">
              <input
                type="text"
                placeholder="Account number (e.g. 12044510)"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                type="password"
                placeholder="Account password"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>GIO4X-Live02</option>
                <option>GIO4X-Live01</option>
                <option>GIO4X-Demo</option>
              </select>
              <Button variant="primary" className="w-full">Login</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-sm font-semibold text-navy">Also available on</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link href="/downloads" className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-sky/40">
                <Monitor size={14} className="text-sky" /> Desktop
              </Link>
              <Link href="/downloads" className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-sky/40">
                <Smartphone size={14} className="text-sky" /> iOS & Android
              </Link>
            </div>
            <div className="mt-5 text-xs text-steel">
              MT4 supports Expert Advisors (EAs), custom indicators, and 4 chart timeframes. For
              hedging-friendly accounts and deeper feature set, try{" "}
              <Link href="/tools/webtrader5" className="text-sky hover:underline">
                WebTrader 5
              </Link>.
            </div>
          </CardBody>
        </Card>
      </div>
    </Shell>
  );
}
