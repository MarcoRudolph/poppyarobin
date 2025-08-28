import React from 'react';
import { DesirePro } from '../lib/fonts';
import Image from 'next/image';
import { FaAmazon } from 'react-icons/fa';

// Farbschema inspiriert vom Bild:
// Gold: #e7c873, #e6c36f, #f6e7c1, #d6b86a
// Rosa: #f7d6e6, #f3c6e0, #f7e6f7
// Lila: #e3c6f7, #d6b6f7, #c6a6e7
// Creme/Weiß: #f9f6f2, #f7f3e9

const News: React.FC = () => {
  return (
    <div
      className={`flex flex-col lg:w-1/2 lg:flex-row lg:space-x-8 ${DesirePro.className}`}
    >
      {/* Erste Card - HERVORGEHOBEN */}
      <div className="w-full p-4 lg:w-1/2 flex flex-col items-center text-center bg-white/90 rounded-2xl shadow-2xl border-[3px] border-[#e7c873] mb-6 lg:mb-0 transition-transform hover:scale-[1.035] relative overflow-hidden">
        <h2 className="mb-4 text-6xl font-bold bg-gradient-to-r from-[#d6b86a] via-[#e3a6b6] to-[#b68fd6] bg-clip-text text-transparent drop-shadow-lg">
          Dreamer 2 ist da.
        </h2>
        <p className="mb-6 text-3xl font-semibold text-[#b89a4c]">
          Träume erheben sich
        </p>
        <div className="mt-4 flex h-fit items-center justify-center overflow-hidden lg:mt-0">
          <Image
            src="/images/covers/dreamer2_1.jpeg"
            alt="Dreamer 2 Cover"
            loading="lazy"
            width={1600}
            height={1059}
            className="h-full w-full rounded-md shadow-lg border border-blue-200"
          />
        </div>
        <a
          href="https://www.amazon.de/Dreamer-erheben-futuristischen-Fantasy-Dilogie-ebook/dp/B0FB45KNM1/ref=sr_1_3?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-3"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center text-2xl font-semibold bg-gradient-to-r from-[#e7c873] via-[#f7d6e6] to-[#e3c6f7] text-gray-900 px-6 py-3 rounded-lg shadow-xl hover:brightness-105 transition-all duration-200 gap-2 border-2 border-[#e7c873]"
        >
          <FaAmazon />
          Zum Buch
        </a>
      </div>

      {/* Zweite Card */}
      <div className="w-full p-4 lg:w-1/2 flex flex-col items-center text-center bg-white/80 rounded-xl shadow-lg border border-gray-200 transition-transform hover:scale-[1.025]">
        <h2 className="mb-4 text-6xl font-bold">
          Vielen Dank an alle, die sich mit uns auf die Dreamer-Reise begeben.
        </h2>
        <p className="mb-6 text-3xl">
          Über eine Rückmeldung würden wir uns sehr freuen!
        </p>
        <a
          href="https://www.amazon.de/Dreamer-erheben-futuristischen-Fantasy-Dilogie-ebook/dp/B0FB45KNM1/ref=sr_1_3?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-3#averageCustomerReviewsAnchor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-2xl font-semibold bg-gradient-to-r from-[#e7c873] via-[#f7d6e6] to-[#e3c6f7] text-gray-900 px-6 py-3 rounded-lg shadow-xl hover:brightness-105 transition-all duration-200 gap-2 border-2 border-[#e7c873]"
        >
          Rezensionen
        </a>
      </div>
    </div>
  );
};

export default News;
