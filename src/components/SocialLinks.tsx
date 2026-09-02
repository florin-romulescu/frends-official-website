import type { LinkProps } from './types';

interface Props {
  links: LinkProps[];
  className?: string;
}

/**
 * Icon row for Facebook / Instagram / TikTok.
 *
 * The icon file is chosen from the link label, so `site.json` stays a plain
 * list of label+href and never has to name an asset path.
 */
const icons: Record<string, string> = {
  Facebook: '/icons/facebook.svg',
  Instagram: '/icons/instagram.svg',
  TikTok: '/icons/tiktok.svg',
};

const SocialLinks = ({ links, className = '' }: Props) => {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-9 place-items-center rounded-full transition-opacity hover:opacity-70"
          >
            <span className="sr-only">{link.label}</span>
            <img
              src={icons[link.label] ?? '/icons/facebook.svg'}
              alt=""
              width={20}
              height={20}
              className="size-5"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
