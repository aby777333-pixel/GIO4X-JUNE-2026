import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@gio4x/ui";
import { StatusBadge } from "@/components/StatusBadge";
import { Bell, Globe2, KeyRound, Mail, MapPin, Phone, ShieldCheck, UserCircle2 } from "lucide-react";

export default function ProfilePage() {
  return (
    <Shell title="Profile">
      <PageHeader title="Profile" subtitle="Manage your personal details, security, and preferences." />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardBody className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky to-navy text-2xl font-bold text-white">
              SG
            </div>
            <div className="mt-3 text-base font-bold text-navy">Sankar G</div>
            <div className="text-xs text-steel">UID: 1701808 · Member since Mar 2024</div>
            <StatusBadge tone="success">Verified Trader</StatusBadge>
            <div className="mt-5 w-full space-y-2 text-left text-xs">
              <div className="flex items-center gap-2"><Mail size={12} className="text-steel" /><span className="text-navy">sankar.g@gio4x.com</span></div>
              <div className="flex items-center gap-2"><Phone size={12} className="text-steel" /><span className="text-navy">+91 98765 43210</span></div>
              <div className="flex items-center gap-2"><MapPin size={12} className="text-steel" /><span className="text-navy">Vellore, Tamil Nadu, IN</span></div>
              <div className="flex items-center gap-2"><Globe2 size={12} className="text-steel" /><span className="text-navy">English (India)</span></div>
            </div>
            <Link href="/security" className="mt-5 w-full">
              <Button variant="ghost" className="w-full border border-slate-200">
                <KeyRound size={12} className="mr-1" /> Security & 2FA
              </Button>
            </Link>
          </CardBody>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal information</CardTitle>
              <button className="text-xs font-medium text-sky hover:underline">Edit</button>
            </CardHeader>
            <CardBody>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Full name</dt>
                  <dd className="mt-0.5 text-navy">Sankar G</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Date of birth</dt>
                  <dd className="mt-0.5 text-navy">12 Aug 1992</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Citizenship</dt>
                  <dd className="mt-0.5 text-navy">India</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Residency</dt>
                  <dd className="mt-0.5 text-navy">India</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Address</dt>
                  <dd className="mt-0.5 text-navy">No 48 Immanual Complex, Thirunagar Katpadi, Vellore — 632006</dd>
                </div>
              </dl>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trader profile</CardTitle>
            </CardHeader>
            <CardBody>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Trading experience</dt>
                  <dd className="mt-0.5 text-navy">5+ years</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Trading objective</dt>
                  <dd className="mt-0.5 text-navy">Active income</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Risk appetite</dt>
                  <dd className="mt-0.5 text-navy">Aggressive</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Primary instruments</dt>
                  <dd className="mt-0.5 text-navy">Forex, Gold, Indices</dd>
                </div>
              </dl>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
            </CardHeader>
            <CardBody className="space-y-2">
              {[
                { label: "Email — deposits & withdrawals", on: true },
                { label: "Email — trading account alerts", on: true },
                { label: "Email — promotions & product news", on: false },
                { label: "SMS — withdrawal authorisation", on: true },
                { label: "Push — margin call warnings", on: true },
                { label: "Push — IB downline events", on: false },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-50">
                  <span className="flex items-center gap-2 text-sm text-navy">
                    <Bell size={12} className="text-steel" /> {row.label}
                  </span>
                  <span
                    className={
                      row.on
                        ? "h-5 w-9 rounded-full bg-sky relative after:absolute after:right-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white"
                        : "h-5 w-9 rounded-full bg-slate-200 relative after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white"
                    }
                  />
                </div>
              ))}
            </CardBody>
          </Card>

          <Card className="border-sky/20 bg-sky/5">
            <CardBody className="flex items-center gap-3">
              <ShieldCheck className="text-sky" />
              <div className="min-w-0 flex-1 text-xs text-navy">
                Profile information must match the documents you submitted for KYC. Material changes
                may trigger re-verification.
              </div>
              <Link href="/verification" className="rounded-lg bg-sky px-3 py-1.5 text-xs font-semibold text-white">
                View verification
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
