"use client";

import Image from "next/image";
import React, { useRef, ReactNode } from "react";
import { OpenSans, DesirePro, Dancing } from "../lib/fonts";
import { StickyNavbar } from "@/components/NavBar";


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
 

  return (
    <html lang="de" suppressHydrationWarning>
      <head />
      <body className={`relative w-full flex flex-col bg-white antialiased ${OpenSans.className || ""}`}>
        <StickyNavbar />
        <main className="relative w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
