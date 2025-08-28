'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import React, { useRef, ReactNode } from 'react';
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
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* Spacer für Abstand zur Navbar */}
      <div className="h-24 w-full" />
      {/* Display the first image as in About component */}
      {isMobile ? (
        <Image
          src="/images/poppy_sm_bg.jpg" // Replace with the actual path to your image
          alt="Header Image"
          fill
          priority
          objectFit="cover"
        />
      ) : (
        <Image
          src="/images/poppy.jpg" // Replace with the actual path to your image
          alt="Header Image"
          fill
          priority
          objectFit="cover"
        />
      )}

      <div className="z-[10] mt-32 flex w-full flex-col items-center justify-center lg:mt-0 lg:max-w-[1200px] lg:flex-row lg:items-start">
        <div className="mr-5 lg:flex-shrink-0">
          <Image
            src="/images/covers/dreamercover2.jpeg" // Replace with the actual path to your image
            alt="Header Image"
            height={400}
            width={264} // Setting the fixed width to 264px
            quality={100}
            objectFit="contain"
          />
          <div className="z-[10] mt-5 flex justify-center justify-center">
            <a
              href="https://www.amazon.de/Dreamer-Tr%C3%A4ume-l%C3%BCgen-nicht-futuristischen/dp/3989470213?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-1#customerReviews"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block rounded-lg bg-black px-6 py-3 text-4xl  font-semibold text-[#e0b2c8] transition duration-300 ease-in-out hover:bg-[#e0b2c8] hover:text-black"
            >
              Rezensionen
            </a>
          </div>
        </div>
        <div className="ml-4 mt-10 w-full lg:mt-0 lg:w-1/2">
          <h1 className="text-4xl">
            Dreamer - Träume lügen nicht: Band 1 der futuristischen Urban
            Fantasy Dilogie
          </h1>
          <p className=" mt-5 text-2xl">
            Als die Zeitlosen auf die Erde kamen, brachten sie die Erlösung und
            eine schöne neue Welt. Ich bin Shae van Houten, die beste Dreamer,
            die es gibt. Die Menschen meiden mich, weil ich über Leben und Tod
            entscheide. Ihr könnt euch nicht verstecken, denn in euren Träumen
            sehe ich die Wahrheit. Sehe, was ihr getan habt. Und ich irre mich
            nie.
          </p>
        </div>
      </div>
      {/* Abstand über dem ersten Buch-Block */}
      <div className="w-full" style={{ minHeight: '2.5rem' }} />
      {/* Dreamer 2 Block */}
      <div className="z-[10] mt-40 mb-20 flex w-full flex-col items-center justify-center lg:mt-32 lg:max-w-[1200px] lg:flex-row lg:items-start">
        <div className="mr-5 lg:flex-shrink-0">
          <Image
            src="/images/covers/dreamer2_1.jpeg"
            alt="Dreamer 2 Cover"
            height={400}
            width={264}
            quality={100}
            objectFit="contain"
          />
          <div className="z-[10] mt-5 flex justify-center justify-center">
            <a
              href="https://www.amazon.de/Dreamer-erheben-futuristischen-Fantasy-Dilogie/dp/3989470639/ref=sr_1_1?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1ZN5CODVVNN9K&dib=eyJ2IjoiMSJ9.8j_vascBTmVazOMp4OgrYDykpjEwrkLVRsTT_9I7GDUTOGoRFiG8ZzOOPCwsFQpBaA5mNc2VLWG-As61O_4G0kGEzPqe44TGQVAjvec9XCegm3zyaaubrB_mgRxq-YtncYJWrPTGvzVPS3GVCZt89lNO8OpXTp_FZ4JXS4ddHbFF7pnR9lc-FAWp92AF7U_5WK0S0R9o8y8qg2zeBtquQjQhl6cmkCT1yL50svd6eBo.owuUx5bKT_x9MPqx1MZjPYeK82elXvkzoTa0SGYDEfA&dib_tag=se&keywords=dreamer+2+poppy&qid=1756399857&sprefix=dreamer+2+poppy%2Caps%2C76&sr=8-1#averageCustomerReviewsAnchor"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block rounded-lg bg-black px-6 py-3 text-4xl font-semibold text-[#e0b2c8] transition duration-300 ease-in-out hover:bg-[#e0b8c8] hover:text-black"
            >
              Rezensionen
            </a>
          </div>
        </div>
        <div className="ml-4 mt-10 w-full lg:mt-0 lg:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Dreamer 2</h2>
          <p className="text-2xl">
            Als die Risse den Himmel bedeckten,
            <br />
            brachten sie Angst und Schrecken über die Menschheit.
            <br />
            Ich bin Shae van Houten und stehe vor einer unmöglichen Wahl, denn
            meine Welt droht zu zerbrechen.
            <br />
            In euren Träumen steckt mehr als nur die Wahrheit.
            <br />
            Doch in einer Welt, die von ihnen regiert wird, welchen Wert hat da
            die Realität?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dreamer;
