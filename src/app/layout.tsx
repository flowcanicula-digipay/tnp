import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: 'TNP',
  description: 'Supplying solid wood flooring and timber furniture.',
  manifest: `${base}/assets/favicon/site.webmanifest`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={`${base}/assets/favicon/favicon.ico`} sizes="any" />
        <link rel="shortcut icon" href={`${base}/assets/favicon/favicon.ico`} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
