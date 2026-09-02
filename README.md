# Frends website

Landing page + blog for Frends. Astro 7 (static) · React 19 components · Sveltia CMS · Cloudflare Pages.

Full architecture and rationale: `~/.claude/plans/let-s-think-on-how-linked-elephant.md`.

## Requirements

Node ≥ 22.12 (see `.nvmrc`) and pnpm.

## Commands

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server on http://localhost:4321 |
| `pnpm build` | Static build into `dist/` |
| `pnpm preview` | Serve the built output |
| `pnpm check` | Astro + TypeScript diagnostics |
| `pnpm budget` | Fail if any route ships unbudgeted JavaScript |
| `pnpm verify` | `check` + `build` + `budget` — what CI runs |

## Architecture notes

**Components are React; the site ships no JavaScript.** React components render
to static HTML at build time. JS is only shipped for a component carrying a
`client:*` directive, and every such route must be declared in
`scripts/check-js-budget.mjs`. Today that list is empty and every page ships
0 bytes of JS.

The mobile nav is built on `<details>`/`<summary>` rather than React state
specifically to keep it off that list — the header is global, so hydrating it
would have put ~60 KB gzipped of React runtime on every page of the site.

**Where things live:**

- `src/components/*.tsx` — the component library. Static by default.
- `src/components/*.astro` — thin composition shells that resolve locale props.
- `src/layouts/Base.astro` — html shell, head, hreflang alternates, skip link.
- `src/i18n/index.ts` — locale detection, translation, path localization.
- `src/data/i18n/{ro,en}.json` — UI strings. `ro.json` defines the key set;
  a key missing from `en.json` is a **compile error**, not a silent fallback.
- `src/data/site.json` — site identity, nav, socials, donate URL.

**Two React-in-Astro rules to remember:**

1. React components can't be `async`. Fetch in the `.astro` page, pass props down.
2. `astro:assets` `<Image />` can't be used inside React. Call `getImage()` in
   the `.astro` page and pass `src`/`srcset` down to a plain `<img>`.

## i18n

Romanian is the default locale and is served from the root:

- `/` — Romanian
- `/en/` — English

`getAlternatePath()` powers the language switcher so it keeps the reader on the
same page rather than dropping them on the homepage.

## Deploying to Cloudflare Pages

Not yet connected. To do it (one time):

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**, and pick the repo.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22.12.0`
4. Save and deploy. Cloudflare then builds `main` on every push and gives each
   pull request its own preview URL — which is the review step the editorial
   workflow depends on.

## Still to do

- **Phase 2** — content collections, blog, programs, team pages.
- **Phase 3** — Sveltia CMS at `/admin` + `sveltia-cms-auth` Worker.
- **Phase 4** — the real landing page.
- **Phase 5** — contact form, Pagefind search, sitemap, RSS, analytics.
- Replace the `site:` placeholder in `astro.config.mjs` with the real domain.
- Replace placeholder values in `src/data/site.json` (name, donate URL, socials).
