import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary';
type Size = 'md' | 'lg';

interface Props {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  /** Set for links that leave the site; adds the usual rel guard. */
  external?: boolean;
  className?: string;
}

/**
 * The two button styles in the brand book: a filled brand pill and its
 * outlined counterpart.
 *
 * Callers pick a `variant`, never a colour — that is the whole point of the
 * token layer. Every button in the design is a navigation, so this renders an
 * <a>; if a real <button> is ever needed, add an `as` prop rather than
 * reaching for the class list.
 */
const variants: Record<Variant, string> = {
  primary: 'bg-brand text-on-brand hover:bg-brand-dark',
  secondary:
    'border-2 border-brand text-brand hover:bg-brand hover:text-on-brand',
};

/** Touch targets stay >=44px at every size, so `md` is the phone-safe floor. */
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
