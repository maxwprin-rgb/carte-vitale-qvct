// src/app/layout.tsx

import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'QVCT Wrapped 2026 | Ton bilan bien-être au travail',
  description: '2 minutes pour découvrir ton score de Qualité de Vie au Travail. Quiz gratuit, anonyme et partageable sur LinkedIn.',
  keywords: ['QVCT', 'bien-être au travail', 'qualité de vie', 'quiz', 'RH', 'santé mentale'],
  authors: [{ name: 'Ulteam' }],
  openGraph: {
    title: 'QVCT Wrapped 2026 | Découvre ton profil bien-être',
    description: 'Quiz viral de bien-être au travail en 2 min. Gratuit et anonyme.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'QVCT Wrapped by Ulteam',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QVCT Wrapped 2026',
    description: 'Découvre ton score de bien-être au travail en 2 min',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
