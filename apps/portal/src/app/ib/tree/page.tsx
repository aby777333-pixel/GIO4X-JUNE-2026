import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { MetricGrid } from "@/components/MetricGrid";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";
import { Network, Users, TrendingUp, Layers } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { getSupabaseServer } from "@/lib/supabase-server";

type DownlineRow = {
  child_id: string;
  level: number;
  full_name: string | null;
  status: "active" | "suspended" | "closed" | "archived" | string;
};

export default async function TreePage() {
  const user = await getCurrentUser();

  let rows: DownlineRow[] = [];
  if (user) {
    const supabase = getSupabaseServer();
    const { data } = await supabase
      .from("ib_relationships")
      .select("child_id, level, child:profiles!ib_relationships_child_id_fkey(full_name, status)")
      .eq("parent_id", user.id)
      .order("level", { ascending: true });
    rows = ((data ?? []) as Array<{
      child_id: string;
      level: number;
      child: { full_name: string | null; status: string } | null;
    }>).map((r) => ({
      child_id: r.child_id,
      level: r.level,
      full_name: r.child?.full_name ?? null,
      status: r.child?.status ?? "active",
    }));
  }

  const directs = rows.filter((r) => r.level === 1).length;
  const total = rows.length;
  const deepest = rows.reduce((m, r) => Math.max(m, r.level), 0);

  return (
    <Shell title="Multi-Level IB">
      <PageHeader
        title="Multi-Level IB Tree"
        subtitle="Your downline up to 3 levels deep, with rolled-up volume and commission."
      />

      {!user ? (
        <div className="mb-4 rounded-lg border border-dashed border-slate-200 px-4 py-3 text-xs text-steel">
          <Link href="/auth/login?redirect=/ib/tree" className="font-medium text-sky hover:underline">
            Sign in
          </Link>{" "}
          to view your downline.
        </div>
      ) : null}

      <MetricGrid
        columns={4}
        metrics={[
          { label: "Direct sub-IBs", value: String(directs), icon: <Network size={14} /> },
          { label: "Total downline", value: String(total), icon: <Layers size={14} /> },
          { label: "Deepest level", value: deepest ? `L${deepest}` : "—", icon: <Users size={14} /> },
          { label: "Volume (30D)", value: "—", icon: <TrendingUp size={14} /> },
        ]}
      />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Downline tree</CardTitle>
        </CardHeader>
        <CardBody className="px-0">
          {rows.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-steel">
              No sub-IBs in your downline yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-steel-light">
                <tr>
                  <th className="py-3 pl-4 pr-4 font-medium">Sub-IB</th>
                  <th className="px-4 py-3 text-center font-medium">Level</th>
                  <th className="px-4 py-3 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const name = r.full_name ?? `User ${r.child_id.slice(0, 8)}`;
                  const init = name
                    .split(" ")
                    .map((n) => n[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();
                  return (
                    <tr key={r.child_id} className="border-t border-slate-50">
                      <td className="py-3 pr-4" style={{ paddingLeft: 16 + (r.level - 1) * 28 }}>
                        <div className="flex items-center gap-2">
                          {r.level > 1 ? <span className="text-steel-light">└</span> : null}
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky to-navy text-[10px] font-bold text-white">
                            {init}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-navy">{name}</div>
                            <div className="text-[10px] text-steel">UID {r.child_id.slice(0, 8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="rounded-full bg-sky/10 px-2 py-0.5 text-[10px] font-semibold text-sky">
                          L{r.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <StatusBadge tone={r.status === "active" ? "success" : "neutral"}>
                          {r.status}
                        </StatusBadge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </Shell>
  );
}
