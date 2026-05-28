import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, Button } from "@gio4x/ui";
import { LINKS } from "@/lib/constants";

export default function DemoAccountPage() {
  return (
    <Shell title="New Demo Account">
      <PageHeader
        title="Create a Demo Account"
        subtitle="Practice with virtual money on real market prices. No KYC required."
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardBody className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-steel">Platform</label>
              <div className="mt-2 grid grid-cols-1 gap-2">
                <button className="flex items-center justify-between rounded-lg border-2 border-sky bg-sky/5 px-3 py-3 text-sm font-medium text-navy">
                  <span>GIO Raptor</span>
                  <span className="text-[10px] uppercase tracking-wider text-sky">Selected</span>
                </button>
              </div>
              <div className="mt-1 text-[11px] text-steel-light">
                One execution engine across web, desktop, and mobile.
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-steel">Account type</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>Premium Demo (USD, 1:500)</option>
                <option>Classic Demo (USD, 1:500)</option>
                <option>ECN Demo (USD, 1:500)</option>
                <option>Cent Demo (USC, 1:500)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-steel">Starting balance</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>$10,000</option>
                <option>$25,000</option>
                <option>$100,000</option>
                <option>$1,000,000</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-steel">Leverage</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>1:500</option>
                <option>1:200</option>
                <option>1:100</option>
                <option>1:50</option>
              </select>
            </div>
            <div className="flex justify-end pt-3">
              <Button variant="primary">Create Demo Account</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3 text-xs text-steel">
            <p>Demo accounts use the same execution engine as live accounts — prices and slippage are real.</p>
            <p>Your demo balance is reset to the starting amount after 90 days of inactivity.</p>
            <p>You can have <strong className="text-navy">up to 5 active demo accounts</strong> at once.</p>
            <p className="border-t border-slate-100 pt-3">
              Ready for live trading?{" "}
              <Link href={LINKS.raptor.register} className="text-sky hover:underline" target="_blank" rel="noreferrer">
                Open a real account →
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </Shell>
  );
}
