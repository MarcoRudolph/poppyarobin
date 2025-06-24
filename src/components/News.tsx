import React from 'react';
import { DesirePro } from '../lib/fonts';
import Image from 'next/image';

const News: React.FC = () => {
  return (
    <div
      className={`flex flex-col lg:w-1/2 lg:flex-row lg:space-x-6 ${DesirePro.className}`}
    >
      <div className="w-full p-4 lg:w-1/2">
        <h2 className="mb-4 text-6xl font-bold">
          Dreamer! <br />
          ..es ist soweit.
        </h2>
        <p className="mb-4 text-3xl">Erscheinungsdatum war der 18.10.2024</p>
        <p className="mb-8 text-3xl">Das E-Book erhaltet ihr nur bei Amazon.</p>
        <div className="mt-10 flex h-fit items-center overflow-hidden lg:mr-10 lg:mt-0">
          <Image
            src="/images/dreamerdeck-removebg.png"
            alt="First Image"
            loading="lazy"
            width={1600}
            height={1059}
            className="h-full w-full rounded-md"
          />
        </div>

        <p className="mb-8 mt-5 text-3xl">
          Bei der Buchhandlung Graff könnt ihr noch persönlich signierte Bücher
          bestellen
        </p>
      </div>

      {/* Second Column */}
      <div className="w-full p-4 lg:w-1/2">
        <h2 className="mb-4 text-6xl font-bold">Neues Projekt</h2>
        <p className="mb-4 text-3xl">Lorem ipsum dolor sit amet</p>
        <p className="mb-4 text-3xl">Consectetur adipiscing elit</p>
        <p className="mb-8 text-3xl">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
    </div>
  );
};

export default News;
