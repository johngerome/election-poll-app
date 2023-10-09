import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Barangay Election App',
  description: 'Barangay Election 2023',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextTopLoader color='#2563eb' showSpinner={true} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
