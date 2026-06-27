import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { isSupabaseConfigured } from '@/lib/supabase';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Toko Sitra — Specialty Coffee',
  description:
    'Specialty coffee shop. Nikmati kopi premium dan temukan layanan branding, social media, dan iklan digital bersama Toko Sitra.',
  keywords: ['kopi', 'coffee shop', 'advertising', 'branding', 'agency', 'jakarta'],
  openGraph: {
    title: 'Toko Sitra — Specialty Coffee',
    description: 'Specialty coffee shop',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usingMock = !isSupabaseConfigured;
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {usingMock && (
          <div className="bg-gold px-4 py-2 text-center text-xs font-semibold text-espresso sm:text-sm">
            ⚠️ Mode Demo — Sedang pakai mock data.{' '}
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-espressoDark"
            >
              Setup Supabase
            </a>{' '}
            untuk data asli.
          </div>
        )}
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
