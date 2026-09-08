import type { ReactNode } from 'react';
import type { BaseProp } from './types';

type Variant = 'primary' | 'secondary';
type Size = 'md' | 'lg';

interface Props extends BaseProp {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-on-brand hover:bg-brand-dark',
  secondary:
    'border-2 border-brand text-brand hover:bg-brand hover:text-on-brand',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-body-sm sm:h-12 sm:px-7 sm:text-body',
  lg: 'h-12 px-7 text-body sm:h-14 sm:px-9 sm:text-body-lg',
};

const Button = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  external = false,
  className = '',
}: Props) => {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex shrink-0 items-center justify-center rounded-pill font-black whitespace-nowrap transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
};

export default Button;
