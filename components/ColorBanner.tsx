"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface BannerProps {
  quote: string;
  smallImagePath: string;
}

const ColorBanner: React.FC<BannerProps> = ({ quote, smallImagePath }) => {
  return (
    <div className="h-auto w-full border-b-2 border-t-2 border-gray-800">
      <div className="relative w-full">
        {/* Conditionally render background image based on screen size */}

        <div className="h-[300px] w-full bg-[#e7afbf] object-cover" />

        <div className="absolute inset-0 flex flex-row items-center justify-center p-1 sm:mx-auto sm:w-3/4 sm:p-4 lg:w-1/2">
          {/* Smaller image with adjusted size for mobile */}
          <div className="mb-0 flex h-[120px] w-[40%] items-center justify-center sm:mb-0 sm:h-[400px] sm:w-[50%]">
            <Image
              src={smallImagePath}
              alt="Small Image"
              width={160}
              height={230}
              className="object-contain"
            />
          </div>

          {/* Text block */}
          <div className="w-[60%] p-2 pt-4 text-center sm:pl-8 sm:text-left lg:w-full">
            <p className="whitespace-pre-line text-2xl font-semibold leading-relaxed text-black">
              "Shae ist ein Charakter der genauso widersprüchlich wie
              authentisch ist. Ihre unter einer Titanschale begrabene
              Verletzlichkeit zeigte sich selten, dafür aber umso spürbarer. Ich
              habe jeden ihrer Gedanken gefühlt, sie verstanden."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorBanner;
