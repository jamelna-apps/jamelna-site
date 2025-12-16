import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always show locale in URL
  localePrefix: 'always'
});

export async function proxy(request: Request) {
  // Create a response from the intl middleware
  const response = intlMiddleware(request as Parameters<typeof intlMiddleware>[0]);

  // If Supabase is configured, refresh the session
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            const cookieHeader = request.headers.get('cookie');
            if (!cookieHeader) return [];

            return cookieHeader.split(';').map(cookie => {
              const [name, ...valueParts] = cookie.trim().split('=');
              return { name, value: valueParts.join('=') };
            });
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              const cookieValue = `${name}=${value}; Path=${options?.path || '/'}; HttpOnly; SameSite=Lax${options?.maxAge ? `; Max-Age=${options.maxAge}` : ''}`;
              response.headers.append('Set-Cookie', cookieValue);
            });
          },
        },
      }
    );

    // Refresh session if expired - this will update cookies
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next`, `/_vercel`, or `/studio`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)']
};
