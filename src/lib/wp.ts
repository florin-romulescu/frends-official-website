import { WP_API_URL } from 'astro:env/server';
import type { ResolvedImage } from '../components/types';

interface Rendered {
  rendered: string;
}

export interface WpMediaSize {
  width: number;
  height: number;
  source_url: string;
}

export interface WpMedia {
  id: number;
  alt_text: string;
  source_url: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<string, WpMediaSize>;
  };
}

export interface WpPost<Acf extends object = Record<string, unknown>> {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: Rendered;
  excerpt?: Rendered;
  content?: Rendered;
  acf?: Acf;
  _embedded?: {
    'wp:featuredmedia'?: Array<WpMedia | { code: string }>;
  };
}

const missingEnv =
  'WP_API_URL is not set. Copy .env.example to .env (local) or define it in the host build settings.';

const base = (() => {
  if (!WP_API_URL) throw new Error(missingEnv);
  return WP_API_URL.replace(/\/+$/, '');
})();

const describe = (post: WpPost<object>) => `"${decodeEntities(post.title.rendered)}" (id ${post.id})`;

export const wpFetchAll = async <T>(
  resource: string,
  params: Record<string, string> = {},
): Promise<T[]> => {
  const items: T[] = [];
  for (let page = 1; ; page++) {
    const url = new URL(`${base}/wp-json/wp/v2/${resource}`);
    url.search = new URLSearchParams({
      per_page: '100',
      _embed: 'wp:featuredmedia',
      ...params,
      page: String(page),
    }).toString();

    const response = await fetch(url).catch((error: unknown) => {
      throw new Error(
        `Could not reach WordPress at ${base} (WP_API_URL). Is the CMS running?`,
        { cause: error },
      );
    });
    if (!response.ok) {
      throw new Error(`WordPress returned ${response.status} ${response.statusText} for ${url}`);
    }

    items.push(...((await response.json()) as T[]));
    const totalPages = Number(response.headers.get('X-WP-TotalPages') ?? '1');
    if (page >= totalPages) return items;
  }
};

const namedEntities: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '…',
  ndash: '–',
  mdash: '—',
};

export const decodeEntities = (html: string): string =>
  html
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name: string) => namedEntities[name.toLowerCase()] ?? match);

export const plainText = (html: string): string =>
  decodeEntities(html.replace(/<[^>]+>/g, ''))
    .replace(/\s*\[…\]\s*$/, '…')
    .trim();

export const cleanHtml = (html: string): string =>
  html.replace(/<(img|figure)([^>]*?)\sstyle="[^"]*"/g, '<$1$2').trim();

const isSameShape = (size: WpMediaSize, full: { width: number; height: number }) =>
  Math.abs(size.width / size.height - full.width / full.height) < 0.02;

export const featuredMedia = (post: WpPost<object>): WpMedia | undefined => {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  return media && 'source_url' in media ? media : undefined;
};

export const featuredImage = (post: WpPost<object>): ResolvedImage | undefined => {
  const media = featuredMedia(post);
  if (!media?.media_details) return undefined;

  const { width, height, sizes = {} } = media.media_details;
  const candidates = Object.values(sizes)
    .filter((size) => size.width && size.height && isSameShape(size, { width, height }))
    .sort((a, b) => a.width - b.width);

  return {
    src: media.source_url,
    srcSet: candidates.length ? candidates.map((s) => `${s.source_url} ${s.width}w`).join(', ') : undefined,
    width,
    height,
  };
};

export const requireFeaturedImage = (post: WpPost<object>, type: string): ResolvedImage => {
  const image = featuredImage(post);
  if (!image) {
    throw new Error(`The ${type} ${describe(post)} has no featured image. Set one in WordPress.`);
  }
  return image;
};

export const featuredAlt = (post: WpPost<{ image_alt?: string }>): string =>
  post.acf?.image_alt?.trim() || featuredMedia(post)?.alt_text?.trim() || '';

export const acfDate = (value: string | null | undefined): string | undefined => {
  if (!value) return undefined;
  const digits = value.replace(/\D/g, '');
  return digits.length === 8 ? `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}` : value;
};
