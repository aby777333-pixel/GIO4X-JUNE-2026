"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@gio4x/ui";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { transferBetweenWallets } from "@/lib/wallet-actions";

type Wallet = { id: string; label: string; balance: number; currency: string };

export function TransferForm({
  signedIn,
  wallets,
}: {
  signedIn: boolean;
  wallets: Wallet[];
}) {
  const router = useRouter();
  const [from, setFrom] = useState<string>(wallets[0]?.id ?? "");
  const [to, setTo] = useState<string>(wallets[1]?.id ?? "");
  const [amount, setAmount] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const fromW = wallets.find((w) => w.id === from);
  const toW = wallets.find((w) => w.id === to);
  const sameCurrency = !!fromW && !!toW && fromW.currency === toW.currency;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!signedIn) {
      setError("Sign in to transfer.");
      return;
    }
    const fd = new FormData();
    fd.set("from_wallet_id", from);
    fd.set("to_wallet_id", to);
    fd.set("amount", String(amount));
    startTransition(async () => {
      const res = await transferBetweenWallets(fd);
      if (res.ok) {
        setSuccess(res.message ?? "Transferred.");
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  }

  if (!signedIn) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-steel">
        <Link href="/auth/login?redirect=/transfers" className="font-medium text-sky hover:underline">
          Sign in
        </Link>{" "}
        to transfer between your wallets.
      </div>
    );
  }

  if (wallets.length < 2) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-steel">
        You need at least two wallets to transfer. Open a trading account to provision an extra one.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <div>
          <label className="block text-xs font-medium text-steel">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            {wallets.map((w) => (
              <option key={w.id} value={w.id}>{w.label}</option>
            ))}
          </select>
          {fromW ? (
            <div className="mt-1 text-[11px] text-steel">
              Available: {fromW.balance.toFixed(2)} {fromW.currency}
            </div>
          ) : null}
        </div>

        <div className="flex items-end justify-center pb-2">
          <button
            type="button"
            onClick={() => { setFrom(to); setTo(from); }}
            className="rounded-full border border-slate-200 bg-white p-2 text-sky shadow-sm transition hover:rotate-180"
            aria-label="Swap"
          >
            <ArrowLeftRight size={16} />
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-steel">To</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            {wallets.filter((w) => w.id !== from).map((w) => (
              <option key={w.id} value={w.id}>{w.label}</option>
            ))}
          </select>
          {toW ? (
            <div className="mt-1 text-[11px] text-steel">
              Current: {toW.balance.toFixed(2)} {toW.currency}
            </div>
          ) : null}
        </div>
      </div>

      <label className="mt-5 block text-xs font-medium text-steel">Amount</label>
      <div className="mt-1 flex items-center rounded-lg border border-slate-200 px-3 py-2">
        <span className="mr-2 text-steel">{fromW?.currency === "USC" ? "¢" : "$"}</span>
        <input
          type="number"
          min={1}
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full bg-transparent text-sm outline-none"
        />
        {fromW ? (
          <button
            type="button"
            onClick={() => setAmount(fromW.balance)}
            className="text-[11px] font-semibold text-sky"
          >
            MAX
          </button>
        ) : null}
      </div>

      {!sameCurrency ? (
        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Cross-currency transfers aren&apos;t enabled yet — pick two wallets in the same currency.
        </div>
      ) : null}

      <div className="mt-5 rounded-lg bg-slate-50 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-steel">{fromW?.label}</span>
          <ArrowRight size={14} className="text-sky" />
          <span className="text-steel">{toW?.label}</span>
        </div>
      </div>

      {error ? (
        <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</div>
      ) : null}
      {success ? (
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">{success}</div>
      ) : null}

      <div className="mt-5 flex justify-end">
        <Button variant="primary" type="submit" disabled={pending || !sameCurrency}>
          {pending ? "Transferring…" : "Transfer Now"}
        </Button>
      </div>
    </form>
  );
}
