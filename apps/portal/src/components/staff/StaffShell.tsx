import type { ReactNode } from "react";
import { StaffSidebar } from "./StaffSidebar";

export function StaffShell({
  name,
  role,
  children,
}: {
  name: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <StaffSidebar name={name} role={role} />
      <main className="min-w-0 flex-1 overflow-y-auto px-6 py-6 lg:px-8">{children}</main>
    </div>
  );
}
