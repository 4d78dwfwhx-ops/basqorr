import '../app/globals.css';
import type { Metadata } from 'next';
import { dir } from 'i18next';
import { ReactNode } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// Tajawal font import via next/font/google
import { Tajawal } from 'next/font/google';

// i18n language detection (simple example, can be replaced with more robust logic)
function getLocale(): { lang: string; dir: 'rtl' | 'ltr' } {
  if (typeof window !== 'undefined') {
    const lang = document.documentElement.lang || navigator.language || 'ar';
    if (lang.startsWith('ar')) return { lang: 'ar', dir: 'rtl' };
    return { lang: 'en', dir: 'ltr' };
  }
  // Default to Arabic/RTL for SSR
  return { lang: 'ar', dir: 'rtl' };
}

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'BASQOR | منصة بسكور للسيارات',
  description:
    'كل خدمات وقطع غيار السيارات السعودية في مكان واحد: قطع غيار جديدة ومستعملة، مناديب، ورش، فحص، سحب وصيانة، متاجر متخصصة. منصة بسكور.',
  keywords:
    'BASQOR, بسكور, قطع غيار السيارات, تشاليح, فحص سيارات, منصة سيارات, منصة صيانة سيارات',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  openGraph: {
    title: 'BASQOR | منصة السيارات السعودية',
    description: 'منصة تجمع كل احتياجات سيارتك: جديدة، مستعملة، خدمات، تشاليح.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // For SSR, use default; for client, detect language/dir
  const { lang, dir: textDir } = getLocale();

  return (
    <html lang={lang} dir={textDir} className={tajawal.variable}>
      <body className="bg-grayBg text-dark font-tajawal min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 container mx-auto px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
