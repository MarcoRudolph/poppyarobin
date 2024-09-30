"use client";
import { Open_Sans as FontSans } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Include normal (400), semi-bold (600), and bold (700) weights
  style: ["normal", "italic"], // Include normal and italic styles
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
          "flex flex-col min-h-screen bg-white font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="w-full h-48 md:h-56 lg:h-[500px] relative">
          {/* Image Section */}
          <Image
             src="/images/background2.png"
             alt="Header image"
             layout="fill"
             objectFit="contain"
             className="absolute inset-0 rounded-xl"
             quality={100}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
