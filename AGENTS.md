# AGENTS.md

Personal portfolio for Ali Pooralijan (A.Wolver.P). Three routes: `/` (hero + full-stack or Rust journey), `/projects`, `/resume`. Dark-only. Theme (`full-stack` | `rust`) is a journey accent stored in `localStorage`, not light/dark.

## Stack

TanStack Start + TanStack Router (file routes), React 19, Vite 8, Tailwind CSS 4, Motion, Biome, TypeScript. Package manager: **pnpm**. Import alias: `#/*` → `src/*`.

## Commands

```bash
pnpm dev          # Vite, host 0.0.0.0:3000
pnpm build        # SSG/prerender
pnpm preview
pnpm lint         # biome lint
pnpm format       # biome format
pnpm check        # biome check (lint + format)
pnpm generate-routes  # tsr generate → src/routeTree.gen.ts
```

There is **no test suite**. After meaningful changes, run `pnpm check`. Run `pnpm build` when touching routes, prerender, or Vite config.

## Conventions

- Small, reviewable diffs. Match existing patterns; do not introduce a new stack, UI kit, or CSS approach.
- Tabs, double quotes, `cn()` from `#/lib/styles`, `cva` for variants.
- New pages: add a file under `src/routes/` and regenerate the route tree. Do not hand-edit `src/routeTree.gen.ts`.
- Client animations: `m` from `motion/react` (root already wraps `LazyMotion`). Reuse `#/lib/motion`.
- Site facts (identity, socials, hero, SEO, projects, resume, skill lists) live in root `config.json`, validated by `#/lib/config`. Load via `#/server/config` `getConfig`. Read in UI with `useConfig(select)` from `#/hooks/config`.
- Journey copy and stages stay in `src/journeys/` except introduction marquees, which are built from skills tagged with `journeys`.
- Theme: `data-theme` on `<html>` via `#/hooks/theme`. Accent tokens in `src/globals.css`.

## Do not touch

- Generated: `src/routeTree.gen.ts`, `dist/`, `.tanstack/`
- Secrets / env: `.env`, `*.local`
- Lockfile unless the task is a dependency change
- Scaffold leftovers in `README.md` unless asked to update docs
