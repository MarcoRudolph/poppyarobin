"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface BannerProps {
  quote: string;
  smallImagePath: string;
}

const LyricBanner: React.FC<BannerProps> = ({ quote, smallImagePath }) => {
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
    <div className="h-auto w-full">
      <div className="relative w-full">
        {/* Conditionally render background image based on screen size */}
        {isMobile ? (
          <Image
            src="/images/poppy_sm2.jpg"
            alt="Mobile Background"
            width={640}
            height={200} // Adjust the height based on the image's aspect ratio
            layout="responsive"
            className="h-auto rounded-md object-cover"
          />
        ) : (
          <Image
            src="/images/background2.PNG"
            alt="Background"
            width={1427}
            height={321}
            layout="responsive"
            className="h-auto object-cover sm:h-[321px]"
          />
        )}

        <div className="absolute inset-0 flex flex-row items-center justify-center p-1 sm:mx-auto sm:w-3/4 sm:p-4 lg:w-1/2">
          {/* Smaller image with adjusted size for mobile */}
          <div className="mb-0 flex h-[120px] w-[40%] items-center justify-center sm:mb-0 sm:h-[400px] sm:w-[50%]">
            <Image
              src={smallImagePath}
              alt="Small Image"
              width={120}
              height={180}
              className="object-contain"
            />
          </div>

          {/* Text block */}
          <div className="w-[60%] text-center sm:pl-8 sm:text-left lg:w-full">
            <p className="whitespace-pre-line text-sm font-semibold leading-relaxed text-black">
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

export default LyricBanner;
