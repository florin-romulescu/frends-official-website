import type { NavItem } from './types';

interface Props {
  items: NavItem[];
  caret: string;
}

const Nav = ({ items, caret }: Props) => {
  return (
    <ul className="hidden items-center gap-1.5 lg:flex">
      {items.map((item) => (
        <li key={item.href} className="group relative">
          <a
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={`flex h-12 items-center justify-center gap-2 rounded-pill px-5 text-body whitespace-nowrap transition-colors ${
              item.active
                ? 'bg-surface-subtle font-bold text-ink'
                : 'text-ink hover:bg-surface-subtle'
            }`}
          >
            {item.label}
            {item.children && (
              <img
                src={caret}
                alt=""
                width={10}
                height={6}
                className="h-1.5 w-2.5 shrink-0"
              />
            )}
          </a>

          {item.children && (
            <div className="invisible absolute top-full left-0 z-50 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="flex flex-col gap-1 rounded-pill bg-surface p-2 shadow-nav">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <a
                      href={child.href}
                      aria-current={child.current ? 'page' : undefined}
                      className={`block rounded-xl px-4 py-3 text-body font-bold whitespace-nowrap transition-colors ${
                        child.active ? 'bg-surface-subtle' : 'hover:bg-surface-subtle'
                      }`}
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Nav;
