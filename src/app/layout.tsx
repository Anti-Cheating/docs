import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Sora, JetBrains_Mono } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const siteUrl = 'https://docs.trueyy.com';
const description =
  'Embed Trueyy live interview-integrity monitoring into your own ATS. Mint session tokens, drop in React components, verify webhooks, and pull reports with the @trueyy-sdk packages.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Trueyy SDK Documentation',
    template: '%s | Trueyy SDK',
  },
  description,
  keywords: [
    'Trueyy SDK',
    'interview integrity API',
    'AI cheating detection SDK',
    '@trueyy-sdk/node',
    '@trueyy-sdk/web',
    'ATS integration SDK',
    'interview monitoring API',
    'session token API',
    'webhooks',
    'developer documentation',
  ],
  authors: [{ name: 'Trueyy' }],
  creator: 'Trueyy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Trueyy SDK Documentation',
    description,
    url: siteUrl,
    siteName: 'Trueyy SDK',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trueyy SDK Documentation',
    description,
    site: '@trueyyhq',
    creator: '@trueyyhq',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Light-only, no theme toggle: force light before hydration. */}
        <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
      </body>
    </html>
  );
}
