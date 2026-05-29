import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody } from "@gio4x/ui";
import { StatusBadge, type StatusTone } from "@/components/StatusBadge";
import { UserCircle2 } from "lucide-react";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

type KycStatus = string;

function kycTone(status: KycStatus): StatusTone {
  if (status === "verified" || status === "approved") return "success";
  if (status === "rejected") return "danger";
  if (status === "pending" || status === "in_review") return "warning";
  return "neutral";
}

export default async function StaffCustomersPage() {
  const supabase = getSupabaseServer();

  const { data: customers } = await supabase
    .from("profiles")
    .select("id, full_name, email, country, role, kyc_status, status, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const rows = customers ?? [];

  return (
    <>
      <PageHeader title="Customers" subtitle="All registered users." />

      <Card>
        <CardBody className="space-y-2">
          {rows.length === 0 ? (
            <p className="py-8 text-center text-sm text-steel">No customers found.</p>
          ) : (
            rows.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-steel">
                    <UserCircle2 size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-navy">
                      {c.full_name?.trim() || c.email || "Unnamed"}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-steel-light">
                      {c.email ? <span className="truncate">{c.email}</span> : null}
                      {c.country ? (
                        <>
                          <span>·</span>
                          <span>{c.country}</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge tone="neutral">{c.role}</StatusBadge>
                  <StatusBadge tone={kycTone(c.kyc_status as string)}>
                    {(c.kyc_status as string).replace("_", " ")}
                  </StatusBadge>
                </div>
              </div>
            ))
          )}
        </CardBody>
      </Card>
    </>
  );
}
