import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@gio4x/ui";
import { StatusBadge } from "@/components/StatusBadge";
import { Globe2, KeyRound, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { ProfileEditForm } from "./profile-edit-form";

function initials(name: string | null | undefined): string {
  if (!name) return "G4";
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Shell title="Profile">
        <PageHeader title="Profile" subtitle="Manage your personal details, security, and preferences." />
        <Card>
          <CardBody className="!py-12 text-center text-sm text-steel">
            <Link href="/auth/login?redirect=/profile" className="font-medium text-sky hover:underline">
              Sign in
            </Link>{" "}
            to view and edit your profile.
          </CardBody>
        </Card>
      </Shell>
    );
  }

  const p = user.profile;
  const fullName = p?.full_name?.trim() || (user.email ?? "Trader");
  const memberSince = p?.created_at ? new Date(p.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—";

  return (
    <Shell title="Profile">
      <PageHeader title="Profile" subtitle="Manage your personal details, security, and preferences." />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardBody className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky to-navy text-2xl font-bold text-white">
              {initials(fullName)}
            </div>
            <div className="mt-3 text-base font-bold text-navy">{fullName}</div>
            <div className="text-xs text-steel">UID: {user.id.slice(0, 8)} · Member since {memberSince}</div>
            <StatusBadge tone={p?.kyc_status === "approved" ? "success" : "neutral"}>
              {p?.kyc_status === "approved" ? "Verified Trader" : "Unverified"}
            </StatusBadge>
            <div className="mt-5 w-full space-y-2 text-left text-xs">
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-steel" />
                <span className="text-navy">{user.email ?? "—"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-steel" />
                <span className="text-navy">{p?.phone ?? "—"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-steel" />
                <span className="text-navy">{p?.country ?? "—"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 size={12} className="text-steel" />
                <span className="text-navy">
                  {p?.language ?? "en"} · {p?.timezone ?? "UTC"}
                </span>
              </div>
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
              <ProfileEditForm
                initial={{
                  full_name: p?.full_name ?? "",
                  phone: p?.phone ?? null,
                  country: p?.country ?? null,
                  language: p?.language ?? "en",
                  timezone: p?.timezone ?? "UTC",
                  avatar_url: p?.avatar_url ?? null,
                }}
              />
            </CardHeader>
            <CardBody>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Full name</dt>
                  <dd className="mt-0.5 text-navy">{fullName}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Email</dt>
                  <dd className="mt-0.5 text-navy">{user.email ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Phone</dt>
                  <dd className="mt-0.5 text-navy">{p?.phone ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Country</dt>
                  <dd className="mt-0.5 text-navy">{p?.country ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Language</dt>
                  <dd className="mt-0.5 text-navy">{p?.language ?? "en"}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Timezone</dt>
                  <dd className="mt-0.5 text-navy">{p?.timezone ?? "UTC"}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[11px] uppercase tracking-wider text-steel-light">Referral code</dt>
                  <dd className="mt-0.5 font-mono text-navy">{p?.referral_code ?? "—"}</dd>
                </div>
              </dl>
            </CardBody>
          </Card>

          <Card className="border-sky/20 bg-sky/5">
            <CardBody className="flex items-center gap-3">
              <ShieldCheck className="text-sky" />
              <div className="min-w-0 flex-1 text-xs text-navy">
                Profile information must match the documents you submitted for KYC. Material changes
                may trigger re-verification.
              </div>
              <Link
                href="/verification"
                className="rounded-lg bg-sky px-3 py-1.5 text-xs font-semibold text-white"
              >
                View verification
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
