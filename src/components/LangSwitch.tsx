import type { Lang } from '../i18n';

interface Props {
  /** Locale this link switches *to*. */
  lang: Lang;
  label: string;
  href: string;
  className?: string;
}

/**
 * Deliberately a plain link, not an island: switching language is a navigation,
 * so it needs no JavaScript. `href` already points at the current page in the
 * other locale, so the reader stays where they were.
 */
export default function LangSwitch({ lang, label, href, className = '' }: Props) {
  return (
    <a
      href={href}
      hrefLang={lang}
      className={`rounded-md px-3 py-2 text-sm font-medium text-ink-500 transition-colors hover:bg-brand-50 hover:text-brand-700 ${className}`}
    >
      {label}
    </a>
  );
}
