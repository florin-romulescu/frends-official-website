import type { EventStatus, ResolvedImage } from './types';
import StatusBadge from './StatusBadge';

interface Props {
  title: string;
  period: string;
  description: string;
  image: ResolvedImage;
  imageAlt: string;
  status: EventStatus;
  statusLabel: string;
  href: string;
  readMoreLabel: string;
}

const EventCard = ({
  title,
  period,
  description,
  image,
  imageAlt,
  status,
  statusLabel,
  href,
  readMoreLabel,
}: Props) => {
  return (
    <article className="relative flex h-full w-full flex-col overflow-hidden rounded-panel bg-surface shadow-card">
      <div className="relative aspect-[440/190] w-full shrink-0 overflow-hidden">
        <img
          src={image.src}
          srcSet={image.srcSet}
          width={image.width}
          height={image.height}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
        <StatusBadge status={status} label={statusLabel} className="absolute top-4 left-4" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-h4">
          <a href={href} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </a>
        </h3>
        <p className="text-body-sm font-black text-ink-muted">{period}</p>
        <p className="text-body-sm text-ink-secondary">{description}</p>
        <p className="mt-auto pt-4 text-body-sm font-black text-brand">
          {readMoreLabel} <span aria-hidden="true">→</span>
        </p>
      </div>
    </article>
  );
};

export default EventCard;
