import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'main' | 'footer' | 'header';
}

/** React-side counterpart to the `container-content` utility in global.css. */
export default function Container({ children, className = '', as: Tag = 'div' }: Props) {
  return <Tag className={`container-content ${className}`}>{children}</Tag>;
}
