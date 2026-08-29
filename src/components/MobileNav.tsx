import type { NavItem } from './types';
import type { Lang } from '../i18n';

interface Props {
  items: NavItem[];
  donate: { label: string; href: string };
  langSwitch: { lang: Lang; label: string; href: string };
  openLabel: string;
}

/**
 * Mobile navigation, built on <details>/<summary> so it ships ZERO JavaScript.
 *
 * This started as a hydrated island and cost ~60 KB gzipped of React runtime on
 * every page of the site — the header is global, so a single `client:*` here
 * taxes even pages with no other interactivity. The browser gives us the whole
 * behaviour for free: <summary> is focusable, toggles on Enter/Space, and
 * manages aria-expanded itself.
 *
 * It renders as an inline dropdown rather than an overlay drawer on purpose.
 * A drawer would need a backdrop, click-outside dismissal and body scroll lock,
 * none of which are possible without JS; a dropdown needs none of them.
 */
export default function MobileNav({ items, donate, langSwitch, openLabel }: Props) {
  return (
    <details className="group relative md:hidden">
      <summary
        aria-label={openLabel}
        className="flex size-10 cursor-pointer items-center justify-center rounded-md text-ink-700 marker:hidden hover:bg-brand-50 [&::-webkit-details-marker]:hidden"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" className="group-open:hidden" d="M4 7h16M4 12h16M4 17h16" />
          <path strokeLinecap="round" className="hidden group-open:block" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </summary>

      <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-ink-500/10 bg-white p-2 shadow-xl">
        <nav aria-label={openLabel} className="flex flex-col">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-3 text-base font-medium text-ink-700 hover:bg-brand-50 hover:text-brand-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={langSwitch.href}
          hrefLang={langSwitch.lang}
          className="block rounded-md px-3 py-3 text-base font-medium text-ink-500 hover:bg-brand-50"
        >
          {langSwitch.label}
        </a>

        <a
          href={donate.href}
          className="mt-1 flex items-center justify-center rounded-full bg-accent-600 px-5 py-3 text-base font-semibold text-white hover:bg-accent-500"
        >
          {donate.label}
        </a>
      </div>
    </details>
  );
}
