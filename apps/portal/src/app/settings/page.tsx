import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";

export default function SettingsPage() {
  return (
    <Shell title="Settings">
      <PageHeader title="Settings" subtitle="Language, time zone, and display preferences." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
          <CardBody className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-steel">Density</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>Comfortable</option>
                <option>Compact</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-steel">Sidebar</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>Expanded</option>
                <option>Collapsed (icons only)</option>
                <option>Auto (collapse on mobile)</option>
              </select>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Region</CardTitle></CardHeader>
          <CardBody className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-steel">Language</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>English</option>
                <option>हिन्दी</option>
                <option>தமிழ்</option>
                <option>العربية</option>
                <option>中文</option>
                <option>Español</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-steel">Time zone</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>Asia/Kolkata (IST, UTC+5:30)</option>
                <option>UTC</option>
                <option>Asia/Dubai</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-steel">Display currency</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>USD</option>
                <option>INR</option>
                <option>EUR</option>
                <option>AED</option>
                <option>BTC</option>
              </select>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Trading defaults</CardTitle></CardHeader>
          <CardBody className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-steel">Default account for new trades</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>12044510 — Classic</option>
                <option>15624153 — Swap-Free STP</option>
                <option>Ask each time</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-steel">Default lot size</label>
              <input type="number" defaultValue={0.1} step={0.01} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-steel">Confirm before each trade</label>
              <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <option>Always</option>
                <option>Only for size &gt; 1 lot</option>
                <option>Never</option>
              </select>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Privacy</CardTitle></CardHeader>
          <CardBody className="space-y-3 text-sm">
            <label className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
              <span className="text-navy">Allow GIO4X to use my trade data for product improvement</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
              <span className="text-navy">Personalised marketing emails</span>
              <input type="checkbox" />
            </label>
            <label className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
              <span className="text-navy">Show me in public leaderboards</span>
              <input type="checkbox" defaultChecked />
            </label>
          </CardBody>
        </Card>
      </div>
    </Shell>
  );
}
