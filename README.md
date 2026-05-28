# GIO4X — June 2026

Unified workspace for GIO4X. Monorepo of independently deployable Next.js apps that share UI, Supabase client, and config.

## Layout

```
apps/
  trader/              Client + IB portal (the "Trader Area" — Dashboard, Wallet,
                       Deposits, Withdrawals, Transfers, Copy Trading, PAMM, IB)
  website/             (planned) Marketing site — migrated from GIO4X NEW
  crm/                 (planned) Internal CRM — migrated from GIOCRM
  platform/            (planned) Raptor trading platform — migrated from RAPTOR PLATFORM
  dealer/              (planned) Dealer console — migrated from RAPTOR DEALER

packages/
  ui/                  Shared React components on GIO4X brand tokens
  supabase/            Typed Supabase client + shared DB types
  config/              Shared tsconfig, tailwind preset, eslint config

supabase/
  migrations/          Consolidated SQL migrations for project tdifcayznqnaduchzfqz
```

## Infrastructure

- **GitHub:** https://github.com/aby777333333-pixel/GIO4X-JUNE-2026
- **Supabase:** https://supabase.com/dashboard/project/tdifcayznqnaduchzfqz
- **Netlify:** one site per app (TBD as each app is deployed)

## Development

```bash
npm install                  # installs all workspace deps
npm run dev:trader           # starts the Trader Area on http://localhost:3000
```

## Source projects being consolidated

| Source path                                          | Migrated into        | Status            |
|------------------------------------------------------|----------------------|-------------------|
| `Documents/GIO4X NEW`                                | `apps/website`       | planned           |
| `Documents/RAPTOR BRAND NEW/RAPTOR MAIN CRM`         | `apps/crm`           | planned           |
| `Documents/RAPTOR BRAND NEW/RAPTOR PLATFORM`         | `apps/platform`      | planned           |
| `Documents/RAPTOR BRAND NEW/RAPTOR DEALER`           | `apps/dealer`        | planned           |
| `Documents/GIOCRM`                                   | merge into `apps/crm`| planned           |
| (new) StarTrader-style Client/IB portal              | `apps/trader`        | in progress       |

The source projects remain untouched — this workspace only copies what's needed.
