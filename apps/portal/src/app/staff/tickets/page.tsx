import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody } from "@gio4x/ui";
import { StatusBadge, type StatusTone } from "@/components/StatusBadge";
import { getSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

type Status = "open" | "in_progress" | "waiting_customer" | "resolved" | "closed";
type Priority = "low" | "normal" | "high" | "urgent";

const STATUS_FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "in_progress", label: "In progress" },
  { key: "waiting_customer", label: "Waiting" },
  { key: "resolved", label: "Resolved" },
  { key: "closed", label: "Closed" },
];

function statusTone(status: Status): StatusTone {
  if (status === "resolved" || status === "closed") return "success";
  if (status === "in_progress") return "info";
  return "warning";
}

function priorityTone(priority: Priority): StatusTone {
  if (priority === "urgent") return "danger";
  if (priority === "high") return "warning";
  if (priority === "normal") return "info";
  return "neutral";
}

export default async function StaffTicketsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const active = searchParams.status ?? "all";
  const supabase = getSupabaseServer();

  let query = supabase
    .from("support_tickets")
    .select("id, ticket_ref, subject, status, priority, category, assigned_staff, updated_at, user_id")
    .order("updated_at", { ascending: false })
    .limit(200);

  if (active !== "all") query = query.eq("status", active as Status);

  const { data: tickets } = await query;
  const rows = tickets ?? [];

  // Resolve customer names.
  const userIds = Array.from(new Set(rows.map((t) => t.user_id)));
  const nameMap = new Map<string, string>();
  if (userIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", userIds);
    for (const p of profiles ?? []) {
      nameMap.set(p.id, p.full_name?.trim() || p.email || "Customer");
    }
  }

  return (
    <>
      <PageHeader title="Tickets" subtitle="All customer support tickets." />

      <div className="mb-4 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <Link
            key={f.key}
            href={f.key === "all" ? "/staff/tickets" : `/staff/tickets?status=${f.key}`}
            className={
              active === f.key
                ? "rounded-full bg-navy px-3 py-1 text-xs font-medium text-white"
                : "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-steel transition hover:border-sky/30 hover:text-navy"
            }
          >
            {f.label}
          </Link>
        ))}
      </div>

      <Card>
        <CardBody className="space-y-2">
          {rows.length === 0 ? (
            <p className="py-8 text-center text-sm text-steel">No tickets match this filter.</p>
          ) : (
            rows.map((t) => (
              <Link
                key={t.id}
                href={`/staff/tickets/${t.id}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2.5 transition hover:border-sky/30 hover:bg-sky/5"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-navy">{t.subject}</div>
                  <div className="flex items-center gap-2 text-[11px] text-steel-light">
                    <span className="font-mono">{t.ticket_ref}</span>
                    <span>·</span>
                    <span>{nameMap.get(t.user_id) ?? "Customer"}</span>
                    <span>·</span>
                    <span>{t.category}</span>
                    {!t.assigned_staff ? (
                      <>
                        <span>·</span>
                        <span className="font-medium text-amber-600">unassigned</span>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge tone={priorityTone(t.priority as Priority)}>
                    {t.priority}
                  </StatusBadge>
                  <StatusBadge tone={statusTone(t.status as Status)}>
                    {(t.status as string).replace("_", " ")}
                  </StatusBadge>
                </div>
              </Link>
            ))
          )}
        </CardBody>
      </Card>
    </>
  );
}
