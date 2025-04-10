'use client';

import Image from 'next/image';
import React, { useRef, ReactNode } from 'react';
import { OpenSans, DesirePro, Dancing } from '../../lib/fonts';
import { StickyNavbar } from '@/components/NavBar';
import { SessionProvider } from 'next-auth/react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head />
      <body
        className={`relative w-full flex flex-col bg-white antialiased ${DesirePro.className}`}
      >
        <StickyNavbar />
        <main className="relative w-full">
          <SessionProvider>{children}</SessionProvider>
        </main>
      </body>
    </html>
  );
}
