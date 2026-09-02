interface Props {
  href: string;
  /** Accessible name — the logo is an image, so it needs a text equivalent. */
  name: string;
  className?: string;
}

/** The FRENDS wordmark, exported from Figma as SVG. */
const Brand = ({ href, name, className = '' }: Props) => {
  return (
    <a href={href} className={`inline-flex items-center ${className}`}>
      <span className="sr-only">{name}</span>
      <img
        src="/icons/logo.svg"
        alt=""
        width={116}
        height={48}
        className="h-9 w-auto lg:h-12"
      />
    </a>
  );
};

export default Brand;
