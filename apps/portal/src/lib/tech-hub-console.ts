import { getCurrentUser } from "./session";
import { getSupabaseServer } from "./supabase-server";

// Technology Hub (Super Admin) data layer. Reads run under the logged-in super
// admin's RLS session; the tech_* tables/RPCs are gated to super admins in the DB.
// tech_* objects aren't in the generated types — we use a loose-cast helper.

export type TechModule = {
  key: string; category: string; name: string; description: string | null;
  features: string[]; status: "available" | "beta" | "roadmap"; enabled: boolean;
  icon: string | null; sort: number;
};
export type TechAdmin = {
  id: string; email: string | null; full_name: string | null; role: string;
  is_super_admin: boolean; tech_permissions: string[] | null; created_at: string;
};
export type TechAudit = { actor_email: string | null; action: string; module: string | null; detail: Record<string, unknown>; created_at: string };
export type TechOverview = {
  db: { size_pretty: string; size_bytes: number; tables: number; profiles: number; trades: number };
  modules: { total: number; enabled: number; available: number; beta: number; roadmap: number };
  super_admins: number; audit_24h: number; settings: Record<string, unknown>;
};

type LooseClient = {
  from: (t: string) => { select: (c: string) => { order: (c: string, o?: { ascending?: boolean }) => Promise<{ data: unknown[] | null }>; eq: (c: string, v: unknown) => { maybeSingle: () => Promise<{ data: unknown }> } } };
  rpc: (fn: string, args?: Record<string, unknown>) => Promise<{ data: unknown }>;
};

export async function getSuperAdmin() {
  const user = await getCurrentUser();
  const isSuper = Boolean((user?.profile as { is_super_admin?: boolean } | null)?.is_super_admin);
  return { user, isSuper };
}

export async function loadTechConsole() {
  const { user, isSuper } = await getSuperAdmin();
  if (!user || !isSuper) return { ok: false as const, error: "Super admin only." };
  const sb = getSupabaseServer() as unknown as LooseClient;
  const [ov, mods, admins, audit] = await Promise.all([
    sb.rpc("tech_overview"),
    sb.from("tech_modules").select("*").order("sort"),
    sb.rpc("tech_admins_list"),
    sb.rpc("tech_audit_recent", { p_limit: 30 }),
  ]);
  return {
    ok: true as const,
    overview: (ov.data as TechOverview) ?? null,
    modules: ((mods.data as TechModule[]) ?? []),
    admins: ((admins.data as TechAdmin[]) ?? []),
    audit: ((audit.data as TechAudit[]) ?? []),
  };
}

export async function loadTechModules(): Promise<TechModule[]> {
  const { user, isSuper } = await getSuperAdmin();
  if (!user || !isSuper) return [];
  const sb = getSupabaseServer() as unknown as LooseClient;
  const { data } = await sb.from("tech_modules").select("*").order("sort");
  return (data as TechModule[]) ?? [];
}

export async function loadTechModule(key: string): Promise<TechModule | null> {
  const mods = await loadTechModules();
  return mods.find((m) => m.key === key) ?? null;
}
