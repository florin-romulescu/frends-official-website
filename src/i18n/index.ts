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
