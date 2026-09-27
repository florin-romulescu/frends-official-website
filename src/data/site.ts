import { getCollection, getEntry } from 'astro:content';
import siteJson from './site.json';
import type { UIKey } from '../i18n';

export interface NavEntry {
  key: UIKey;
  path: string;
  children?: NavEntry[];
}

interface SiteNav {
  nav: NavEntry[];
  footerNav: NavEntry[];
}

const navigation = siteJson as SiteNav;

const hasBlogPosts = async () => (await getCollection('blog')).length > 0;

const withoutEmptyBlog = (entries: NavEntry[], showBlog: boolean) =>
  showBlog ? entries : entries.filter((entry) => entry.path !== '/blog');

export const getSite = async () => {
  const settings = await getEntry('settings', 'site');
  if (!settings) {
    throw new Error('src/content/settings/site.json is missing.');
  }
  const { images, ...data } = settings.data;
  const showBlog = await hasBlogPosts();
  return {
    ...data,
    nav: withoutEmptyBlog(navigation.nav, showBlog),
    footerNav: withoutEmptyBlog(navigation.footerNav, showBlog),
  };
};

export type SiteData = Awaited<ReturnType<typeof getSite>>;
