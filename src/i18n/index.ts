import ro from '../data/i18n/ro.json';

export const defaultLang = 'ro' as const;

export const languages = {
  ro: 'Română',
} as const;

export type Lang = keyof typeof languages;

export type UIKey = keyof typeof ro;

const dictionaries: Record<Lang, Record<UIKey, string>> = { ro };

export const isLang = (value: string): value is Lang => value in languages;

export const getLangFromUrl = (url: URL): Lang => {
  const [, maybeLang] = url.pathname.split('/');
  return maybeLang && isLang(maybeLang) ? maybeLang : defaultLang;
};

export const useTranslations = (lang: Lang) => {
  const dict = dictionaries[lang];
  return (key: UIKey): string => dict[key];
};

export const stripLangPrefix = (pathname: string): string => {
  const [, maybeLang, ...rest] = pathname.split('/');
  if (maybeLang && isLang(maybeLang) && maybeLang !== defaultLang) {
    return '/' + rest.join('/');
  }
  return pathname;
};

export const localizePath = (path: string, lang: Lang): string => {
  const clean = '/' + stripLangPrefix(path).replace(/^\/+/, '');
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
};

export const isExternal = (href: string): boolean => /^(https?:)?\/\//.test(href) || href.startsWith('mailto:');

export const localizeHref = (href: string, lang: Lang): string =>
  isExternal(href) ? href : localizePath(href, lang);

const locales: Record<Lang, string> = { ro: 'ro-RO' };

export const formatDate = (isoDate: string, lang: Lang): string =>
  new Intl.DateTimeFormat(locales[lang], { dateStyle: 'long' }).format(new Date(isoDate));

const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

const formatMonthYear = (isoDate: string, lang: Lang): string =>
  capitalize(
    new Intl.DateTimeFormat(locales[lang], { month: 'long', year: 'numeric' }).format(new Date(isoDate)),
  );

export const formatPeriod = (startDate: string, endDate: string | undefined, lang: Lang): string => {
  const start = formatMonthYear(startDate, lang);
  const end = endDate ? formatMonthYear(endDate, lang) : start;
  return start === end ? start : `${start} - ${end}`;
};
