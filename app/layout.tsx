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

//---x: the first user to be created shall be an admin
//TODO: add button in navbar to invite users (admin only)
//TODO: add button in navbar to index resources (admin only) - remove index from page '/'
//TODO: fix gif display showing dark until first hover
//TODO: make prettier & eslint mandatory (pre-commit hook)
//TODO: complete README.md

//TODO: later: upgrade column display (allow user to select column count, keep the ui from switching the column count auto. at page load)
//TODO: later: Add categories to resources & support for folders in resources

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
