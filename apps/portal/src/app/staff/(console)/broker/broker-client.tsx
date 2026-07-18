"use client";

// Broker Control Center UI (§16 increment 1). Every control writes the LIVE
// terminal instruments table through the audited server action. Honesty
// labels state exactly where each field is enforced.

import { useState, useTransition } from "react";
import { Card, CardBody } from "@gio4x/ui";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { ShieldAlert } from "lucide-react";
import { updateBrokerInstrument, type BrokerInstrument, type BrokerAuditRow } from "@/lib/broker-actions";

function NumberCell({
  symbol, field, value, step, onSaved, onError,
}: {
  symbol: string; field: string; value: number; step?: string;
  onSaved: (msg: string) => void; onError: (msg: string) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  const [pending, startTransition] = useTransition();
  const dirty = draft !== String(value) && draft.trim() !== "";
  const save = () =>
    startTransition(async () => {
      const r = await updateBrokerInstrument(symbol, field, draft);
      if (r.ok) onSaved(`${symbol} ${field} → ${draft}`);
      else { onError(r.error ?? "Update failed"); setDraft(String(value)); }
    });
  return (
    <span className="inline-flex items-center gap-1">
      <input
        value={draft}
        step={step}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && dirty) save(); }}
        disabled={pending}
        className="w-16 rounded border border-steel/25 bg-white px-1.5 py-0.5 text-right font-mono text-[11px] text-navy outline-none focus:border-sky disabled:opacity-50"
      />
      {dirty && (
        <button onClick={save} disabled={pending} className="rounded bg-sky px-1.5 py-0.5 text-[10px] font-bold text-white disabled:opacity-50">
          ✓
        </button>
      )}
    </span>
  );
}

export function BrokerControls({
  instruments, audit,
}: {
  instruments: BrokerInstrument[] | null;
  audit: BrokerAuditRow[] | null;
}) {
  const [rows, setRows] = useState<BrokerInstrument[]>(instruments ?? []);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const saved = (msg: string) => { setNotice(`Saved: ${msg} (audited)`); setError(null); };
  const failed = (msg: string) => { setError(msg); setNotice(null); };

  const toggleActive = (r: BrokerInstrument) =>
    startTransition(async () => {
      const next = !r.is_active;
      const res = await updateBrokerInstrument(r.symbol, "is_active", next);
      if (res.ok) {
        setRows((prev) => prev.map((x) => (x.symbol === r.symbol ? { ...x, is_active: next } : x)));
        saved(`${r.symbol} trading ${next ? "ENABLED" : "DISABLED"}`);
      } else failed(res.error ?? "Update failed");
    });

  const setRouting = (r: BrokerInstrument, mode: string) =>
    startTransition(async () => {
      const res = await updateBrokerInstrument(r.symbol, "routing_mode", mode);
      if (res.ok) {
        setRows((prev) => prev.map((x) => (x.symbol === r.symbol ? { ...x, routing_mode: mode } : x)));
        saved(`${r.symbol} routing → ${mode}`);
      } else failed(res.error ?? "Update failed");
    });

  if (instruments == null) {
    return (
      <div className="space-y-4">
        <PageHeader title="Broker Controls" subtitle="Per-symbol trading controls on the live Raptor terminal" />
        <Card><CardBody>
          <p className="text-sm text-steel">
            Terminal connection unavailable or you are not granted the Broker Controls section.
            The bridge reads the terminal URL and service key from bridge_secrets — check Tech Hub → Bridge.
          </p>
        </CardBody></Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Broker Controls"
        subtitle="Per-symbol trading rules enforced on the live Raptor terminal — every change is audited"
      />

      {(notice || error) && (
        <div className={`rounded-lg border px-3 py-2 text-sm ${error ? "border-danger/40 bg-danger/5 text-danger" : "border-success/40 bg-success/5 text-success"}`}>
          {error ?? notice}
        </div>
      )}

      <Card>
        <CardBody className="overflow-x-auto p-0">
          <table className="w-full min-w-[900px] text-left text-[12px]">
            <thead>
              <tr className="border-b border-steel/25 text-[10px] uppercase tracking-wide text-steel">
                <th className="px-3 py-2">Symbol</th>
                <th className="px-3 py-2">Trading</th>
                <th className="px-3 py-2 text-right">Commission /lot</th>
                <th className="px-3 py-2 text-right">Swap long /lot/day</th>
                <th className="px-3 py-2 text-right">Swap short /lot/day</th>
                <th className="px-3 py-2 text-right">Min lot</th>
                <th className="px-3 py-2 text-right">Max lot</th>
                <th className="px-3 py-2 text-right">Spread markup</th>
                <th className="px-3 py-2">Routing</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.symbol} className="border-b border-steel/10 hover:bg-sky/5">
                  <td className="px-3 py-2">
                    <div className="font-semibold text-navy">{r.symbol}</div>
                    <div className="text-[10px] capitalize text-steel">{r.type}{r.session_hours ? ` · ${r.session_hours}` : ""}</div>
                  </td>
                  <td className="px-3 py-2">
                    <button onClick={() => toggleActive(r)} disabled={pending} className="disabled:opacity-50">
                      <StatusBadge tone={r.is_active ? "success" : "danger"}>
                        {r.is_active ? "Enabled" : "Disabled"}
                      </StatusBadge>
                    </button>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <NumberCell symbol={r.symbol} field="commission_per_lot" value={r.commission_per_lot} step="0.5" onSaved={saved} onError={failed} />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <NumberCell symbol={r.symbol} field="swap_long" value={r.swap_long} step="0.1" onSaved={saved} onError={failed} />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <NumberCell symbol={r.symbol} field="swap_short" value={r.swap_short} step="0.1" onSaved={saved} onError={failed} />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <NumberCell symbol={r.symbol} field="min_lot" value={r.min_lot} step="0.01" onSaved={saved} onError={failed} />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <NumberCell symbol={r.symbol} field="max_lot" value={r.max_lot} step="1" onSaved={saved} onError={failed} />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <NumberCell symbol={r.symbol} field="spread_markup" value={r.spread_markup} step="0.1" onSaved={saved} onError={failed} />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={r.routing_mode}
                      onChange={(e) => setRouting(r, e.target.value)}
                      disabled={pending}
                      className="rounded border border-steel/25 bg-white px-1.5 py-0.5 text-[11px] text-navy outline-none disabled:opacity-50"
                    >
                      <option value="a_book">A-Book</option>
                      <option value="b_book">B-Book</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy">
            <ShieldAlert className="h-4 w-4 text-sky" /> Where each control is enforced
          </div>
          <ul className="space-y-1 text-[12px] text-steel">
            <li>• <b>Trading Enabled/Disabled, Min/Max lot, Commission</b> — enforced by the terminal&apos;s <code>place_market_order</code>: disabled symbols reject new orders; lots outside bounds reject; commission is charged per lot at open.</li>
            <li>• <b>Swap long/short</b> — applied by <code>close_position</code>: whole calendar days held × rate × lots, added to realized P&amp;L (negative = cost to the trader). Triple-swap Wednesday is not applied yet.</li>
            <li>• <b>Routing</b> — consumed by the Dealer Desk bridge (A/B-book assignment sync).</li>
            <li>• <b>Spread markup</b> — stored broker config read by the pricing layer; the terminal&apos;s demo feed does not add it to displayed quotes yet.</li>
            <li>• Traders have no access to any of this: writes go through the staff-only service-role bridge and are recorded in the audit trail below.</li>
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="mb-2 text-sm font-semibold text-navy">Recent changes (broker_config_audit)</div>
          {(audit ?? []).length === 0 ? (
            <p className="text-[12px] text-steel">No configuration changes recorded yet.</p>
          ) : (
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="border-b border-steel/25 text-[10px] uppercase tracking-wide text-steel">
                  <th className="px-2 py-1.5">When (UTC)</th>
                  <th className="px-2 py-1.5">Actor</th>
                  <th className="px-2 py-1.5">Symbol</th>
                  <th className="px-2 py-1.5">Field</th>
                  <th className="px-2 py-1.5">Old → New</th>
                </tr>
              </thead>
              <tbody>
                {(audit ?? []).map((a, i) => (
                  <tr key={i} className="border-b border-steel/10">
                    <td className="whitespace-nowrap px-2 py-1.5 font-mono text-steel">{new Date(a.changed_at).toISOString().slice(0, 16).replace("T", " ")}</td>
                    <td className="px-2 py-1.5 text-navy">{a.actor}</td>
                    <td className="px-2 py-1.5 font-mono text-navy">{a.symbol}</td>
                    <td className="px-2 py-1.5 text-steel">{a.field}</td>
                    <td className="px-2 py-1.5 font-mono text-steel">{a.old_value ?? "—"} → <span className="text-navy">{a.new_value ?? "—"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
