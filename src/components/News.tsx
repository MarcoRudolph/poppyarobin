import React from 'react';
import { DesirePro } from '../lib/fonts';
import Image from 'next/image';
import { FaAmazon } from 'react-icons/fa';

const News: React.FC = () => {
  return (
    <div
      className={`flex flex-col lg:w-1/2 lg:flex-row lg:space-x-6 ${DesirePro.className}`}
    >
      <div className="w-full p-4 lg:w-1/2 flex flex-col items-center text-center">
        <h2 className="mb-4 text-6xl font-bold">Dreamer 2 ist da.</h2>
        <p className="mb-6 text-3xl">Träume erheben sich</p>
        <div className="mt-4 flex h-fit items-center overflow-hidden lg:mr-10 lg:mt-0">
          <Image
            src="/images/covers/dreamercover2.jpeg"
            alt="Dreamer 2 Cover"
            loading="lazy"
            width={1600}
            height={1059}
            className="h-full w-full rounded-md"
          />
        </div>
        <a
          href="https://www.amazon.de/Dreamer-erheben-futuristischen-Fantasy-Dilogie-ebook/dp/B0FB45KNM1/ref=sr_1_3?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-3"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center text-3xl text-blue-500 underline hover:text-blue-700"
        >
          <FaAmazon className="mr-2" />
          Zum Buch
        </a>
      </div>

      {/* Second Column */}
      <div className="w-full p-4 lg:w-1/2 flex flex-col items-center text-center">
        <h2 className="mb-4 text-6xl font-bold">
          Vielen Dank an alle die sich mit uns auf die Dreamer-Reise gemacht haben
        </h2>
        <p className="mb-6 text-3xl">
          Über eine Rückmeldung würden wir uns sehr freuen!
        </p>
        <a
          href="https://www.amazon.de/Dreamer-erheben-futuristischen-Fantasy-Dilogie-ebook/dp/B0FB45KNM1/ref=sr_1_3?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-3#averageCustomerReviewsAnchor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-3xl text-blue-500 underline hover:text-blue-700"
        >
          Rezensionen
        </a>
      </div>
    </div>
  );
};

export default News;
