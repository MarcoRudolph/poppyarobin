import React from "react";
import Thema from "@/components/Thema";

interface Cprops {
  // Define your props here
}

const Communitybook: React.FC<Cprops> = ({}) => {
  const ladeVorschlaege = () => {};

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl">Communitybook</h1>
      <p className="text-2xl">
        Wir schreiben ein Buch nach euren Vorstellungen. Ihr könnt Vorschläge zu
        den Themen verfassen, andere Vorschläge liken und kommentieren. Auch die
        Kommentare können bei entsprechend likes ins Buch einfliessen.
      </p>
    </div>
  );
};

export default Communitybook;
