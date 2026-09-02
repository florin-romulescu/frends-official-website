import type { NavItem } from './types';
import Button from './Button';

interface Props {
  items: NavItem[];
  cta: { label: string; href: string };
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
const MobileNav = ({ items, cta, openLabel }: Props) => {
  return (
    <details className="group relative lg:hidden">
      <summary
        aria-label={openLabel}
        className="flex size-11 cursor-pointer items-center justify-center rounded-pill text-ink marker:hidden hover:bg-surface-subtle [&::-webkit-details-marker]:hidden"
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

      <div className="absolute right-0 z-50 mt-3 w-64 rounded-nav border border-border-default bg-surface p-2 shadow-nav">
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={`block rounded-pill px-3 py-3 text-body-lg transition-colors hover:bg-surface-subtle ${
                  item.current ? 'bg-surface-subtle font-bold' : ''
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <Button href={cta.href} className="mt-2 w-full">
          {cta.label}
        </Button>
      </div>
    </details>
  );
};

export default MobileNav;
