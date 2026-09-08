import type { BaseProp } from "./types";

interface Props extends BaseProp {
  href: string;
  name: string;
}

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
