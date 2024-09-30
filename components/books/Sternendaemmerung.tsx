import { useState } from "react";
import Image from "next/image";

function SternenDaemmerung() {
  const [readMoreVerrat, setReadMoreVerrat] = useState(false);

  function toggleReadMoreVerrat() {
    setReadMoreVerrat(!readMoreVerrat);
  }

  let verratText =
    "Er träumte … befand sich auf einer weiten Ebene, die ihm " +
    "wohlbekannt war. Tiefschwarze Nacht wurde nur durch das Funkeln " +
    "der Sterne erhellt. Gesteinsbrocken waren auf dem Plateau " +
    "verteilt, als wäre ein Riese beim Murmelspiel gestört worden. " +
    "Kein Gras, kein Baum, kein Strauch, nichts unterbrach die " +
    "endlose Weite. Hier gab es nur düstere Einsamkeit. Es war still " +
    "und eisig, eine Atmosphäre, in der er geradezu erwartete, dass " +
    "der verschwundene Riese zurückkommen und nun mit seinen Knochen " +
    "spielen würde, da er der Steine überdrüssig war. Freudige " +
    "Schauer überliefen den Mann, wie jedes Mal, wenn er in diesem " +
    "Traum erwachte. Er war bei seinem Herrn und der endgültigen " +
    "Macht wieder ein Stück näher. Zuckende Schatten flogen über das " +
    "Geröll und verdichteten sich zu einer großen, dunklen Gestalt, " +
    "die wabernd in der Luft stand. Donner rollte über das flache " +
    "Land, als eine uralte Stimme anhob und sprach: »Die Zeit " +
    "schreitet voran und das Tor wird schwächer.";

  if (readMoreVerrat) {
    verratText +=
      "Wir können unsere " +
      "Essenz immer öfter in die Welt hinaussenden.« Der Mann nickte " +
      "eifrig, obwohl es nicht sein Verdienst war. Erneuter Donner " +
      "brandete heran, die Schatten zogen sich stärker zusammen und die " +
      "fast körperlose Stimme fuhr fort: »Nun, da wir uns nach so " +
      "langer Zeit wieder nähren können, spüren meine Brüder und " +
      "Schwestern, wie die alte Kraft langsam wiederkehrt. Es wird " +
      "nicht mehr lange dauern, bis wir uns erheben können.« Die Knie " +
      "des Mannes wurden weich vor Vorfreude, war dies schließlich der " +
      "Moment, in dem auch er seine größte Macht erlangen würde. »Du " +
      "wirst uns ein letztes Opfer bringen, wenn die Zeit gekommen ist " +
      "und alle Götter in einer Reihe stehen. Meine Geschwister und ich " +
      "werden über die Welt herfallen, und für diese verräterischen, " +
      "erbärmlichen Götter gibt es dann nur noch die Dämmerung.« Und " +
      "noch während ein schwarzer Blitz den Himmel zerriss, ihn " +
      "aufzuzehren schien, nickte der Mann, denn für die Herrschaft " +
      "über die Planeten würde er alles geben.";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mt-10">
        <h1
          className="text-5xl font-bold"
          style={{ fontFamily: "desire" }}
        >
          &#57766;&#84;&#69;&#57751;&#78;&#69;&#57684;&#57411;&#196;&#77;&#57672;&#69;&#57751;&#85;&#78;&#71;
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        <div className="flex justify-center">
          <Image
            src="/images/ebook cover.jpg"
            alt="Bücher.jpg"
            width={500}
            height={500}
            className="rounded"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-2xl text-center" style={{ fontFamily: "Dancing" }}>
            "Von Sternen geküsst"
          </p>
          <p className="text-xl text-center mb-5" style={{ fontFamily: "Dancing" }}>
            Prolog <br />
            Zwölf Throne. Zwölf Götter. Zwölf Schicksale.
          </p>
          <p className="text-lg text-justify" style={{ fontFamily: "Dancing" }}>
            Es begab sich zu einer Zeit, da der Rat zum letzten Mal auf Erden tagte. ...
            Zwölf Götter. Zwölf Schicksale. Neun Welten.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        <div className="flex justify-center">
          <Image
            src="/images/covers/Buch2.jpg"
            alt="Bücher.jpg"
            width={500}
            height={500}
            className="rounded"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-2xl text-center mb-5">"Von Göttern verraten"</p>
          <p className="text-xl text-center mb-5">Prolog <br /> Zwölf Götter. Neun Welten. Eine Prophezeiung.</p>
          <p className="text-lg text-justify" style={{ fontFamily: "Dancing" }}>
            {verratText}
          </p>
          <button
            className="mt-5 bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded opacity-70"
            onClick={toggleReadMoreVerrat}
          >
            {readMoreVerrat ? <span>weniger</span> : <span>mehr</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SternenDaemmerung;
