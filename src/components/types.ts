export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
  active?: boolean;
  children?: NavItem[];
}

export interface LinkProps {
  label: string;
  href: string;
}

export interface ResolvedImage {
  src: string;
  srcSet?: string;
  width?: number;
  height?: number;
}

export interface BaseProp {
  className?: string;
}

export type EventStatus = 'open' | 'ongoing' | 'completed';
