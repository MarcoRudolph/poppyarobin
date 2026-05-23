'use client';

import React from 'react';
import { OpenSans, DesirePro, Dancing } from '../lib/fonts';
import { StickyNavbar } from '../components/NavBar';
import { ThemeProvider } from '@material-tailwind/react';
import './globals.css';
import { SupabaseAuthProvider } from '../lib/context/AuthContext';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <title>Poppy A. Robin</title>
        <meta
          name="description"
          content="Eternal Romantasy · Dreamer 2 ist da."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:site_name" content="Poppy A. Robin" />
        <meta property="og:url" content="https://www.poppyarobin.de" />
        <meta property="og:title" content="Poppy A. Robin" />
        <meta
          property="og:description"
          content="Eternal Romantasy · Dreamer 2 ist da."
        />
        <meta
          property="og:image"
          content="https://www.poppyarobin.de/images/pair.jpeg"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1132" />
        <meta property="og:image:height" content="1600" />
        <meta
          property="og:image:alt"
          content="Die Hauptprotagonisten aus Dreamer von Poppy A. Robin"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Poppy A. Robin" />
        <meta
          name="twitter:description"
          content="Eternal Romantasy · Dreamer 2 ist da."
        />
        <meta
          name="twitter:image"
          content="https://www.poppyarobin.de/images/pair.jpeg"
        />
      </head>
      <body
        className={`relative flex w-full flex-col bg-white antialiased ${DesirePro.className}`}
      >
        <SupabaseAuthProvider>
          <ThemeProvider>
            <StickyNavbar />
            <main className="relative w-full">{children}</main>
          </ThemeProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
