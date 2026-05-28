"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Tabs } from "@/components/Tabs";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@gio4x/ui";
import { DEPOSIT_METHODS } from "@/lib/constants";
import { Banknote, Bitcoin, CreditCard, Shield, Smartphone, Wallet } from "lucide-react";

const iconFor: Record<string, React.ReactNode> = {
  card: <CreditCard size={18} />,
  bank: <Banknote size={18} />,
  crypto: <Bitcoin size={18} />,
  upi: <Smartphone size={18} />,
  skrill: <Wallet size={18} />,
};

function CardDepositForm() {
  const [amount, setAmount] = useState(100);
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card>
        <CardBody>
          <label className="block text-xs font-medium text-steel">Account</label>
          <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
            <option>12044510 — Classic · USD</option>
            <option>15624153 — Swap-Free STP · USD</option>
            <option>18433282 — Cent · USC</option>
          </select>

          <label className="mt-4 block text-xs font-medium text-steel">Amount (USD)</label>
          <div className="mt-1 flex items-center rounded-lg border border-slate-200 px-3 py-2">
            <span className="mr-2 text-steel">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {[50, 100, 250, 500, 1000, 5000].map((v) => (
              <button
                key={v}
                onClick={() => setAmount(v)}
                className="rounded-md border border-slate-200 px-2 py-1 text-[11px] text-steel transition hover:border-sky/40 hover:text-navy"
              >
                ${v}
              </button>
            ))}
          </div>

          <label className="mt-4 block text-xs font-medium text-steel">Card details</label>
          <div className="mt-1 space-y-2">
            <input
              placeholder="Card number"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input placeholder="MM / YY" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
              <input placeholder="CVV" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </div>
            <input placeholder="Cardholder name" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 text-[11px] text-steel">
              <Shield size={14} className="text-sky" /> 3-D Secure · PCI DSS Level 1
            </div>
            <Button variant="primary">Deposit ${amount.toLocaleString()}</Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardBody>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-steel">Deposit amount</span>
              <span className="font-medium text-navy">${amount.toLocaleString()}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-steel">Fee</span>
              <span className="font-medium text-success">$0.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-steel">Conversion</span>
              <span className="font-medium text-navy">1:1</span>
            </li>
            <li className="flex items-center justify-between border-t border-slate-100 pt-2 text-base">
              <span className="font-semibold text-navy">You will receive</span>
              <span className="font-bold text-navy">${amount.toLocaleString()}</span>
            </li>
          </ul>
          <div className="mt-4 rounded-lg bg-sky/5 px-3 py-2 text-[11px] text-navy">
            Funds appear in your trading account within 1–2 minutes after card authorisation.
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function CryptoForm() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <Card>
        <CardBody>
          <label className="block text-xs font-medium text-steel">Network</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {["USDT TRC20", "USDT ERC20", "BTC", "ETH", "USDC", "BNB"].map((n) => (
              <button
                key={n}
                className="rounded-lg border border-slate-200 px-3 py-3 text-xs font-medium text-navy transition hover:border-sky/40"
              >
                {n}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-xs font-medium text-steel">Deposit address</label>
          <div className="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 font-mono text-xs text-navy">
            TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE
          </div>
          <div className="mt-2 flex gap-2 text-[11px]">
            <button className="rounded-md bg-sky/10 px-2 py-1 text-sky">Copy</button>
            <button className="rounded-md bg-slate-100 px-2 py-1 text-steel">Show QR</button>
          </div>

          <div className="mt-5 rounded-lg bg-amber-50 px-3 py-2 text-[11px] text-amber-900">
            Send only on the network selected above. Wrong-network deposits cannot be recovered.
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live rate</CardTitle>
        </CardHeader>
        <CardBody>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span className="text-steel">USDT/USD</span><span className="font-medium text-navy">1.0001</span></li>
            <li className="flex justify-between"><span className="text-steel">BTC/USD</span><span className="font-medium text-navy">84,521.30</span></li>
            <li className="flex justify-between"><span className="text-steel">ETH/USD</span><span className="font-medium text-navy">3,120.50</span></li>
          </ul>
          <div className="mt-4 text-[11px] text-steel-light">
            We credit at the live rate when the deposit reaches the network minimum confirmations.
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function BankForm() {
  return (
    <Card>
      <CardBody>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold text-navy">SWIFT / Wire</h4>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-steel">Beneficiary</dt><dd className="text-navy">GIO4X Ltd.</dd></div>
              <div className="flex justify-between"><dt className="text-steel">Bank</dt><dd className="text-navy">Standard Chartered, UAE</dd></div>
              <div className="flex justify-between"><dt className="text-steel">SWIFT</dt><dd className="font-mono text-navy">SCBLAEADXXX</dd></div>
              <div className="flex justify-between"><dt className="text-steel">Account</dt><dd className="font-mono text-navy">0210448122001</dd></div>
              <div className="flex justify-between"><dt className="text-steel">Reference</dt><dd className="font-mono text-navy">GIO4X-1701808</dd></div>
            </dl>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-navy">India (NEFT / RTGS)</h4>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-steel">Beneficiary</dt><dd className="text-navy">GIO4X Payments</dd></div>
              <div className="flex justify-between"><dt className="text-steel">Bank</dt><dd className="text-navy">ICICI Bank</dd></div>
              <div className="flex justify-between"><dt className="text-steel">IFSC</dt><dd className="font-mono text-navy">ICIC0000001</dd></div>
              <div className="flex justify-between"><dt className="text-steel">Account</dt><dd className="font-mono text-navy">000105588421</dd></div>
              <div className="flex justify-between"><dt className="text-steel">Reference</dt><dd className="font-mono text-navy">GIO4X-1701808</dd></div>
            </dl>
          </div>
        </div>
        <div className="mt-5 rounded-lg bg-sky/5 px-3 py-2 text-[11px] text-navy">
          Always include the reference code. Without it, deposits take longer to reconcile.
        </div>
      </CardBody>
    </Card>
  );
}

export default function DepositsPage() {
  return (
    <Shell title="Deposits">
      <PageHeader
        title="Deposit Funds"
        subtitle="Choose a method and we'll credit the account within minutes."
      />

      <div className="mb-5 grid gap-2 md:grid-cols-3 lg:grid-cols-5">
        {DEPOSIT_METHODS.map((m) => (
          <div
            key={m.id}
            className="flex items-start gap-3 rounded-glass border border-slate-200 bg-white p-4"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky/10 text-sky">
              {iconFor[m.id]}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-navy">{m.name}</div>
              <div className="mt-0.5 text-[11px] text-steel">Fee {m.fee} · {m.processing}</div>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardBody>
          <Tabs
            tabs={[
              { id: "card", label: "Card", content: <CardDepositForm /> },
              { id: "crypto", label: "Crypto", content: <CryptoForm /> },
              { id: "bank", label: "Bank Transfer", content: <BankForm /> },
            ]}
          />
        </CardBody>
      </Card>
    </Shell>
  );
}
