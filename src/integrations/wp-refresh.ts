import { readFileSync } from 'node:fs';
import type { AstroIntegration } from 'astro';

const resources = ['posts', 'events', 'projects', 'partners', 'site-settings'];

const latestModified = async (base: string): Promise<string> => {
  const stamps = await Promise.all(
    resources.map(async (resource) => {
      const url = `${base}/wp-json/wp/v2/${resource}?per_page=1&orderby=modified&_fields=modified`;
      const response = await fetch(url);
      if (!response.ok) return '';
      const [entry] = (await response.json()) as Array<{ modified?: string }>;
      return entry?.modified ?? '';
    }),
  );
  return stamps.join('|');
};

const readDotEnv = (): Record<string, string> => {
  try {
    return Object.fromEntries(
      readFileSync('.env', 'utf8')
        .split(/\r?\n/)
        .map((line) => line.match(/^\s*([\w.-]+)\s*=\s*(.*?)\s*$/))
        .filter((match): match is RegExpMatchArray => match !== null)
        .map(([, key, value]) => [key, value.replace(/^(['"])(.*)\1$/, '$2')]),
    );
  } catch {
    return {};
  }
};

const wpRefresh = (): AstroIntegration => ({
  name: 'wp-refresh',
  hooks: {
    'astro:server:setup': ({ refreshContent, logger, server }) => {
      const env = { ...readDotEnv(), ...process.env };
      const base = env.WP_API_URL?.replace(/\/+$/, '');
      if (!refreshContent || !base) return;
      logger.info(`Polling ${base} for content changes every ${Number(env.WP_REFRESH_INTERVAL ?? '10000') / 1000}s`);

      const intervalMs = Number(env.WP_REFRESH_INTERVAL ?? '10000');
      let previous = '';
      let busy = false;

      const check = async () => {
        if (busy) return;
        busy = true;
        try {
          const current = await latestModified(base);
          if (previous && current !== previous) {
            logger.info('WordPress content changed, refreshing collections');
            await refreshContent({});
          }
          previous = current;
        } catch {
          logger.warn(`Could not reach WordPress at ${base}`);
        } finally {
          busy = false;
        }
      };

      const timer = setInterval(check, intervalMs);
      server.httpServer?.once('close', () => clearInterval(timer));
    },
  },
});

export default wpRefresh;
