import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { ProgressRing } from "@/components/ProgressRing";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@gio4x/ui";
import { Camera, FileCheck, FileText, IdCard, ShieldCheck, UploadCloud } from "lucide-react";

const steps = [
  {
    title: "Personal Information",
    status: "complete",
    detail: "Full name, date of birth, country of residence.",
    icon: FileText,
  },
  {
    title: "Identity Document",
    status: "complete",
    detail: "Passport or government-issued ID.",
    icon: IdCard,
  },
  {
    title: "Selfie Verification",
    status: "in-review",
    detail: "Live photo holding your ID. Reviewed within 10 minutes.",
    icon: Camera,
  },
  {
    title: "Proof of Address",
    status: "pending",
    detail: "Utility bill or bank statement < 3 months old.",
    icon: FileCheck,
  },
] as const;

const toneFor = {
  complete: "success",
  "in-review": "info",
  pending: "neutral",
} as const;

const labelFor = {
  complete: "Verified",
  "in-review": "In review",
  pending: "Action needed",
} as const;

export default function VerificationPage() {
  const completed = steps.filter((s) => s.status === "complete").length;
  const percent = (completed / steps.length) * 100;

  return (
    <Shell title="Verification">
      <PageHeader
        title="KYC Verification"
        subtitle="Complete verification to unlock withdrawals, higher limits, and all GIO4X products."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Card>
          <CardBody className="flex flex-col items-center">
            <ProgressRing value={percent} size={140} stroke={10} />
            <div className="mt-4 text-center">
              <div className="text-sm font-semibold text-navy">
                {completed} of {steps.length} complete
              </div>
              <div className="mt-1 text-xs text-steel">
                Verification typically finishes in under 10 minutes during business hours.
              </div>
            </div>
            <div className="mt-5 w-full space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-steel">Withdrawals</span>
                <StatusBadge tone="warning">Locked</StatusBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-steel">Live trading</span>
                <StatusBadge tone="success">Active</StatusBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-steel">Daily deposit limit</span>
                <span className="font-medium text-navy">$1,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-steel">After verification</span>
                <span className="font-medium text-success">$50,000 / day</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification steps</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="flex items-start gap-4 rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-navy">{s.title}</span>
                      <StatusBadge tone={toneFor[s.status]}>{labelFor[s.status]}</StatusBadge>
                    </div>
                    <div className="mt-0.5 text-xs text-steel">{s.detail}</div>
                  </div>
                  {s.status === "pending" ? (
                    <Button variant="primary" className="!py-1.5 !text-xs">
                      <UploadCloud size={12} className="mr-1" /> Upload
                    </Button>
                  ) : null}
                </div>
              );
            })}
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6 border-sky/20 bg-sky/5">
        <CardBody className="flex flex-wrap items-center gap-4">
          <ShieldCheck className="text-sky" size={28} />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-navy">Your documents are encrypted in transit and at rest.</div>
            <div className="mt-0.5 text-xs text-steel">
              GIO4X is regulated under the Financial Services Authority of Anjouan (License 15807).
              We share documents only with regulators when legally required.
            </div>
          </div>
        </CardBody>
      </Card>
    </Shell>
  );
}
