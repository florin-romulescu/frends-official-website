import siteJson from './site.json';
import type { UIKey } from '../i18n';

export interface SocialLink {
  label: string;
  href: string;
}

export interface NavEntry {
  key: UIKey;
  path: string;
  children?: NavEntry[];
}

export interface SiteData {
  name: string;
  shortName: string;
  email: string;
  phone: string;
  addressLines: string[];
  volunteerUrl: string;
  social: SocialLink[];
  nav: NavEntry[];
  footerNav: NavEntry[];
}

export const site: SiteData = siteJson as SiteData;
