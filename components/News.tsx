import React from "react";
import { DesirePro } from "@/lib/fonts";
import Image from "next/image";

const News: React.FC = () => {
  return (
    <div
      className={`flex flex-col lg:w-1/2 lg:flex-row lg:space-x-6 ${DesirePro.className}`}
    >
      <div className="w-full p-4 lg:w-1/2">
        <h2 className="mb-4 text-6xl font-bold">
          Dreamer! <br />
          ..bald ist es soweit.
        </h2>
        <p className="mb-4 text-3xl">Erscheinungsdatum: 18.10.2024</p>
        <p className="mb-8 text-3xl">Das E-Book erhaltet ihr nur bei Amazon.</p>
        <div className="mt-10 flex h-fit items-center overflow-hidden lg:mr-10 lg:mt-0">
          <Image
            src="/images/dreamerdeck-removebg.png"
            alt="First Image"
            layout="responsive"
            loading="lazy"
            width={1600}
            height={1059}
            objectFit="cover"
            className="h-full w-full rounded-md"
          />
        </div>

        <p className="mb-8 mt-5 text-3xl">
          Bei der Buchhandlung Graff könnt ihr noch persönlich signierte Bücher
          bestellen
        </p>
      </div>

      {/* First Column */}
      <div className="w-full p-4 lg:w-1/2">
        <h2 className="mb-4 text-6xl font-bold">
          Wir sind auf der Frankfurter Buchmesse!
        </h2>
        <p className="mb-4 text-3xl">Freitag 18.10. 2024</p>
        <p className="mb-8 text-3xl">
          Wir feiern den Release unseres neuen Buchs "Dreamer". Kommt vorbei!
          ...cEs wird legendär.
        </p>
        <p className="mt-2 text-3xl">Samstag 19.10. 2024</p>
        <p className="mb-2  text-3xl">
          Am Samstag sind wir nur noch als Gäste unterwegs. Wir sehen uns beim
          Dunkelstern Verlag!
        </p>
        {/* <Image
          src="/images/fbm.jpg"
          alt="First Image"
          width={200}
          height={200}
          objectFit="contain"
          className="mt-4 w-full object-cover"
        /> */}
      </div>
    </div>
  );
};

export default News;
