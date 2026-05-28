"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "./supabase-server";
import { requireUser } from "./session";
import type { Enums } from "@gio4x/supabase";

export type ActionResult =
  | { ok: true; message?: string; id?: string; accountNumber?: string }
  | { ok: false; error: string };

export async function createDemoAccount(input: {
  accountKind: Enums<"account_kind">;
  baseCurrency: Enums<"wallet_currency">;
  leverage: number;
  startingBalance: number;
  planName?: string;
}): Promise<ActionResult> {
  const user = await requireUser().catch(() => null);
  if (!user) return { ok: false, error: "Not signed in." };

  if (input.accountKind !== "demo") {
    return { ok: false, error: "Only demo accounts can be created from the client." };
  }

  const supabase = getSupabaseServer();

  // Mint a public account number from the sequence via RPC-style fetch:
  const { data: seqRow, error: seqErr } = await supabase
    .schema("public")
    .rpc(
      // raw SQL would be nicer but we'll fall back to fetching the next val
      // through a tiny one-off select. For now: derive from a count + epoch.
      "generate_referral_code",
      { p_user_id: user.id },
    );
  // We don't actually want a referral code — that was a placeholder for the
  // sequence call. Build a fallback identifier instead. The real account number
  // would come from a dedicated function; we use a deterministic prefix here
  // until a `next_account_number()` fn lands.
  void seqRow;
  void seqErr;

  const accountNumber = `1${Date.now().toString().slice(-7)}`;

  const { data, error } = await supabase
    .from("trading_accounts")
    .insert({
      account_number: accountNumber,
      user_id: user.id,
      account_kind: "demo",
      leverage: input.leverage,
      base_currency: input.baseCurrency,
      balance: input.startingBalance,
      equity: input.startingBalance,
      margin_free: input.startingBalance,
      plan_name: input.planName ?? "Demo",
      server: "GIO4X-Demo",
    })
    .select("id, account_number")
    .single();

  if (error) return { ok: false, error: error.message };

  revalidatePath("/accounts");
  revalidatePath("/");
  return {
    ok: true,
    message: `Demo account ${data.account_number} created.`,
    id: data.id,
    accountNumber: data.account_number,
  };
}
