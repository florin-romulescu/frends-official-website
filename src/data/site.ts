import { getEntry } from 'astro:content';
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

export const getSite = async () => {
  const settings = await getEntry('settings', 'site');
  if (!settings) {
    throw new Error('Site settings were not loaded from WordPress.');
  }
  return { ...settings.data, ...navigation };
};

export type SiteData = Awaited<ReturnType<typeof getSite>>;
