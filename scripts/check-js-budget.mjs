/**
 * Fails the build if a page ships JavaScript it is not budgeted for.
 *
 * The site's performance story rests on React components rendering to static
 * HTML at build time. That property is invisible in code review — one stray
 * `client:*` directive in a shared layout silently puts ~60 KB of React runtime
 * on every page. This check makes that regression loud.
 *
 * To budget a page, add its route to ALLOWED_ISLAND_ROUTES with a reason.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';

/** route -> why it is allowed to hydrate */
const ALLOWED_ISLAND_ROUTES = {
  // '/contact': 'contact form needs client-side validation + Turnstile',
  // '/search':  'Pagefind UI is inherently interactive',
};

const htmlFiles = async (dir) => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
};

const toRoute = (file) => {
  const rel = relative(DIST, file).split(sep).join('/');
  return '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '');
};

const files = await htmlFiles(DIST);
const violations = [];

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const route = toRoute(file);
  if (route in ALLOWED_ISLAND_ROUTES) continue;

  const scripts = html.match(/<script\b(?![^>]*\btype=["']application\/ld\+json["'])[^>]*>/g) ?? [];
  const islands = html.match(/<astro-island\b/g) ?? [];

  if (scripts.length || islands.length) {
    violations.push({ route, scripts: scripts.length, islands: islands.length });
  }
}

if (violations.length) {
  console.error('\n✗ JS budget exceeded — these routes ship JavaScript but are not budgeted:\n');
  for (const v of violations) {
    console.error(`    ${v.route}  (${v.scripts} script tag(s), ${v.islands} island(s))`);
  }
  console.error(
    '\n  A `client:*` directive in a shared layout puts the framework runtime on every page.',
  );
  console.error('  Either remove the directive, or budget the route in scripts/check-js-budget.mjs.\n');
  process.exit(1);
}

console.log(`✓ JS budget: ${files.length} route(s) checked, none ship unbudgeted JavaScript.`);
