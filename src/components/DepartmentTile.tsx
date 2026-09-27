import type { CSSProperties } from 'react';

interface Props {
  href: string;
  number: string;
  name: string;
  meta: string;
  accent: string;
}

const DepartmentTile = ({ href, number, name, meta, accent }: Props) => {
  return (
    <a
      href={href}
      style={{ '--accent': `var(--color-dept-${accent})` } as CSSProperties}
      className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-card border border-border-default border-t-4 border-t-(--accent) bg-surface p-5 transition duration-300 ease-out hover:-translate-y-1 hover:bg-[color-mix(in_oklab,var(--accent)_8%,white)] hover:shadow-card focus-visible:-translate-y-1 focus-visible:bg-[color-mix(in_oklab,var(--accent)_8%,white)] focus-visible:shadow-card"
    >
      <span aria-hidden="true" className="font-heading text-h3 text-(--accent)">
        {number}
      </span>
      <span className="font-heading text-h5 text-ink">{name}</span>
      <span className="mt-auto flex items-center justify-between text-body-sm text-ink-secondary">
        {meta}
        <span
          aria-hidden="true"
          className="-translate-x-2 text-body-lg text-(--accent) opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        >
          ↓
        </span>
      </span>
    </a>
  );
};

export default DepartmentTile;
