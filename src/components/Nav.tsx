import type { NavItem } from './types';

interface Props {
  items: NavItem[];
}

const Nav = ({ items }: Props) => {
  return (
    <ul className="hidden items-center gap-1.5 lg:flex">
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={`flex h-12 items-center justify-center rounded-pill px-5 text-body whitespace-nowrap transition-colors ${
              item.current
                ? 'bg-surface-subtle font-bold text-ink'
                : 'text-ink hover:bg-surface-subtle'
            }`}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
