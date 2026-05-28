import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@gio4x/ui";
import { Fingerprint, Key, KeyRound, Laptop, ShieldCheck, Smartphone } from "lucide-react";

const sessions = [
  { id: 1, device: "Chrome on Windows 11 — Vellore, IN", current: true, lastSeen: "Now" },
  { id: 2, device: "iPhone 15 Pro · Safari — Vellore, IN", current: false, lastSeen: "2 hours ago" },
  { id: 3, device: "GIO Raptor for Android — Chennai, IN", current: false, lastSeen: "Yesterday" },
];

const apiKeys = [
  { id: 1, name: "Algo bot — production", created: "2026-04-12", lastUsed: "5 min ago", scopes: ["read", "trade"] },
  { id: 2, name: "Tax export — TurboTax", created: "2026-01-04", lastUsed: "Apr 2026", scopes: ["read"] },
];

export default function SecurityPage() {
  return (
    <Shell title="Security">
      <PageHeader title="Security" subtitle="Sign-in, 2FA, sessions, API keys." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sign-in & 2FA</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 p-3">
              <div className="flex items-start gap-3">
                <KeyRound size={18} className="mt-0.5 text-sky" />
                <div>
                  <div className="text-sm font-medium text-navy">Password</div>
                  <div className="text-[11px] text-steel">Last changed 24 days ago</div>
                </div>
              </div>
              <Button variant="ghost" className="border border-slate-200 !text-xs">Change</Button>
            </div>
            <div className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 p-3">
              <div className="flex items-start gap-3">
                <Smartphone size={18} className="mt-0.5 text-sky" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-navy">Authenticator app (2FA)</span>
                    <StatusBadge tone="success">Enabled</StatusBadge>
                  </div>
                  <div className="text-[11px] text-steel">Google Authenticator · last used Now</div>
                </div>
              </div>
              <Button variant="ghost" className="border border-slate-200 !text-xs">Reconfigure</Button>
            </div>
            <div className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 p-3">
              <div className="flex items-start gap-3">
                <Fingerprint size={18} className="mt-0.5 text-sky" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-navy">Biometric / Passkey</span>
                    <StatusBadge tone="neutral">Off</StatusBadge>
                  </div>
                  <div className="text-[11px] text-steel">Sign in with Face ID, Touch ID, or Windows Hello</div>
                </div>
              </div>
              <Button variant="primary" className="!text-xs">Enable</Button>
            </div>
            <div className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 p-3">
              <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="mt-0.5 text-sky" />
                <div>
                  <div className="text-sm font-medium text-navy">Withdrawal 2FA</div>
                  <div className="text-[11px] text-steel">Always require a second factor for withdrawals</div>
                </div>
              </div>
              <StatusBadge tone="success">On</StatusBadge>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active sessions</CardTitle>
            <button className="text-xs font-medium text-rose-600 hover:underline">Sign out all others</button>
          </CardHeader>
          <CardBody className="space-y-2">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 text-sm">
                <div className="flex items-center gap-3">
                  <Laptop size={16} className="text-steel" />
                  <div>
                    <div className="text-navy">{s.device}</div>
                    <div className="text-[11px] text-steel">{s.lastSeen}</div>
                  </div>
                </div>
                {s.current ? <StatusBadge tone="success">This session</StatusBadge> : <button className="text-xs text-rose-600 hover:underline">Sign out</button>}
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>API keys</CardTitle>
          <Button variant="primary" className="!text-xs">
            <Key size={12} className="mr-1" /> Generate new key
          </Button>
        </CardHeader>
        <CardBody className="space-y-2">
          {apiKeys.map((k) => (
            <div key={k.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 text-sm">
              <div>
                <div className="font-medium text-navy">{k.name}</div>
                <div className="text-[11px] text-steel">
                  Created {k.created} · Last used {k.lastUsed} · Scopes:{" "}
                  {k.scopes.map((s) => (
                    <span key={s} className="ml-1 inline-block rounded bg-slate-100 px-1.5 text-[10px] text-steel">{s}</span>
                  ))}
                </div>
              </div>
              <button className="text-xs text-rose-600 hover:underline">Revoke</button>
            </div>
          ))}
        </CardBody>
      </Card>
    </Shell>
  );
}
