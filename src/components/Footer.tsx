import type { NavItem, LinkProps } from './types';
import SocialLinks from './SocialLinks';

interface Props {
  tagline: string;
  email: string;
  phone: string;
  addressLines: string[];
  items: NavItem[];
  social: LinkProps[];
  labels: {
    brand: string;
    links: string;
    contact: string;
    address: string;
    rights: string;
  };
  year: number;
}

const Footer = ({
  tagline,
  email,
  phone,
  addressLines,
  items,
  social,
  labels,
  year,
}: Props) => {
  return (
    <div className="py-14">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/icons/logo-footer.svg" alt={labels.brand} width={116} height={48} className="h-10 w-auto" />
          <p className="mt-4 max-w-[330px] text-body-sm text-ink-muted">{tagline}</p>
        </div>

        <nav aria-label={labels.links}>
          <h2 className="font-sans text-body font-bold text-ink">{labels.links}</h2>
          <ul className="mt-3 space-y-2">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-body-sm text-ink-secondary hover:text-brand">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-body font-bold text-ink">{labels.contact}</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={`mailto:${email}`} className="text-body-sm text-ink-secondary hover:text-brand">
                {email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="text-body-sm text-ink-secondary hover:text-brand"
              >
                {phone}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-body font-bold text-ink">{labels.address}</h2>
          <address className="mt-3 text-body-sm text-ink-muted not-italic">
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
      </div>

      <div className="mt-10 flex flex-col-reverse items-center gap-4 border-t border-border-default pt-6 sm:flex-row sm:justify-between">
        <p className="text-caption text-ink-muted">
          © {year} {labels.brand}. {labels.rights}
        </p>
        <SocialLinks links={social} />
      </div>
    </div>
  );
};

export default Footer;
