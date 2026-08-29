import type { NavItem } from './types';

interface Props {
  items: NavItem[];
  currentPath: string;
}

export default function Nav({ items, currentPath }: Props) {
  return (
    <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
      {items.map((item) => {
        const isCurrent = currentPath === item.href || currentPath === `${item.href}/`;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isCurrent ? 'page' : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-50 hover:text-brand-700 ${
              isCurrent ? 'text-brand-700' : 'text-ink-700'
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
