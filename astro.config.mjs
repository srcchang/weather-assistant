import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://srcchang.github.io',
  base: '/weather-assistant',
  output: 'static',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh-Hant',
        locales: { 'zh-Hant': 'zh-Hant', en: 'en', ja: 'ja', ko: 'ko', 'zh-Hans': 'zh-Hans' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: { allowedHosts: true },
    preview: { allowedHosts: true },
  },
  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant', 'en', 'ja', 'ko', 'zh-Hans'],
    routing: { prefixDefaultLocale: true },
  },
});
