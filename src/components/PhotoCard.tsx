import type { ReactNode } from 'react';
import type { BaseProp, ResolvedImage } from './types';

type Shape = 'portrait' | 'landscape' | 'wide' | 'square';

interface Props extends BaseProp {
  image: ResolvedImage;
  imageAlt: string;
  shape?: Shape;
  priority?: boolean;
  children?: ReactNode;
}

const shapes: Record<Shape, string> = {
  portrait: 'aspect-[409/484] rounded-media',
  landscape: 'aspect-[699/460] rounded-panel',
  wide: 'aspect-[4/3] rounded-panel xl:aspect-[804/449]',
  square: 'aspect-square rounded-panel',
};

const PhotoCard = ({
  image,
  imageAlt,
  shape = 'portrait',
  priority = false,
  children,
  className = '',
}: Props) => {
  return (
    <figure className={`relative w-full overflow-hidden ${shapes[shape]} ${className}`}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        width={image.width}
        height={image.height}
        alt={imageAlt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      {children && <figcaption className="absolute inset-4 lg:inset-6">{children}</figcaption>}
    </figure>
  );
};

export default PhotoCard;
