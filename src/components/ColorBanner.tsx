'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BannerProps {
  quote: string;
  smallImagePath: string;
}

const ColorBanner: React.FC<BannerProps> = ({ quote, smallImagePath }) => {
  return (
    <div className="mt-20 h-auto w-full border-y-2 border-gray-800">
      <div className="w-full bg-[#e7afbf]">
        <div className="mx-auto flex min-h-[300px] w-full flex-col items-center justify-center p-4 sm:w-4/5 sm:flex-row lg:w-3/4">
          {/* Left column - Image */}
          <div className="w-full p-4 sm:w-1/2">
            <div className="relative h-[200px] w-full overflow-hidden rounded-lg sm:h-[280px]">
              <Image
                src="/images/shae.PNG"
                alt="Shae Charakter Portrait"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right column - Placeholder text */}
          <div className="w-full p-4 text-center sm:w-1/2 sm:text-left">
            <p className="text-lg leading-relaxed text-black sm:text-2xl">
              Shae ist ein Charakter der genauso wiedersprüchlich wie
              authentisch ist. Ihre unter einer Titanschale begrabene
              Verletzlichkeit zeigte sich selten, dafür aber umso spürbarer. Ich
              habe jeden ihrer Gedanken gefühlt, sie verstanden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorBanner;
