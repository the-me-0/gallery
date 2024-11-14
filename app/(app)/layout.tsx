import ModalProvider from '@/lib/components/providers/ModalProvider';
import { Navbar } from '@/lib/components/Navbar';
import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/current-profile';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await currentProfile();

  if (auth.status !== 'success') {
    return null;
  }

  return (
    <>
      <ModalProvider />
      <Navbar profile={auth.data} />
      {children}
    </>
  );
}
