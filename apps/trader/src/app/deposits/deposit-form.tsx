"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Tabs } from "@/components/Tabs";
import { Button } from "@gio4x/ui";
import { Shield } from "lucide-react";
import { requestDeposit } from "@/lib/wallet-actions";

type Wallet = { id: string; label: string; balance: number; currency: string };

export function DepositForm({ signedIn, wallets }: { signedIn: boolean; wallets: Wallet[] }) {
  return (
    <Tabs
      tabs={[
        {
          id: "card",
          label: "Card",
          content: <CardDepositPanel signedIn={signedIn} wallets={wallets} gateway="card" />,
        },
        {
          id: "crypto",
          label: "Crypto",
          content: <CardDepositPanel signedIn={signedIn} wallets={wallets} gateway="crypto" />,
        },
        {
          id: "bank",
          label: "Bank Transfer",
          content: <CardDepositPanel signedIn={signedIn} wallets={wallets} gateway="bank" />,
        },
      ]}
    />
  );
}

function CardDepositPanel({
  signedIn,
  wallets,
  gateway,
}: {
  signedIn: boolean;
  wallets: Wallet[];
  gateway: "card" | "crypto" | "bank";
}) {
  const router = useRouter();
  const [walletId, setWalletId] = useState(wallets[0]?.id ?? "");
  const [amount, setAmount] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!signedIn) {
      setError("Sign in to deposit to your real wallet.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    fd.set("amount", String(amount));
    fd.set("gateway", gateway);
    fd.set("wallet_id", walletId);
    startTransition(async () => {
      const res = await requestDeposit(fd);
      if (res.ok) {
        setSuccess(res.message ?? "Deposit recorded.");
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-steel">Destination wallet</label>
          {wallets.length === 0 ? (
            <div className="mt-1 rounded-lg border border-dashed border-slate-200 px-3 py-2 text-xs text-steel">
              {signedIn ? "No wallets yet — one is created with your account." : "Sign in to see your wallets."}
            </div>
          ) : (
            <select
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              {wallets.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-steel">Amount (USD)</label>
          <div className="mt-1 flex items-center rounded-lg border border-slate-200 px-3 py-2">
            <span className="mr-2 text-steel">$</span>
            <input
              type="number"
              min={10}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {[50, 100, 250, 500, 1000, 5000].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setAmount(v)}
                className="rounded-md border border-slate-200 px-2 py-1 text-[11px] text-steel transition hover:border-sky/40 hover:text-navy"
              >
                ${v}
              </button>
            ))}
          </div>
        </div>

        {gateway === "card" ? (
          <div className="space-y-2">
            <input
              placeholder="Card number"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              autoComplete="cc-number"
            />
            <div className="grid grid-cols-2 gap-2">
              <input placeholder="MM / YY" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" autoComplete="cc-exp" />
              <input placeholder="CVV" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" autoComplete="cc-csc" />
            </div>
            <input placeholder="Cardholder name" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" autoComplete="cc-name" />
          </div>
        ) : null}
        {gateway === "crypto" ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-steel">
            Pick a network on the confirmation step. We&apos;ll generate a deposit address scoped
            to this transaction.
          </div>
        ) : null}
        {gateway === "bank" ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-steel">
            Use the bank details shown on confirmation and include your reference code so we can
            reconcile your transfer.
          </div>
        ) : null}

        {error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            {success}
          </div>
        ) : null}

        {!signedIn ? (
          <Link
            href="/auth/login?redirect=/deposits"
            className="block rounded-lg bg-sky px-4 py-2 text-center text-sm font-semibold text-white hover:bg-sky-light"
          >
            Sign in to deposit
          </Link>
        ) : (
          <Button variant="primary" type="submit" disabled={pending || !walletId}>
            {pending ? "Submitting…" : `Deposit $${amount.toLocaleString()}`}
          </Button>
        )}
      </div>

      <div className="rounded-glass border border-slate-200 bg-white p-5">
        <div className="text-sm font-semibold text-navy">Summary</div>
        <ul className="mt-3 space-y-3 text-sm">
          <li className="flex items-center justify-between">
            <span className="text-steel">Deposit amount</span>
            <span className="font-medium text-navy">${amount.toLocaleString()}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-steel">Fee</span>
            <span className="font-medium text-success">$0.00</span>
          </li>
          <li className="flex items-center justify-between border-t border-slate-100 pt-2 text-base">
            <span className="font-semibold text-navy">You will receive</span>
            <span className="font-bold text-navy">${amount.toLocaleString()}</span>
          </li>
        </ul>
        <div className="mt-4 flex items-center gap-2 text-[11px] text-steel">
          <Shield size={12} className="text-sky" /> 3-D Secure · PCI DSS · idempotent ledger.
        </div>
        <div className="mt-3 rounded-lg bg-sky/5 px-3 py-2 text-[11px] text-navy">
          Funds appear in your trading account within 1–2 minutes after settlement.
        </div>
      </div>
    </form>
  );
}
