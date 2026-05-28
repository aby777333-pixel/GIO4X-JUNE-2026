import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, Button } from "@gio4x/ui";
import { LINKS } from "@/lib/constants";
import { ExternalLink, Monitor, Smartphone } from "lucide-react";

export default function WebTrader5Page() {
  return (
    <Shell title="WebTrader 5">
      <PageHeader
        title="WebTrader 5"
        subtitle="MT5 in the browser — supports stocks, futures, and deeper analytics."
        actions={
          <Link
            href={LINKS.raptor.webtrader5}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky px-4 py-2 text-xs font-semibold text-white hover:bg-sky-light"
          >
            <ExternalLink size={14} /> Launch WebTrader 5
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
                placeholder="Account number (e.g. 15624153)"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                type="password"
                placeholder="Account password"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>GIO4X-Live01</option>
                <option>GIO4X-Live02</option>
                <option>GIO4X-Demo</option>
              </select>
              <Button variant="primary" className="w-full">Login</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-sm font-semibold text-navy">What MT5 adds over MT4</h3>
            <ul className="mt-3 space-y-2 text-xs text-steel">
              <li>21 timeframes vs 9 in MT4</li>
              <li>Built-in depth of market</li>
              <li>Native economic calendar</li>
              <li>Hedging + Netting modes</li>
              <li>Stocks, futures, and exchange-traded instruments</li>
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link href="/downloads" className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-sky/40">
                <Monitor size={14} className="text-sky" /> Desktop
              </Link>
              <Link href="/downloads" className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-sky/40">
                <Smartphone size={14} className="text-sky" /> iOS & Android
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </Shell>
  );
}
