export function PromoBanner() {
  return (
    <div className="relative mb-6 overflow-hidden rounded-glass bg-navy text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy-dark to-sky/30" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sky/20 blur-3xl" />
      <div className="relative flex flex-col items-start gap-3 px-8 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-light">
            GIO4X · The Gentleman's Forex Broker
          </div>
          <h2 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">
            Institutional execution. Global markets. One account.
          </h2>
        </div>
        <div className="flex h-14 items-center gap-3 rounded-xl bg-white/10 px-5 backdrop-blur">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-sm font-bold">
            G4
          </div>
          <div className="text-xs uppercase tracking-wider text-white/80">
            Official Trading Portal
          </div>
        </div>
      </div>
    </div>
  );
}
