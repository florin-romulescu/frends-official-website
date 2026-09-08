import type { ReactNode } from 'react';
import type { BaseProp } from './types';

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface Props extends BaseProp {
  corner?: Corner;
  children: ReactNode;
}

const corners: Record<Corner, string> = {
  'top-left': 'top-0 left-0 items-start',
  'top-right': 'top-0 right-0 items-end',
  'bottom-left': 'bottom-0 left-0 items-start',
  'bottom-right': 'bottom-0 right-0 items-end',
};

const PhotoCardSlot = ({ corner = 'top-left', children, className = '' }: Props) => {
  return (
    <div className={`absolute flex max-w-full flex-col gap-2 ${corners[corner]} ${className}`}>
      {children}
    </div>
  );
};

export default PhotoCardSlot;
