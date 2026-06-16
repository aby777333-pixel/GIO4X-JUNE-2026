import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { StaffShell } from "@/components/staff/StaffShell";

export const metadata = {
  title: "GIO4X Service Console",
};

// Role gate for the whole /staff console. The staff portal has its own login
// at /staff/login (shared-credential → backing staff Supabase session), so any
// request here without a staff/admin session is bounced to that login — never
// to the client /auth/login. This layout does NOT wrap /staff/login (which
// lives outside this (console) route group).
export default async function StaffLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/staff/login");

  const role = user.profile?.role;
  if (role !== "staff" && role !== "admin") redirect("/staff/login");

  const name = user.profile?.full_name?.trim() || user.email?.split("@")[0] || "Agent";

  return (
    <StaffShell name={name} role={role}>
      {children}
    </StaffShell>
  );
}
