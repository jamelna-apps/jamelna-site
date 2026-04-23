import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { locales } from '@/i18n';
import { AnalyticsProvider } from '@/analytics';
import "../globals.css";

// Display font - bold and geometric for headlines
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Body font - clean and readable
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// Monospace font - for technical accents
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Joe Alexander Meléndez-Naharro | Emerging Technology Strategist",
    es: "Joe Alexander Meléndez-Naharro | Estratega de Tecnología Emergente",
    de: "Joe Alexander Meléndez-Naharro | Stratege für neue Technologien",
    zh: "Joe Alexander Meléndez-Naharro | 新兴技术战略师"
  };

  const descriptions = {
    en: "Emerging technology strategist specializing in K-12 innovation, AI in education, and scaling emerging tech programs. 15+ years evaluating, piloting, and implementing technologies that move the needle for students.",
    es: "Estratega de tecnología emergente especializado en innovación K-12, IA en educación y escalado de programas de tecnología emergente. Más de 15 años de experiencia.",
    de: "Stratege für neue Technologien, spezialisiert auf K-12-Innovation, KI in der Bildung und Skalierung von Technologieprogrammen. Über 15 Jahre Erfahrung.",
    zh: "新兴技术战略师，专注于K-12创新、教育人工智能以及扩展新兴技术项目。15年以上经验。"
  };

  return {
    metadataBase: new URL('https://jamelna.com'),
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: "emerging technology strategist, K-12 innovation, AI in education, computer science education, education technology, bilingual",
    authors: [{ name: "Joe Alexander Meléndez-Naharro" }],
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale using hasLocale helper
  if (!hasLocale(locales, locale)) {
    notFound();
  }

  // Get messages for this locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-canvas text-text-primary font-body">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AnalyticsProvider projectId="jamelna">
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Navigation />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </AnalyticsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
