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
      className={`flex w-full max-w-7xl flex-col gap-8 px-4 lg:w-11/12 lg:flex-row ${DesirePro.className}`}
    >
      {/* Buchmesse Kiel Rückblick */}
      <section className="relative flex w-full flex-col overflow-hidden rounded-2xl border-[3px] border-[#e7c873] bg-white/90 p-6 text-center shadow-2xl transition-transform hover:scale-[1.02] lg:w-1/2">
        <div className="absolute -right-16 -top-16 size-40 rounded-full bg-[#f7d6e6]/60 blur-2xl" />
        <div className="absolute -bottom-20 -left-16 size-44 rounded-full bg-[#e3c6f7]/50 blur-2xl" />

        <div className="relative z-10 flex h-full flex-col items-center">
          <p className="mb-3 inline-flex items-center rounded-full border border-[#e7c873] bg-[#f9f6f2] px-4 py-2 text-xl font-semibold text-[#b89a4c] shadow-sm">
            Rückblick aus Kiel
          </p>

          <h2 className="mb-4 text-5xl font-bold leading-tight text-gray-900 lg:text-6xl">
            Buchmesse Kiel war wunderschön.
          </h2>

          <div className="relative my-8 h-[430px] w-full max-w-[560px] sm:h-[500px] lg:h-[540px]">
            <Image
              src="/images/events/kiel-buchmesse-stand.jpg"
              alt="Messestand von Poppy A. Robin auf der Buchmesse Kiel"
              width={1280}
              height={960}
              className="absolute left-1/2 top-6 z-10 h-56 w-72 -translate-x-1/2 -rotate-3 rounded-2xl border-4 border-white object-cover shadow-2xl sm:h-64 sm:w-80 lg:h-72 lg:w-96"
            />
            <Image
              src="/images/events/kiel-buchmesse-dreamer.jpg"
              alt="Dreamer Bücher am Stand auf der Buchmesse Kiel"
              width={960}
              height={1280}
              className="absolute bottom-6 left-5 z-20 h-64 w-44 rotate-6 rounded-2xl border-4 border-white object-cover shadow-2xl sm:h-72 sm:w-52 lg:h-80 lg:w-56"
            />
            <Image
              src="/images/events/kiel-buchmesse-sternendaemmerung.jpg"
              alt="Sternendämmerung Bücher am Stand auf der Buchmesse Kiel"
              width={960}
              height={1280}
              className="absolute bottom-0 right-5 z-30 h-64 w-44 -rotate-6 rounded-2xl border-4 border-white object-cover shadow-2xl sm:h-72 sm:w-52 lg:h-80 lg:w-56"
            />
          </div>

          <div className="mt-auto rounded-xl bg-[#f9f6f2]/90 p-5 text-left text-2xl leading-relaxed text-gray-800 shadow-sm">
            <p>
              Die Buchmesse Kiel war ein wunderschöner Tag voller Gespräche,
              Bücher und Begegnungen. Poppy A. Robin hat dort viele nette
              Menschen kennengelernt und sich sehr über den Austausch mit
              Leser:innen, Autor:innen und Besucher:innen gefreut. Danke an
              alle, die am Stand vorbeigeschaut, gestöbert und diesen Messetag
              so besonders gemacht haben.
            </p>
          </div>
        </div>
      </section>

      {/* Aktuelles Buch */}
      <section className="flex w-full flex-col items-center overflow-hidden rounded-2xl border-[3px] border-[#e7c873] bg-white/90 p-6 text-center shadow-2xl transition-transform hover:scale-[1.02] lg:w-1/2">
        <h2 className="mb-4 bg-gradient-to-r from-[#d6b86a] via-[#e3a6b6] to-[#b68fd6] bg-clip-text text-6xl font-bold text-transparent drop-shadow-lg">
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
            className="size-full rounded-md border border-blue-200 shadow-lg"
          />
        </div>
        <p className="mt-6 text-3xl text-gray-900">
          Der zweite Band der futuristischen Urban-Fantasy-Dilogie — perfekt,
          um ihn morgen in Kiel direkt am Stand zu entdecken.
        </p>
        <a
          href="https://www.amazon.de/Dreamer-erheben-futuristischen-Fantasy-Dilogie-ebook/dp/B0FB45KNM1/ref=sr_1_3?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&sr=8-3"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-2 rounded-lg border-2 border-[#e7c873] bg-gradient-to-r from-[#e7c873] via-[#f7d6e6] to-[#e3c6f7] px-6 py-3 text-2xl font-semibold text-gray-900 shadow-xl transition-all duration-200 hover:brightness-105"
        >
          <FaAmazon />
          Zum Buch
        </a>
      </section>
    </div>
  );
};

export default News;
