import ro from '../data/i18n/ro.json';

export const defaultLang = 'ro' as const;

/** Romanian only for now. Add a locale here and its dictionary below. */
export const languages = {
  ro: 'Română',
} as const;

export type Lang = keyof typeof languages;

/** `ro.json` is the source of truth for the key set. */
export type UIKey = keyof typeof ro;

/**
 * Typing every dictionary as `Record<UIKey, string>` means a missing translation
 * is a compile error, not a silent fallback discovered in production.
 */
const dictionaries: Record<Lang, Record<UIKey, string>> = { ro };

export const isLang = (value: string): value is Lang => value in languages;

/** `/en/blog` -> `en`; `/blog` -> `ro`. */
export const getLangFromUrl = (url: URL): Lang => {
  const [, maybeLang] = url.pathname.split('/');
  return maybeLang && isLang(maybeLang) ? maybeLang : defaultLang;
};

export const useTranslations = (lang: Lang) => {
  const dict = dictionaries[lang];
  return (key: UIKey): string => dict[key];
};

/** Strip a leading locale segment, yielding a locale-independent path. */
export const stripLangPrefix = (pathname: string): string => {
  const [, maybeLang, ...rest] = pathname.split('/');
  if (maybeLang && isLang(maybeLang) && maybeLang !== defaultLang) {
    return '/' + rest.join('/');
  }
  return pathname;
};

/** `('/blog', 'en')` -> `/en/blog`; `('/blog', 'ro')` -> `/blog`. */
export const localizePath = (path: string, lang: Lang): string => {
  const clean = '/' + stripLangPrefix(path).replace(/^\/+/, '');
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
};
