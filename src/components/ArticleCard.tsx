import type { ResolvedImage } from './types';
import Pill from './Pill';

interface Props {
  title: string;
  description: string;
  image: ResolvedImage;
  imageAlt: string;
  href: string;
  readMoreLabel: string;
  tags?: string[];
}

const ArticleCard = ({
  title,
  description,
  image,
  imageAlt,
  href,
  readMoreLabel,
  tags = [],
}: Props) => {
  return (
    <article className="relative flex h-full w-full flex-col overflow-hidden rounded-panel bg-surface shadow-card">
      <div className="relative aspect-[440/250] w-full shrink-0 overflow-hidden">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(width >= 80rem) 26rem, (width >= 40rem) 45vw, 90vw"
          width={image.width}
          height={image.height}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
        {tags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Pill key={tag} variant="note">
                {tag}
              </Pill>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-h4">
          <a href={href} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </a>
        </h3>
        <p className="text-body text-ink-secondary">{description}</p>
        <span className="mt-auto pt-2 text-body font-black text-brand">{readMoreLabel} →</span>
      </div>
    </article>
  );
};

export default ArticleCard;
