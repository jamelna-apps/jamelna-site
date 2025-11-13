import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

// Can be imported from a shared config
export const locales = ['en', 'es', 'de', 'zh', 'pt'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // `requestLocale` is a Promise in Next.js 16, so we need to await it
  const requested = await requestLocale;

  // Determine the locale: use the requested locale if valid, otherwise use default
  const locale = hasLocale(locales, requested)
    ? requested
    : defaultLocale;

  const messages = await import(`@/messages/${locale}.json`).then(
    (module) => module.default
  );

  return {
    locale,
    messages
  };
});
