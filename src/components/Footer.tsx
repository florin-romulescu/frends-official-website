import type { NavItem, LinkProps } from './types';

interface Props {
  siteName: string;
  email: string;
  items: NavItem[];
  social: LinkProps[];
  labels: {
    nav: string;
    followUs: string;
    rights: string;
  };
  year: number;
}

export default function Footer({ siteName, email, items, social, labels, year }: Props) {
  return (
    <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div className="lg:col-span-2">
        <p className="text-lg font-bold tracking-tight text-brand-700">{siteName}</p>
        <a
          href={`mailto:${email}`}
          className="mt-2 inline-block text-sm text-ink-500 hover:text-brand-700"
        >
          {email}
        </a>
      </div>

      <nav aria-label={labels.nav}>
        <h2 className="text-sm font-semibold text-ink-900">{labels.nav}</h2>
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-sm text-ink-500 hover:text-brand-700">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h2 className="text-sm font-semibold text-ink-900">{labels.followUs}</h2>
        <ul className="mt-3 space-y-2">
          {social.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
                className="text-sm text-ink-500 hover:text-brand-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-ink-500/15 pt-6 text-xs text-ink-500 sm:col-span-2 lg:col-span-4">
        © {year} {siteName}. {labels.rights}
      </p>
    </div>
  );
}
