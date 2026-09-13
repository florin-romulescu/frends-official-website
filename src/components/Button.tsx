import type { ReactNode } from 'react';
import type { BaseProp } from './types';

type Variant = 'primary' | 'secondary';
type Tone = 'brand' | 'accent';
type Size = 'md' | 'lg';

interface Props extends BaseProp {
  children: ReactNode;
  href: string;
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  external?: boolean;
}

const variants: Record<`${Variant}-${Tone}`, string> = {
  'primary-brand': 'bg-brand text-on-brand hover:bg-brand-dark',
  'primary-accent': 'bg-(--accent) text-on-brand hover:brightness-90',
  'secondary-brand': 'border-2 border-brand text-brand hover:bg-brand hover:text-on-brand',
  'secondary-accent':
    'border-2 border-(--accent) text-(--accent) hover:bg-(--accent) hover:text-on-brand',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-body-sm sm:h-12 sm:px-7 sm:text-body',
  lg: 'h-12 px-7 text-body sm:h-14 sm:px-9 sm:text-body-lg',
};

const Button = ({
  children,
  href,
  variant = 'primary',
  tone = 'brand',
  size = 'md',
  external = false,
  className = '',
}: Props) => {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex shrink-0 items-center justify-center rounded-pill font-black whitespace-nowrap transition-colors ${variants[`${variant}-${tone}`]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
};

export default Button;
