"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import "../../globals.css";
import React, { useRef, ReactNode } from "react";
const Dreamer = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Hook to check if the screen width is small
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind 'sm' breakpoint is at 640px
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center lg:h-[calc(100vh-70px)] lg:max-h-screen">
      {/* Display the first image as in About component */}
      {isMobile ? (
        <Image
          src="/images/poppy_sm_bg.jpg" // Replace with the actual path to your image
          alt="Header Image"
          fill
          objectFit="cover"
        />
      ) : (
        <Image
          src="/images/poppy.jpg" // Replace with the actual path to your image
          alt="Header Image"
          fill
          objectFit="cover"
        />
      )}

      <div className="z-[10] mt-10 flex w-full flex-col items-center justify-center overflow-hidden lg:mt-0 lg:max-w-[1200px] lg:flex-row lg:items-start">
        <div className="mr-5 lg:flex-shrink-0">
          <Image
            src="/images/covers/dreamercover2.jpeg" // Replace with the actual path to your image
            alt="Header Image"
            height={400}
            width={264} // Setting the fixed width to 264px
            quality={100}
            objectFit="contain"
          />
        </div>
        <div className="ml-4 mt-10 w-full lg:mt-0 lg:w-1/2">
          <h1 className="text-6xl">
            Dreamer - Träume lügen nicht: Band 1 der futuristischen Urban
            Fantasy Dilogie
          </h1>
          <p className=" mt-5 text-4xl">
            Als die Zeitlosen auf die Erde kamen, brachten sie die Erlösung und
            eine schöne neue Welt. Ich bin Shae van Houten, die beste Dreamer,
            die es gibt. Die Menschen meiden mich, weil ich über Leben und Tod
            entscheide. Ihr könnt euch nicht verstecken, denn in euren Träumen
            sehe ich die Wahrheit. Sehe, was ihr getan habt. Und ich irre mich
            nie.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dreamer;
