'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import React, { useRef, ReactNode } from 'react';
const Sternen = () => {
  const [isMobile, setIsMobile] = useState(false);

  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [showMore3, setShowMore3] = useState(false);

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
    <div className="flex w-full flex-col items-center justify-center relative">
      {/* Spacer für Abstand zur Navbar */}
      <div className="h-24 w-full" />
      {/* Hintergrundbild wie bei Dreamer */}
      {isMobile ? (
        <Image
          src="/images/poppy_sm_bg.jpg"
          alt="Header Image"
          fill
          priority
          objectFit="cover"
          className="absolute left-0 top-0 -z-10 w-full h-full object-cover"
        />
      ) : (
        <Image
          src="/images/poppy.jpg"
          alt="Header Image"
          fill
          priority
          objectFit="cover"
          className="absolute left-0 top-0 -z-10 w-full h-full object-cover"
        />
      )}

      <div className="z-[10] mt-10 flex w-full flex-col items-center justify-center lg:max-w-[1200px] lg:flex-row lg:items-start">
        <div className="mr-5 lg:flex-shrink-0">
          <Image
            src="/images/covers/Buch1Single.jpg"
            alt="Sternendämmerung Cover"
            height={400}
            width={264}
            quality={100}
            objectFit="contain"
          />
        </div>
        <div className="ml-4 mt-10 w-full lg:mt-0 lg:w-1/2">
          <h1 className="text-6xl">Sternendämmerung - Von Sternen geküsst</h1>
          <p className="mt-5 text-4xl">
            Zwölf Throne. Zwölf Götter. Zwölf Schicksale.Es begab sich zu einer
            Zeit, da der Rat zum letzten Mal auf Erden tagte.Ihnen allen war
            klar, dass sie Gefahr liefen, im Strudel der Zeiten in Vergessenheit
            zu geraten. Ein neuer Gott war aufgetaucht und hatte alles an sich
            gerissen. Immer mehr Menschen schenkten ihm ihren Glauben, ihr
            Vertrauen, ihre Hingabe.
          </p>
          {/* "Mehr lesen" Link */}
          {!showMore1 && (
            <p>
              <button
                className="text-darkred border-none bg-none text-lg"
                onClick={(e) => {
                  console.log('clicked');
                  e.preventDefault();

                  setShowMore1(!showMore1);
                }}
              >
                Mehr lesen
              </button>
            </p>
          )}
          {showMore1 && (
            <>
              <p className="mt-5 text-4xl">
                Neben ihm gab es keinen Raum mehr für andere, denn er duldete
                sie nicht und verbat seinen Anhängern, weiterhin auch an die
                alten Götter zu glauben. Mit jedem einzelnen Menschen, der sich
                von ihnen abwandte, schwand ihre Kraft und damit auch die Macht,
                Göttliches zu leisten. Ohne diesen göttlichen Glanz, der ihnen
                durch den Glauben der Menschen verliehen wurde, würden sie immer
                weiter in Bedeutungslosigkeit versinken, Namen und Gestalt
                verlieren, bis sie nichts weiter wären als Nebel im Wind.Lange
                hatten sie diskutiert und sich gestritten, nur um am Ende
                einsehen zu müssen, dass gerade die letzten Sandkörner durch das
                Stundenglas ihres irdischen Daseins fielen.Am Ende dieses
                Treffens würden sie neue Wege einschlagen und die ihnen
                verliehenen Mächte jenseits der Erde nutzen.Zwölf Götter. Zwölf
                Schicksale. Neun Welten.
              </p>
              {/* "Weniger lesen" Link */}
              <p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMore1(!showMore1);
                  }}
                  className="text-darkred border-none bg-none text-lg underline"
                >
                  Weniger lesen
                </button>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10 w-full border-gray-500 lg:w-1/2" />

      <div className="z-[10] flex w-full flex-col items-center justify-center lg:max-w-[1200px] lg:flex-row lg:items-start">
        <div className="mr-5 lg:flex-shrink-0">
          <Image
            src="/images/covers/buch2.jpg"
            alt="Book 2 Cover"
            height={400}
            width={264}
            quality={100}
            objectFit="contain"
          />
        </div>
        <div className="ml-4 mt-10 w-full lg:mt-0 lg:w-1/2">
          <h1 className="text-6xl">Sternendämmerung - Von Göttern verraten</h1>
          <p className="mt-5 text-4xl">
            Er träumte … befand sich auf einer weiten Ebene, die ihm wohlbekannt
            war. Tiefschwarze Nacht wurde nur durch das Funkeln der Sterne
            erhellt. Gesteinsbrocken waren auf dem Plateau verteilt, als wäre
            ein Riese beim Murmelspiel gestört worden. Kein Gras, kein Baum,
            kein Strauch, nichts unterbrach die endlose Weite. Hier gab es nur
            düstere Einsamkeit.
          </p>
          {!showMore2 && (
            <p>
              <button
                className="text-darkred border-none bg-none text-lg"
                onClick={(e) => {
                  console.log('clicked');
                  e.preventDefault();

                  setShowMore2(!showMore2);
                }}
              >
                Mehr lesen
              </button>
            </p>
          )}
          {showMore2 && (
            <>
              <p className="mt-5 text-4xl">
                Es war still und eisig, eine Atmosphäre, in der er geradezu
                erwartete, dass der verschwundene Riese zurückkommen und nun mit
                seinen Knochen spielen würde, da er der Steine überdrüssig war.
                Freudige Schauer überliefen den Mann, wie jedes Mal, wenn er in
                diesem Traum erwachte. Er war bei seinem Herrn und der
                endgültigen Macht wieder ein Stück näher. Zuckende Schatten
                flogen über das Geröll und verdichteten sich zu einer großen,
                dunklen Gestalt, die wabernd in der Luft stand. Donner rollte
                über das flache Land, als eine uralte Stimme anhob und sprach:
                »Die Zeit schreitet voran und das Tor wird schwächer. Wir können
                unsere Essenz immer öfter in die Welt hinaussenden.« Der Mann
                nickte eifrig, obwohl es nicht sein Verdienst war. Erneuter
                Donner brandete heran, die Schatten zogen sich stärker zusammen
                und die fast körperlose Stimme fuhr fort: »Nun, da wir uns nach
                so langer Zeit wieder nähren können, spüren meine Brüder und
                Schwestern, wie die alte Kraft langsam wiederkehrt. Es wird
                nicht mehr lange dauern, bis wir uns erheben können.« Die Knie
                des Mannes wurden weich vor Vorfreude, war dies schließlich der
                Moment, in dem auch er seine größte Macht erlangen würde. »Du
                wirst uns ein letztes Opfer bringen, wenn die Zeit gekommen ist
                und alle Götter in einer Reihe stehen. Meine Geschwister und ich
                werden über die Welt herfallen, und für diese verräterischen,
                erbärmlichen Götter gibt es dann nur noch die Dämmerung.« Und
                noch während ein schwarzer Blitz den Himmel zerriss, ihn
                aufzuzehren schien, nickte der Mann, denn für die Herrschaft
                über die Planeten würde er alles geben.
              </p>

              {/* "Weniger lesen" Link */}
              <p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMore2(!showMore2);
                  }}
                  className="text-darkred border-none bg-none text-lg underline"
                >
                  Weniger lesen
                </button>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10 w-full border-gray-500 lg:w-1/2" />

      {/* Third Book */}
      <div className="z-[10] flex w-full flex-col items-center justify-center lg:max-w-[1200px] lg:flex-row lg:items-start">
        <div className="mr-5 lg:flex-shrink-0">
          <Image
            src="/images/covers/sternen3cover.jpeg"
            alt="Book 3 Cover"
            height={400}
            width={264}
            quality={100}
            objectFit="contain"
          />
        </div>
        <div className="ml-4 mt-10 w-full lg:mt-0 lg:w-1/2">
          <h1 className="text-6xl">Sternendämmerung - Von Schatten befreit</h1>
          <p className="mt-5 text-4xl">
            **Bist du bereit für das Ende?** Von Sternen geküsst... Von Göttern
            verraten... Von Schatten befreit? Manchmal müssen wir kämpfen.
            Manchmal müssen wir fallen. Und manchmal hält das Schicksal andere
            Pläne für uns bereit...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sternen;
