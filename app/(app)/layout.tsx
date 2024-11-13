import ModalProvider from '@/lib/components/providers/ModalProvider';
import { Navbar } from '@/lib/components/Navbar';
import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = await auth();
  // @ts-ignore
  session = (session && session.isAuthenticated) ? session : null
  
  if (!session) {
    redirect('/logout');
    return null;
  }

  return (
    <>
      <ModalProvider />
      <Navbar />
      {children}
    </>
  );
}
