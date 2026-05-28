# Working in this repo

## Rules

1. **Never break a deployed source project.** This repo only copies from `GIO4X NEW`, `RAPTOR BRAND NEW`, `GIOCRM`, etc. Don't edit those source paths from here.
2. **Monorepo with npm workspaces.** Apps live in `apps/*`, shared code in `packages/*`. Don't add another package manager.
3. **Brand tokens live in `packages/config/tailwind-preset.js`** — use them, don't redefine colors per-app.
4. **Supabase client comes from `@gio4x/supabase`** — apps must not import `@supabase/supabase-js` directly.
5. **One Supabase project for everything:** `tdifcayznqnaduchzfqz`. New tables need explicit GRANT to anon/authenticated (the public-schema flip lands 2026-10-30).
6. **Deploy cadence per the owner's standing rule:** build → test → push → deploy. Don't run `next build` while `next dev` is running. Use Netlify CLI for env secrets.

## Per-app dev

```bash
npm run dev:trader      # apps/trader on :3000
```
