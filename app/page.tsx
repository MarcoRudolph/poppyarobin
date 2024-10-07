"use client"
import React, { useRef, ReactNode } from "react";
import Image from "next/image";
import "./globals.css";
import News from "@/components/News";
import { OpenSans, DesirePro, Dancing } from "../lib/fonts";
import FooterLinks from "@/components/FooterLinks";
import { FaChevronDown } from "react-icons/fa";

export default function Home() {
  const newsRef = useRef<HTMLElement>(null);
  return (
    <div className="flex min-h-screen flex-col">
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
          <div className="absolute inset-x-0 bottom-20 flex justify-center">
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
      <main ref={newsRef} className="flex w-full flex-grow flex-col items-center justify-start">
        <News />
      </main>
      <FooterLinks  />
    </div>
  );
}
