import type { NavItem } from './types';

interface Props {
  items: NavItem[];
  openLabel: string;
}

const MobileNav = ({ items, openLabel }: Props) => {
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
                  item.active ? 'bg-surface-subtle font-bold' : ''
                }`}
              >
                {item.label}
              </a>

              {item.children && (
                <ul className="ms-3 flex flex-col border-s border-border-default ps-2">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <a
                        href={child.href}
                        aria-current={child.current ? 'page' : undefined}
                        className={`block rounded-pill px-3 py-2.5 text-body transition-colors hover:bg-surface-subtle ${
                          child.active ? 'bg-surface-subtle font-bold' : ''
                        }`}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
};

export default MobileNav;
