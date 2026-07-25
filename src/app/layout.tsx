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

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.trueyy.com'),
  title: {
    default: 'Trueyy SDK Documentation',
    template: '%s | Trueyy SDK',
  },
  description:
    'Embed Trueyy live interview-integrity monitoring into your own ATS. Backend, React, and framework-agnostic SDKs.',
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
