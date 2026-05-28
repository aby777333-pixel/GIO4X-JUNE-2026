import { cn } from "@gio4x/ui";

export function AccountChip({
  platform,
  type,
}: {
  platform: "MT4" | "MT5";
  type?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase",
          platform === "MT5" ? "bg-sky/10 text-sky" : "bg-navy/10 text-navy",
        )}
      >
        {platform}
      </span>
      {type ? <span className="text-[11px] text-steel">{type}</span> : null}
    </span>
  );
}
