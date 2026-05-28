import Image from "next/image";

export function PromoBanner() {
  return (
    <div className="relative mb-6 overflow-hidden rounded-glass bg-navy text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy-dark to-sky/20" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sky/20 blur-3xl" />
      <div className="relative flex flex-col items-start gap-5 px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-light">
            The Gentleman's Forex Broker
          </div>
          <h2 className="mt-1.5 text-2xl font-bold leading-tight sm:text-3xl">
            Institutional execution. Global markets. One account.
          </h2>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
          <Image
            src="/logo.png"
            alt="GIO4X"
            width={2924}
            height={976}
            className="h-9 w-auto brightness-0 invert"
          />
          <div className="border-l border-white/20 pl-4 text-[10px] uppercase tracking-wider text-white/80">
            Official
            <br />
            Trading Portal
          </div>
        </div>
      </div>
    </div>
  );
}
