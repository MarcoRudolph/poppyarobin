'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BannerProps {
  quote: string;
  smallImagePath: string;
}

const ColorBanner: React.FC<BannerProps> = ({ quote, smallImagePath }) => {
  return (
    <div className="h-auto w-full border-b-2 border-t-2 border-gray-800">
      <div className="w-full bg-[#e7afbf]">
        <div className="mx-auto flex min-h-[300px] w-full flex-row items-center justify-center p-4 sm:w-4/5 lg:w-3/4">
          {/* Left column - Image */}
          <div className="w-1/2 p-4">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/kissing2.jpeg"
                alt="Kissing couple"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right column - Placeholder text */}
          <div className="w-1/2 p-4 text-center sm:text-left">
            <p className="text-xl leading-relaxed text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorBanner;
