// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import wpRefresh from './src/integrations/wp-refresh';

export default defineConfig({
  site: 'https://frends.ro',

  i18n: {
    locales: ['ro'],
    defaultLocale: 'ro',
    routing: { prefixDefaultLocale: false },
  },

  env: {
    schema: {
      WP_API_URL: envField.string({ context: 'server', access: 'public', url: true }),
    },
  },

  integrations: [react(), wpRefresh()],
  vite: { plugins: [tailwindcss()] },
});
