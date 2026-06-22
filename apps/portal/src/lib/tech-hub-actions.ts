"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "./supabase-server";
import { getCurrentUser } from "./session";

export async function techSignOut(): Promise<void> {
  const sb = getSupabaseServer();
  await sb.auth.signOut();
  redirect("/auth/login?redirect=/tech");
}

export type TechResult = { ok: true; message?: string } | { ok: false; error: string };

async function requireSuper() {
  const user = await getCurrentUser();
  const isSuper = Boolean((user?.profile as { is_super_admin?: boolean } | null)?.is_super_admin);
  if (!user || !isSuper) return { ok: false as const, error: "Super admin only." };
  return { ok: true as const, user };
}

type Rpc = { rpc: (fn: string, args?: Record<string, unknown>) => Promise<{ data: unknown; error: { message: string } | null }> };

export async function toggleModule(key: string, enabled: boolean): Promise<TechResult> {
  const g = await requireSuper();
  if (!g.ok) return g;
  const sb = getSupabaseServer() as unknown as Rpc;
  const { error } = await sb.rpc("tech_module_toggle", { p_key: key, p_enabled: enabled });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/tech", "layout");
  return { ok: true, message: `${key} ${enabled ? "enabled" : "disabled"}.` };
}

export async function setSetting(key: string, value: unknown): Promise<TechResult> {
  const g = await requireSuper();
  if (!g.ok) return g;
  const sb = getSupabaseServer() as unknown as Rpc;
  const { error } = await sb.rpc("tech_setting_set", { p_key: key, p_value: value });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/tech", "layout");
  return { ok: true, message: `${key} updated.` };
}

export async function setSuperAdmin(userId: string, on: boolean): Promise<TechResult> {
  const g = await requireSuper();
  if (!g.ok) return g;
  const sb = getSupabaseServer() as unknown as Rpc;
  const { error } = await sb.rpc("tech_set_super_admin", { p_user_id: userId, p_on: on });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/tech", "layout");
  return { ok: true, message: on ? "Super-admin granted." : "Super-admin revoked." };
}

export type BridgeInput = {
  id?: string; name: string; kind: string; category: string; direction: string;
  endpoint?: string; config?: Record<string, unknown>;
};

export async function upsertBridge(input: BridgeInput): Promise<TechResult> {
  const g = await requireSuper();
  if (!g.ok) return g;
  const sb = getSupabaseServer() as unknown as Rpc;
  const { error } = await sb.rpc("tech_bridge_upsert", { p: { ...input, config: input.config ?? {} } });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/tech/bridges");
  return { ok: true, message: input.id ? "Bridge updated." : "Bridge created." };
}

export async function setBridgeStatus(id: string, status: string): Promise<TechResult> {
  const g = await requireSuper();
  if (!g.ok) return g;
  const sb = getSupabaseServer() as unknown as Rpc;
  const { error } = await sb.rpc("tech_bridge_set_status", { p_id: id, p_status: status });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/tech/bridges");
  return { ok: true, message: `Bridge ${status}.` };
}

export async function deleteBridge(id: string): Promise<TechResult> {
  const g = await requireSuper();
  if (!g.ok) return g;
  const sb = getSupabaseServer() as unknown as Rpc;
  const { error } = await sb.rpc("tech_bridge_delete", { p_id: id });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/tech/bridges");
  return { ok: true, message: "Bridge deleted." };
}
