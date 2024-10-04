"use client";
import { Open_Sans as FontSans } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import NavBar from "../components/NavBar";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "relative flex flex-col min-h-screen bg-white font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="fixed top-0 left-0 w-full h-full z-[-1]">
          <Image
            src="/images/poppy.jpg"
            alt="Header image"
            fill
            quality={100}
            style={{ objectFit: "cover" }}
          />
        </div>
        <NavBar className="relative z-10" />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
