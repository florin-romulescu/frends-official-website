import type { ReactNode } from 'react';

type Variant = 'title' | 'caption' | 'stat' | 'gray' | 'note';

interface Props {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

/**
 * The rounded label that appears all over the design — as a section title
 * floating over a coloured band, as a photo caption, as a stat overlay on an
 * impact photo, and as a grey tag in the about section.
 *
 * These are one component rather than five because they differ only in type
 * step, radius and surface. Consumers say what the pill *is* (`variant="stat"`)
 * and never how it looks.
 */
const variants: Record<Variant, string> = {
  title:
    'rounded-card bg-surface px-4 py-2 font-heading text-h2 text-ink',
  caption:
    'rounded-panel bg-surface px-4 py-2 text-body-lg font-black text-ink',
  stat: 'rounded-pill bg-surface px-3 py-1 text-stat font-bold text-ink',
  gray: 'rounded-panel bg-surface-subtle px-4 py-2 font-heading text-body-lg text-ink',
  note: 'rounded-pill bg-surface px-3 py-1 text-caption font-bold text-ink',
};

const Pill = ({ children, variant = 'title', className = '' }: Props) => {
  return (
    <span
      className={`inline-flex w-fit items-center justify-center text-balance ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Pill;
