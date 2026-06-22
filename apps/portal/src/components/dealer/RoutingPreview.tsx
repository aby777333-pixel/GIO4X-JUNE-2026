"use client";

import { useState, useTransition } from "react";
import { FlaskConical, Loader2, ArrowRight } from "lucide-react";
import { previewRouting, type PreviewInput, type PreviewResult } from "@/lib/dealer-actions";

const BOOK_TONE: Record<string, string> = {
  a_book: "bg-emerald-100 text-emerald-700", b_book: "bg-amber-100 text-amber-700", hybrid: "bg-sky-100 text-sky-700",
};

export function RoutingPreview() {
  const [f, setF] = useState<PreviewInput>({
    accountId: "acc-001", accountType: "vip", clientGroup: "cg-default", tradingGroup: "tg-standard",
    whiteLabel: "gio4x", country: "IN", symbol: "EURUSD", assetClass: "forex", volumeLots: 1, riskScore: 50,
  });
  const [res, setRes] = useState<PreviewResult | null>(null);
  const [pending, start] = useTransition();
  const set = (k: keyof PreviewInput, v: string) => setF((p) => ({ ...p, [k]: k === "volumeLots" || k === "riskScore" ? Number(v) : v }));
  const inp = "rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs";

  function run() {
    start(async () => setRes(await previewRouting(f)));
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <FlaskConical size={16} className="text-sky-600" />
        <h2 className="text-sm font-semibold text-navy">Live Routing Preview</h2>
        <span className="text-[11px] text-steel">— runs the real engine against live book config</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <label className="text-[10px] uppercase text-steel">Symbol<input value={f.symbol} onChange={(e) => set("symbol", e.target.value)} className={inp + " mt-1 block w-full"} /></label>
        <label className="text-[10px] uppercase text-steel">Asset class<input value={f.assetClass} onChange={(e) => set("assetClass", e.target.value)} className={inp + " mt-1 block w-full"} /></label>
        <label className="text-[10px] uppercase text-steel">Account<input value={f.accountId} onChange={(e) => set("accountId", e.target.value)} className={inp + " mt-1 block w-full"} /></label>
        <label className="text-[10px] uppercase text-steel">Trading group<input value={f.tradingGroup} onChange={(e) => set("tradingGroup", e.target.value)} className={inp + " mt-1 block w-full"} /></label>
        <label className="text-[10px] uppercase text-steel">Country<input value={f.country} onChange={(e) => set("country", e.target.value)} className={inp + " mt-1 block w-full"} /></label>
        <label className="text-[10px] uppercase text-steel">Volume (lots)<input value={f.volumeLots} onChange={(e) => set("volumeLots", e.target.value)} className={inp + " mt-1 block w-full"} /></label>
        <label className="text-[10px] uppercase text-steel">Risk score (0-100)<input value={f.riskScore ?? ""} onChange={(e) => set("riskScore", e.target.value)} className={inp + " mt-1 block w-full"} /></label>
        <div className="flex items-end"><button onClick={run} disabled={pending} className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500 disabled:opacity-50">{pending ? <Loader2 size={13} className="animate-spin" /> : <ArrowRight size={13} />} Resolve</button></div>
      </div>

      {res && res.ok && (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 text-[11px] font-semibold uppercase text-steel">Decision</div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${BOOK_TONE[res.decision.book] ?? ""}`}>{res.decision.book}</span>
              <span className="text-steel">exec: <b className="text-navy">{res.decision.executionModel}</b></span>
              {res.decision.needsDealer && <span className="rounded bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">needs dealer</span>}
              {res.decision.lpId && <span className="text-steel">LP: {res.decision.lpId}</span>}
            </div>
            {res.decision.flags.length > 0 && <div className="mt-2 text-[11px] text-steel">flags: {res.decision.flags.join(", ")}</div>}
            <pre className="mt-2 overflow-x-auto rounded bg-white p-2 text-[10px] text-steel">{JSON.stringify(res.decision.ruleSnapshot, null, 2)}</pre>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 text-[11px] font-semibold uppercase text-steel">Resolved config &amp; provenance</div>
            <table className="w-full text-xs">
              <tbody>
                {Object.entries(res.config.resolvedFrom).map(([field, rf]) => (
                  <tr key={field} className="border-b border-slate-100 last:border-0">
                    <td className="py-1 pr-2 font-medium text-navy">{field}</td>
                    <td className="py-1 pr-2 font-mono text-steel">{String((res.config as unknown as Record<string, unknown>)[field] ?? "—")}</td>
                    <td className="py-1 text-right text-[10px] text-steel">{rf.scopeType}{rf.scopeRef ? `:${rf.scopeRef}` : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {res && !res.ok && <div className="mt-3 text-xs text-rose-600">{res.error}</div>}
    </div>
  );
}
