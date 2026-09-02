import siteJson from './site.json';
import type { UIKey } from '../i18n';

export interface SocialLink {
  label: string;
  href: string;
}

/**
 * `key` is an i18n key rather than a literal label, so nav text is translated
 * rather than duplicated per locale. `path` is locale-independent; the header
 * localizes it at render time.
 *
 * TODO (Phase 3): when this moves into the CMS, constrain `path` to an enum of
 * known routes so an editor cannot point the nav at a URL that doesn't exist.
 */
export interface NavEntry {
  key: UIKey;
  path: string;
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
  /** The footer's link column, which is a different set from the header nav. */
  footerNav: NavEntry[];
}

export const site: SiteData = siteJson as SiteData;
