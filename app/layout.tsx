import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PreferencesProvider from '@/lib/components/providers/PreferencesProvider';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Wonders of the world',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-theme='blue'>
      <body className={inter.className && 'h-full'}>
        <SessionProvider>
          <PreferencesProvider>{children}</PreferencesProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
