import { Card, CardBody, CardHeader, CardTitle, StatTile } from "@gio4x/ui";
import { PageHeader } from "@/components/PageHeader";
import { loadUnsettledIbs } from "@/lib/ib-actions";
import { formatMoney } from "@/lib/fee-constants";
import { SettleButton, LinkIbTool } from "./ib-tools";
import { Network, Coins, Users, Wallet } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StaffIbPage() {
  const unsettled = await loadUnsettledIbs();
  const totalPending = unsettled.reduce((s, x) => s + x.pending, 0);
  const ibCount = new Set(unsettled.map((x) => x.ib_user_id)).size;

  const tiles = [
    {
      label: "Accrued commission",
      value: formatMoney(totalPending),
      unit: "unsettled",
      icon: <Coins size={16} />,
    },
    { label: "IBs awaiting payout", value: String(ibCount), unit: "", icon: <Users size={16} /> },
    { label: "Ledger lines", value: String(unsettled.reduce((s, x) => s + x.rows, 0)), unit: "", icon: <Wallet size={16} /> },
  ];

  return (
    <>
      <PageHeader
        title="IB Network"
        subtitle="Multi-tier introducing-broker tree. Commission accrues per closed trade and rolls up every ancestor level; settle it here to pay accrued balances into each IB's wallet."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {tiles.map((t) => (
          <StatTile key={t.label} icon={t.icon} label={t.label} value={t.value} unit={t.unit} />
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Commission settlement queue</CardTitle>
        </CardHeader>
        <CardBody className="space-y-2">
          {unsettled.length === 0 ? (
            <p className="py-8 text-center text-sm text-steel">
              No accrued commission to settle. Book trades for referred clients to see balances roll up here.
            </p>
          ) : (
            unsettled.map((ib) => (
              <div
                key={`${ib.ib_user_id}:${ib.currency}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky/10 text-sky">
                    <Network size={15} />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-navy">
                      {ib.full_name || ib.email || `IB ${ib.ib_user_id.slice(0, 8)}`}
                    </div>
                    <div className="text-[11px] text-steel-light">
                      {ib.rows} ledger line{ib.rows === 1 ? "" : "s"} · {ib.currency}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-emerald-600">
                    {formatMoney(ib.pending, ib.currency)}
                  </span>
                  <SettleButton ib={ib} />
                </div>
              </div>
            ))
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Link an IB relationship</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="mb-3 text-xs text-steel">
            Manually place a client or sub-IB under a parent IB (for accounts that didn&apos;t sign up via a
            referral link). The full ancestor tree is rebuilt automatically so commission rolls up every level.
          </p>
          <LinkIbTool />
        </CardBody>
      </Card>
    </>
  );
}
