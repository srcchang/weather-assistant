export const locales = ['zh-Hant', 'en', 'ja', 'ko', 'zh-Hans'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh-Hant';

export const localeLabels: Record<Locale, string> = {
  'zh-Hant': '繁體中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  'zh-Hans': '简体中文',
};

export const htmlLang: Record<Locale, string> = {
  'zh-Hant': 'zh-Hant',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  'zh-Hans': 'zh-Hans',
};

export const ogLocale: Record<Locale, string> = {
  'zh-Hant': 'zh_TW',
  en: 'en_US',
  ja: 'ja_JP',
  ko: 'ko_KR',
  'zh-Hans': 'zh_CN',
};
