import type { ResolvedImage } from './types';
import Pill from './Pill';

interface Props {
  title: string;
  image: ResolvedImage;
  imageAlt: string;
  href: string;
}

const ProjectCard = ({ title, image, imageAlt, href }: Props) => {
  return (
    <a
      href={href}
      className="group relative block aspect-square w-full overflow-hidden rounded-panel bg-surface-subtle"
    >
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="(width >= 80rem) 28rem, (width >= 40rem) 45vw, 90vw"
        width={image.width}
        height={image.height}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 grid place-items-center p-6">
        <Pill variant="title" className="max-w-full text-center">
          {title}
        </Pill>
      </span>
    </a>
  );
};

export default ProjectCard;
