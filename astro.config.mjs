// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the real domain before Phase 5 (sitemap/RSS need it absolute).
  site: 'https://example.org',

  // Romanian is the default locale and is served from the root: `/` = RO, `/en/` = EN.
  i18n: {
    locales: ['ro', 'en'],
    defaultLocale: 'ro',
    routing: { prefixDefaultLocale: false },
  },

  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
