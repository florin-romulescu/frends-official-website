import type { ReactNode } from 'react';
import type { BaseProp } from './types';

type Variant = 'title' | 'caption' | 'stat' | 'gray' | 'note';

interface Props extends BaseProp {
  children: ReactNode;
  variant?: Variant;
}

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
