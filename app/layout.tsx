"use client";

import Image from "next/image";
import React, { useRef, ReactNode } from "react";
import { OpenSans, DesirePro, Dancing } from "../lib/fonts";
import { StickyNavbar } from "@/components/NavBar";
import { FaChevronDown } from "react-icons/fa";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const newsRef = useRef<HTMLElement>(null);

  return (
    <html lang="de" suppressHydrationWarning>
      <head />
      <body className={`relative flex flex-col bg-white antialiased ${OpenSans.className || ""}`}>
        <StickyNavbar />

        <div className="relative h-[calc(100vh-70px)] w-full">
          <Image
            src="/images/poppy.jpg"
            alt="Header image"
            fill
            quality={100}
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-x-0 top-[200px] flex justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className={`mt-5 text-center text-9xl text-black ${DesirePro.className}`}>
                Poppy A. Robin
              </h1>
              <h1 className={`mt-5 text-center text-7xl text-black ${Dancing.className}`}>
                Eternal Romantasy
              </h1>
            </div>
          </div>
          {/* Down Arrow */}
          <div className="absolute inset-x-0 bottom-10 flex justify-center">
            <button
              onClick={() => {
                newsRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="animate-bounce text-white"
              aria-label="Scroll to news section"
            >
              <FaChevronDown size={30} color="darkslategrey" />
            </button>
          </div>
        </div>

        <main className="relative mt-10" ref={newsRef}>
          {children}
        </main>
      </body>
    </html>
  );
}
