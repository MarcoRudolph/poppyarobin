import React from 'react';
import { DesirePro } from '../lib/fonts';
import Image from 'next/image';
import {
  FaAmazon,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTicketAlt,
} from 'react-icons/fa';

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
      {/* Messe-Announcement */}
      <section className="relative flex w-full flex-col overflow-hidden rounded-2xl border-[3px] border-[#e7c873] bg-white/90 p-6 text-center shadow-2xl transition-transform hover:scale-[1.02] lg:w-1/2">
        <div className="absolute -right-16 -top-16 size-40 rounded-full bg-[#f7d6e6]/60 blur-2xl" />
        <div className="absolute -bottom-20 -left-16 size-44 rounded-full bg-[#e3c6f7]/50 blur-2xl" />

        <div className="relative z-10 flex h-full flex-col items-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e7c873] bg-[#f9f6f2] px-4 py-2 text-xl font-semibold text-[#b89a4c] shadow-sm">
            <FaCalendarAlt />
            Morgen in Kiel
          </p>

          <h2 className="mb-4 text-5xl font-bold leading-tight text-gray-900 lg:text-6xl">
            Poppy A. Robin auf der Buchmesse Kiel
          </h2>

          <p className="mb-5 text-3xl font-semibold text-[#b89a4c]">
            Sonntag, 24. Mai 2026 · Wunderino-Arena, Europaplatz 1
          </p>

          <div className="mb-6 grid w-full gap-3 text-left text-2xl text-gray-800">
            <p className="rounded-xl bg-[#f9f6f2]/90 p-4 shadow-sm">
              Die erste Buchmesse in Kiel bringt Bookies, Autor:innen und
              Geschichten in entspannter Atmosphäre zusammen.
            </p>
            <p className="rounded-xl bg-[#f7d6e6]/55 p-4 shadow-sm">
              Freut euch auf Bücher aus vielen Genres, buchige Extras, Merch,
              Signierstunden und persönlichen Austausch direkt an den Ständen.
            </p>
            <p className="rounded-xl bg-[#e3c6f7]/50 p-4 shadow-sm">
              Die Messe läuft in zwei Time Slots: 11:00–14:00 Uhr und
              15:00–18:00 Uhr. Vor Ort gibt es keine Verpflegung, also am besten
              eine Wasserflasche einpacken.
            </p>
          </div>

          <div className="mb-6 w-full rounded-xl border border-[#e7c873] bg-white/75 p-4 text-left text-2xl text-gray-800 shadow-sm">
            <p className="mb-2 flex items-center gap-2 font-semibold text-[#b89a4c]">
              <FaMapMarkerAlt />
              Anfahrt kurz & einfach
            </p>
            <p>
              Vom Kieler Hauptbahnhof sind es nur etwa 5–7 Minuten zu Fuß. Mit
              dem Bus könnt ihr bis Andreas-Gayk-Straße, Ziegelteich oder
              Exerzierplatz fahren. Wer mit dem Auto kommt, folgt dem Kieler
              Parkleitsystem; Parkmöglichkeiten gibt es unter anderem am
              Exerzierplatz, im Parkhaus Arena Parken und am ZOB.
            </p>
          </div>

          <p className="mb-6 text-3xl font-semibold text-gray-900">
            Wenn ihr ein Ticket habt: Kommt vorbei, stöbert in Dreamer 2, lernt
            Poppy A. Robin kennen und holt euch eine Signatur oder ein paar
            persönliche Worte ab.
          </p>

          <a
            href="https://eventfrog.de/de/p/messen/messe/buchmesse-kiel-7419673921421631120.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-center gap-2 rounded-lg border-2 border-[#e7c873] bg-gradient-to-r from-[#e7c873] via-[#f7d6e6] to-[#e3c6f7] px-6 py-3 text-2xl font-semibold text-gray-900 shadow-xl transition-all duration-200 hover:brightness-105"
          >
            <FaTicketAlt />
            Eventinfos
          </a>
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
