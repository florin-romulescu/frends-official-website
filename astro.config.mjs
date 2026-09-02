// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the real domain before Phase 5 (sitemap/RSS need it absolute).
  site: 'https://example.org',

  // Romanian only for now, served from the root. The i18n block stays so a
  // second locale is a one-line addition here plus a dictionary in src/data/i18n.
  i18n: {
    locales: ['ro'],
    defaultLocale: 'ro',
    routing: { prefixDefaultLocale: false },
  },

  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
