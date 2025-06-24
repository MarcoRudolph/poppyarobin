'use client';

import Image from 'next/image';
import { OpenSans, DesirePro, Dancing } from '../lib/fonts';

const About = () => {
  return (
    <div className="mx-auto flex w-full flex-col items-start justify-center sm:flex-row lg:mt-10 lg:w-1/2">
      <div className="mx-auto mt-10 flex h-2/3 w-2/3 items-center overflow-hidden shadow-[10px_10px_15px_rgba(0,0,0,0.3)] md:p-4 lg:mr-10 lg:mt-0 lg:h-80 lg:w-80 lg:p-0">
        <Image
          src="/images/poppybio1.jpg"
          alt="Poppy A. Robin - Katja und Gesa"
          width={500}
          height={500}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div className="mx-auto mt-10 flex w-10/12 flex-col items-start leading-relaxed sm:w-full sm:text-sm md:w-1/2 md:p-4 lg:mt-0 lg:w-1/2">
        <h2 className="text-4xl">Über uns</h2>
        <p className="text-2xl">
          Poppy A. Robin, das sind wir, Katja und Gesa aus
          Deutschland/Schleswig-Holstein, beide Lehrerin an einer
          Gemeinschaftsschule.
          <br />
          Als Klassenlehrerinnen hören wir jeden Tag Storys, die manchmal
          fantastisch und aberwitzig sind. Nun haben wir begonnen, unsere
          eigenen Geschichten zu erfinden. Unabhängig voneinander wollten wir
          immer Bücher schreiben, wären aber nie dazu gekommen, hätten wir uns
          nicht gegenseitig inspiriert.
          <br />
          Die Wahl der Genre fiel uns leicht, denn nachdem Gesa Katja mit
          Romantasy, Fantasy und Dystopien angefixt hatte, gab es für Katja kein
          Halten mehr. Fae, Hexen und Elfen zogen in ihre Bücherregale ein.
          <br />
          Seitdem plotten und schreiben wir gemeinsam mit viel Hingabe und Spaß
          an unseren fantastischen Geschichten, in denen auch die Liebe nie
          fehlt.
        </p>
      </div>
    </div>
  );
};

export default About;
