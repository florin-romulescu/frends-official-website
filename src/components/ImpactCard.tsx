import type { ResolvedImage } from './types';
import Pill from './Pill';

interface Props {
  image: ResolvedImage;
  imageAlt: string;
  /** Stat overlays stacked at the top of the photo, e.g. "4,000+ puieți plantați". */
  stats: string[];
  /** Optional smaller caption pinned to the bottom, for descriptive text. */
  caption?: string;
}

/** A tall photo from "Impactul Nostru" with stat pills overlaid on it. */
const ImpactCard = ({ image, imageAlt, stats, caption }: Props) => {
  return (
    <figure className="relative aspect-[409/484] w-full overflow-hidden rounded-media">
      <img
        src={image.src}
        srcSet={image.srcSet}
        width={image.width}
        height={image.height}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />

      <figcaption className="absolute inset-0 flex flex-col items-start gap-2 p-5">
        {stats.map((stat) => (
          <Pill key={stat} variant="stat">
            {stat}
          </Pill>
        ))}
        {caption && (
          <Pill variant="note" className="mt-auto max-w-full text-left">
            {caption}
          </Pill>
        )}
      </figcaption>
    </figure>
  );
};

export default ImpactCard;
