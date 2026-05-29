import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { StaffShell } from "@/components/staff/StaffShell";

export const metadata = {
  title: "GIO4X Service Console",
};

// Role gate for the whole /staff area. Middleware already requires a signed-in
// user on /staff; here we additionally require a staff/admin role.
export default async function StaffLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login?redirect=/staff");

  const role = user.profile?.role;
  if (role !== "staff" && role !== "admin") redirect("/");

  const name = user.profile?.full_name?.trim() || user.email?.split("@")[0] || "Agent";

  return (
    <StaffShell name={name} role={role}>
      {children}
    </StaffShell>
  );
}
