'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BannerProps {
  quote: string;
  smallImagePath: string;
}

const ColorBanner: React.FC<BannerProps> = ({ quote, smallImagePath }) => {
  return (
    <div className="h-auto w-full border-b-2 border-t-2 border-gray-800 mt-20">
      <div className="w-full bg-[#e7afbf]">
        <div className="mx-auto flex min-h-[300px] w-full flex-row items-center justify-center p-4 sm:w-4/5 lg:w-3/4">
          {/* Left column - Image */}
          <div className="w-1/2 p-4">
            <div className="relative h-[280px] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/shae.PNG"
                alt="Shae Charakter Portrait"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right column - Placeholder text */}
          <div className="w-1/2 p-4 text-center sm:text-left">
            <p className="text-2xl leading-relaxed text-black">
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
