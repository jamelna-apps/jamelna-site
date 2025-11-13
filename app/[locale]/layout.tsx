import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { locales } from '@/i18n';
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titles = {
    en: "Joe Alexander Meléndez-Naharro | EdTech Consultant",
    es: "Joe Alexander Meléndez-Naharro | Consultor EdTech",
    de: "Joe Alexander Meléndez-Naharro | EdTech Berater",
    zh: "Joe Alexander Meléndez-Naharro | 教育科技顾问"
  };

  const descriptions = {
    en: "Education technology consultant specializing in AI in education, computer science programs, and bridging US-Spanish EdTech markets. 15+ years experience.",
    es: "Consultor de tecnología educativa especializado en IA en educación, programas de informática y conexión de mercados EdTech entre EE.UU. y España. Más de 15 años de experiencia.",
    de: "EdTech-Berater spezialisiert auf KI in der Bildung, Informatikprogramme und Verbindung von US-spanischen EdTech-Märkten. 15+ Jahre Erfahrung.",
    zh: "教育技术顾问，专注于教育人工智能、计算机科学项目以及连接美国和西班牙教育科技市场。15年以上经验。"
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: "EdTech consultant, AI in education, computer science education, Spanish EdTech, education technology, bilingual consultant",
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
    <html lang={locale}>
      <body className="antialiased bg-white text-neutral-900">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
