import type { ReactNode } from "react";
import { cn } from "./cn";

type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function AuthCard({ title, subtitle, children, footer, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm",
        className,
      )}
    >
      <div className="mb-5">
        <h1 className="text-xl font-bold text-navy">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-steel">{subtitle}</p> : null}
      </div>
      {children}
      {footer ? <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-steel">{footer}</div> : null}
    </div>
  );
}
