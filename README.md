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
| `pnpm images` | Downscale source photos in `src/assets/img` after a Figma export |
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
- `src/components/sections/*.astro` — one file per homepage section. These own
  layout and data wiring; the `.tsx` components below them own appearance.
- `src/layouts/Base.astro` — html shell, head, font preloads, skip link.
- `src/styles/global.css` — **the design tokens**. See "Design system" below.
- `src/styles/fonts.css` — generated `@font-face` block for the self-hosted fonts.
- `src/assets/img/` — source photos, optimized at build time by `astro:assets`.
- `public/icons/`, `public/fonts/` — assets served as-is (SVG icons, woff2).
- `src/i18n/index.ts` — locale detection, translation, path localization.
- `src/data/i18n/ro.json` — UI strings, and the source of truth for the key set.
  Every dictionary is typed `Record<UIKey, string>`, so when a second locale is
  added a missing key is a **compile error**, not a silent fallback.
- `src/data/site.json` — site identity, nav, socials, volunteer URL.
- `src/data/events.ts` — homepage carousel content. A typed module rather than
  JSON so the image imports go through `astro:assets`; a bare path string would
  skip optimization and ship the multi-megabyte originals.

**Two React-in-Astro rules to remember:**

1. React components can't be `async`. Fetch in the `.astro` page, pass props down.
2. `astro:assets` `<Image />` can't be used inside React. Call `getImage()` in
   the `.astro` page and pass `src`/`srcset` down to a plain `<img>`.

## Design system

Every colour, type step, radius and shadow comes from the Figma brand book
(file `pDECzBOzTzmCDOXJ5axTJa`, node `311:426`) and lives in the `@theme` block
in `src/styles/global.css`. Each colour token carries its Figma variable name in
a trailing comment, so a rename in Figma can be traced to the utility it
produces. **Components consume tokens through Tailwind utilities (`bg-brand`,
`text-ink-muted`, `text-h2`) and never hardcode a hex value.**

**Responsive behaviour lives in the tokens, not in component class lists.** The
brand book is a single 1728px desktop artboard, so the phone and tablet sizes
are ours to choose. Rather than redeclare each size per breakpoint, the display
and heading steps interpolate with `clamp()` between a ~375px minimum and the
1728px the design was drawn at — which makes them correct at every width in
between, including the tablet sizes nobody drew. Body steps stay fixed, because
16px body copy should not shrink on a phone.

Components take **declarative variant props**, never style props:
`<Button variant="secondary" size="lg">`, `<Pill variant="stat">`,
`<StatusBadge status="ongoing">`. A caller says what a thing *is*; the token
layer decides what it looks like.

Three deliberate deviations from the brand book, all of them visible choices
rather than oversights:

1. **Line height.** Every Figma text style is set to 100%. Headings keep that
   (near enough), but running copy gets real leading — 100% would clip the
   descenders on Romanian ă/ș/ț.
2. **Lato ExtraBold is shipped as Lato Black (900).** Figma reports weight 800,
   but Google Fonts' Lato has no 800 cut — it goes 700 → 900. Faking 800 would
   leave the browser to synthesize it.
3. **The carousel has no JavaScript.** See below.

### Fonts

Montserrat (display), Poppins (headings) and Lato (body) are **self-hosted** in
`public/fonts/`, not linked from `fonts.googleapis.com`: a third-party font
request would be the only render-blocking cross-origin hit on a site that
otherwise ships zero JS. Both `latin` and `latin-ext` subsets are shipped —
`latin-ext` is not optional, Romanian ă/ș/ț live there. Only the two faces that
paint above the fold are preloaded.

### Images

Photos exported from Figma arrive at capture resolution — the hero was a 4096px,
13 MB JPEG, and the eight source images totalled 49 MB. `pnpm images` downscales
them in place to the widest size the layout actually asks for (49 MB → 1.4 MB).
Run it after pulling new assets from Figma; it is idempotent.

### The carousel ships zero JavaScript

The events carousel is drawn with prev/next arrows and position dots, which
normally means a hydrated island. It is instead a native `scroll-snap` track:
swipe, trackpad, shift-scroll and arrow keys all work with no runtime, and every
control is a plain anchor to a slide id, which browsers resolve by scrolling the
nearest scrollable ancestor.

The honest limitation: the arrows jump to the **first and last** slide rather
than stepping one at a time, because "the slide after whichever is currently
showing" is not knowable without script. They are labelled accordingly. If
single-stepping turns out to matter, that is the moment to hydrate this one
component and give it a budget entry — not before.

## i18n

**Romanian only for now**, served from the root (`/`). There is no language
switcher and no `hreflang` alternates, because there is nothing to switch to.

The plumbing is still in place, so adding a locale is a contained change:

1. Add it to `locales` in `astro.config.mjs` and to `languages` in
   `src/i18n/index.ts`.
2. Add `src/data/i18n/<code>.json`. Any key present in `ro.json` but missing
   there fails `pnpm check`.
3. Register it in `dictionaries` in `src/i18n/index.ts`.
4. Add the pages under `src/pages/<code>/`. `localizePath()` already prefixes
   non-default locales, so nav and links follow automatically.
5. Restore the language switcher — `LangSwitch.tsx`, `getAlternatePath()` and
   `otherLang()` were removed in the single-locale cleanup and are recoverable
   from git history.

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
