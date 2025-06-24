'use client';

import React from 'react';
import { OpenSans, DesirePro, Dancing } from '../lib/fonts';
import { StickyNavbar } from '../components/NavBar';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@material-tailwind/react';
import './globals.css';
import { AuthProvider } from '../lib/context/AuthContext';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head />
      <body
        className={`relative w-full flex flex-col bg-white antialiased ${DesirePro.className}`}
      >
        <AuthProvider>
          <ThemeProvider>
            <StickyNavbar />
            <main className="relative w-full">
              <SessionProvider>{children}</SessionProvider>
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
