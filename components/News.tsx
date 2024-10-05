import React from "react";
import { DesirePro } from "@/lib/fonts";

const News: React.FC = () => {
  return (
    <div
      className={`flex w-1/2 flex-col lg:flex-row lg:space-x-6 ${DesirePro.className}`}
    >
      <div className="w-full p-4 lg:w-1/2">
        <h2 className="mb-4 text-6xl font-bold">
          Dreamer! <br />
          ..bald ist es soweit.
        </h2>
        <p className="mb-4 text-3xl">Erscheinungsdatum: 19.10.2024</p>
        <p className="mb-8 text-3xl">Das E-Book erhaltet ihr nur bei Amazon.</p>

        <img
          src="/path-to-your-image1.jpg"
          alt="First Image"
          className="mt-4 w-full object-cover"
        />
        <p className="mb-8 text-3xl">
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
          Wir sind in der Halle xy und lesen sogar etwas vor.
        </p>
        <p className="mt-2 text-3xl">Samstag 19.10. 2024</p>
        <p className="mb-2  text-3xl">
          Dreamer! ..Unser neues Buch erscheint.{" "}
        </p>
        <img
          src="/path-to-your-image1.jpg"
          alt="First Image"
          className="mt-4 w-full object-cover"
        />
      </div>
    </div>
  );
};

export default News;
