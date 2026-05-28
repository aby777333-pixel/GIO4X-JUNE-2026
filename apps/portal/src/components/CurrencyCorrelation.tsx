// Currency-pair correlation matrix — indicative 30-day rolling values for
// major FX pairs + gold. Pure presentation, no runtime data fetch; values
// are intentionally hardcoded "indicative" snapshots so the table renders
// instantly server-side and survives offline / API-rate-limit conditions.
// Swap to a live feed (TwelveData / EOD) by lifting `MATRIX` into a server
// loader; the row/col axes stay the same.

import type { ReactNode } from "react";

export const CORRELATION_PAIRS = [
  "EUR/USD",
  "GBP/USD",
  "USD/JPY",
  "USD/CHF",
  "AUD/USD",
  "USD/CAD",
  "NZD/USD",
  "XAU/USD",
] as const;

// 8x8 matrix, symmetric, diagonal = 1. Values are widely-cited indicative
// 30-day correlations among major pairs (see e.g. Mataf / OANDA correlation
// tables). Adjust freely — the rendering doesn't care about the magnitudes.
export const CORRELATION_MATRIX: number[][] = [
  // EUR/USD  GBP/USD USD/JPY USD/CHF AUD/USD USD/CAD NZD/USD XAU/USD
  [   1.00,    0.85,  -0.55,  -0.92,   0.75,  -0.55,   0.70,   0.40 ], // EUR/USD
  [   0.85,    1.00,  -0.45,  -0.78,   0.70,  -0.50,   0.65,   0.35 ], // GBP/USD
  [  -0.55,   -0.45,   1.00,   0.55,  -0.30,   0.45,  -0.25,  -0.40 ], // USD/JPY
  [  -0.92,   -0.78,   0.55,   1.00,  -0.65,   0.60,  -0.60,  -0.45 ], // USD/CHF
  [   0.75,    0.70,  -0.30,  -0.65,   1.00,  -0.55,   0.92,   0.65 ], // AUD/USD
  [  -0.55,   -0.50,   0.45,   0.60,  -0.55,   1.00,  -0.55,  -0.30 ], // USD/CAD
  [   0.70,    0.65,  -0.25,  -0.60,   0.92,  -0.55,   1.00,   0.55 ], // NZD/USD
  [   0.40,    0.35,  -0.40,  -0.45,   0.65,  -0.30,   0.55,   1.00 ], // XAU/USD
];

// Map a correlation [-1, 1] into a Tailwind background + text tone.
// Diagonal (== 1) gets a distinct navy treatment so the eye locks on it.
function cellTone(v: number, isDiagonal: boolean): { bg: string; text: string } {
  if (isDiagonal) return { bg: "bg-navy", text: "text-white" };
  if (v >= 0.8)  return { bg: "bg-emerald-500/90",  text: "text-white" };
  if (v >= 0.5)  return { bg: "bg-emerald-300/80",  text: "text-emerald-950" };
  if (v >= 0.2)  return { bg: "bg-emerald-100",     text: "text-emerald-900" };
  if (v > -0.2)  return { bg: "bg-slate-100",       text: "text-steel" };
  if (v > -0.5)  return { bg: "bg-rose-100",        text: "text-rose-900" };
  if (v > -0.8)  return { bg: "bg-rose-300/80",     text: "text-rose-950" };
  return            { bg: "bg-rose-500/90",     text: "text-white" };
}

function fmt(v: number): string {
  if (v >= 1) return "1.00";
  if (v <= -1) return "-1.00";
  const s = v.toFixed(2);
  return v > 0 ? `+${s}` : s;
}

function LegendChip({ swatch, label }: { swatch: string; label: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block h-3 w-3 rounded ${swatch}`} />
      <span className="text-[10px] text-steel">{label}</span>
    </span>
  );
}

export function CurrencyCorrelation() {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-steel">FX research</div>
          <div className="mt-0.5 text-base font-semibold text-navy">Pair correlation matrix</div>
          <div className="mt-1 text-[11px] text-steel">
            How major pairs and gold tend to move together. Values are{" "}
            <span className="font-medium text-navy">indicative · 30-day rolling</span>; refresh on
            major macro events.
          </div>
        </div>
        <div className="hidden flex-wrap items-center justify-end gap-3 sm:flex">
          <LegendChip swatch="bg-emerald-500/90" label="≥ +0.8" />
          <LegendChip swatch="bg-emerald-300/80" label="+0.5" />
          <LegendChip swatch="bg-slate-100"       label="≈ 0" />
          <LegendChip swatch="bg-rose-300/80"     label="-0.5" />
          <LegendChip swatch="bg-rose-500/90"     label="≤ -0.8" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[640px] border-separate border-spacing-0 text-[11px]">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white px-2 py-2 text-left text-steel">Pair</th>
              {CORRELATION_PAIRS.map((p) => (
                <th key={p} className="px-2 py-2 text-center font-semibold text-navy">
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CORRELATION_MATRIX.map((row, i) => (
              <tr key={CORRELATION_PAIRS[i]}>
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-white px-2 py-1.5 text-left text-[11px] font-semibold text-navy"
                >
                  {CORRELATION_PAIRS[i]}
                </th>
                {row.map((v, j) => {
                  const tone = cellTone(v, i === j);
                  return (
                    <td
                      key={CORRELATION_PAIRS[j]}
                      className={`px-2 py-1.5 text-center font-mono ${tone.bg} ${tone.text}`}
                      title={`${CORRELATION_PAIRS[i]} vs ${CORRELATION_PAIRS[j]}: ${fmt(v)}`}
                    >
                      {fmt(v)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-steel-light">
        <span>
          Read the table cell-by-cell: positive ⇒ the two pairs trend together; negative ⇒ they trend
          opposite; near 0 ⇒ unrelated over the window.
        </span>
        <span className="sm:hidden flex flex-wrap gap-2">
          <LegendChip swatch="bg-emerald-500/90" label="+0.8" />
          <LegendChip swatch="bg-slate-100" label="0" />
          <LegendChip swatch="bg-rose-500/90" label="-0.8" />
        </span>
      </div>
    </div>
  );
}
