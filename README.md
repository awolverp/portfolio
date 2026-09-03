# A.Wolver.P

Personal portfolio of [Ali Pooralijan](https://awolverp.github.io/portfolio) (A.Wolver.P).
Dark-only site with three routes:
- `/`
- `/projects`
- `/resume`

Live: [awolverp.github.io/portfolio](https://awolverp.github.io/portfolio)

## Stack

TanStack Start + TanStack Router, React 19, Vite 8, Tailwind CSS 4, Motion, Biome, TypeScript. Package manager: **pnpm**.

## Local development

```bash
pnpm install
pnpm dev          # http://0.0.0.0:3000
pnpm build        # SSG/prerender → dist/client
pnpm preview
pnpm check        # biome lint + format
```

Site facts (identity, socials, hero, SEO, projects, resume, skills) live in `project.config.ts`.
Journey copy stays in `src/journeys/`.

> [!WARNING]\
> This project is built to be served at `/portfolio/` (GitHub Pages project site). Keep `vite.config.ts` `base` and the `/portfolio/...` paths in `project.config.ts` in sync with the repository name.

## Deploy

GitHub Pages via Actions. Create a public repository named **`portfolio`**, then:

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Push this project (`master` is fine for development)
3. Push or merge to the **`deploy`** branch to publish

The workflow builds with `pnpm build`, copies the SPA shell to `404.html` so unknown URLs hydrate the in-app not-found page, and uploads `dist/client`.

Manual run: **Actions → Deploy GitHub Pages → Run workflow** (uses the selected branch; production deploys still expect `deploy`).

## License

Licensed under the [Apache License 2.0](LICENSE).
