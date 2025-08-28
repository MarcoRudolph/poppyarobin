'use client';

import Image from 'next/image';
import { DesirePro, OpenSans } from '../../lib/fonts';
import { useState, useEffect } from 'react';

interface QAItem {
  question: string;
  answer: string;
}

const qaData: QAItem[] = [
  {
    question:
      'Wie habt ihr euch als Autorinnen-Duo gefunden und wie teilt ihr euch das Schreiben auf? Erzählt uns, wie eure Zusammenarbeit funktioniert und ob ihr bestimmte Rollen oder Aufgaben beim Schreiben übernehmt.',
    answer:
      'Wir haben uns im Lehrerkollegium gefunden. Und während Corona gab es den alles entscheidenden Anruf, der nie so geplant war. Gesa hat Katja einfach gefragt, ob sie schon mal darüber nachgedacht hätte in Buch zu schreiben. Zögerlich antwortete diese mit „Ja“ und dann ging alles ganz schnell. Innerhalb von 2,5 Monat ist die Rohfassung zu Sternendämmerung entstanden.\n\nWir plotten gemeinsam unsere ganze Geschichte. Dazu gibt es immer persönliche Treffen, bei denen wir es uns gut gehen lassen. Dann teilen wir die Geschichte in Kapitel auf und jede von uns überlegt, auf welche Kapitel sie am meisten Lust hätte – und dann legen wir los. Jede schreibt einzeln, für sich, ihre Kapitel. Sobald eins fertig ist, wird es der anderen zugesendet und überarbeitet. Wir sind quasi unsere gegenseitigen, ersten Testleserinnen.',
  },
  {
    question:
      'Was hat euch zu der Welt von Sternendämmerung inspiriert? Gibt es konkrete Bücher, Filme oder reale Orte, die eure Fantasy-Welt beeinflusst haben?',
    answer:
      'Tatsächlich nein. Die Idee von Sternendämmerung ist sehr einzigartig und haben wir bisher so noch nicht gelesen. (Proof us wrong ;-) ) Der Funke für die Geschichte war allerdings ein Schreibanlass aus der Grundschule, den Gesa bei Pinterest entdeckt hat und den wir hier nicht nennen können, da er viel zu sehr spoilern würde und einen Plottwist, in Teil 1 der Trilogie, vorwegnehmen würde.',
  },
  {
    question:
      'Gibt es Figuren in euren Büchern, mit denen ihr euch besonders identifiziert? Welche Charaktere liegen euch persönlich am meisten am Herzen – und warum?',
    answer:
      'Es gibt sowohl in Sternendämmerung als auch in Dreamer einen tierischen Sidekick. Beide sind unsere absoluten Herzenscharaktere und geben der Story die nötige Würze und Leichtigkeit. Aber überzeugt euch selbst: wer gefällt euch besser?',
  },
  {
    question:
      'Wie unterscheidet sich die Dreamer-Reihe stilistisch oder thematisch von der Sternendämmerung-Trilogie? Was erwartet Leser*innen, die beide Reihen gelesen haben, im Vergleich?',
    answer:
      'Dreamer ist definitiv düsterer. Es spielt in der weiten Zukunft auf der Erde, aber keine Angst, es erwartet euch kein hoch technologisierter Roman mit Weltraum oder Robotern. Es ist einfach nur das Setting einer „schönen neuen Welt“, in der Träume zur Währung geworden sind. Unsere Hauptprotagonistin Shae ist eine Dreamer und kann mithilfe der Träume von Straftätern herausfinden, ob sie eine Tat begangen haben oder nicht.\n\nIn Sternendämmerung gebleiten wir Dr. Minerva Sterling, jüngste, angehende Astronomieprofessorin an der St. Andrews Universität, auf ihrer Reise zu sich selbst und den fantastischen und aberwitzigen Dingen, die auf einmal in ihrem Leben passieren, seitdem sie bei einem Pubquiz einen gewissen jungen Mann kennengelernt hat.',
  },
  {
    question:
      'Welche Bedeutung haben Träume und Sterne in euren Geschichten? Beide Reihen spielen mit starken Symbolen – steckt dahinter ein übergreifendes Motiv?',
    answer:
      'Tatsächlich spielen diese Symboliken eine große Rolle. Sie stehen für uns für das Unmögliche, das Greifen nach den Sternen und das Leben unserer Träume.',
  },
  {
    question:
      'Wie lange arbeitet ihr an einem Buch – von der ersten Idee bis zur Veröffentlichung? Gebt uns einen kleinen Einblick in euren Schreibprozess und eure Zeitplanung.',
    answer:
      'Das ist tatsächlich sehr unterschiedlich. Sternendämmerung 1 haben wir, wie oben schon erwähnt in 2,5 Monaten fertiggestellt, bei allen anderen Büchern kann man sagen, dass wir circa ein halbes Jahr brauchen.',
  },
  {
    question:
      'Habt ihr beim Schreiben feste Rituale oder besondere Schreiborte? Schreibt ihr gemeinsam an einem Ort oder lieber getrennt – und was darf beim Schreiben auf keinen Fall fehlen?',
    answer:
      'Katja benötigt absolute Stille beim Schreiben und plottet/ strukturiert ihre Kapitel mit Zettel und Stift vor. Gesa hingegen nimmt die Stichworte, die bei der gemeinsamen Plotaktion rausgekommen sind und formt daraus einen kleinen Film, der vor ihrem inneren Auge abläuft. Sie schreibt diesen Film, der sich beim Schreiben ständig verändert, dann auf. Manchmal mit Musik, manchmal ohne.',
  },
  {
    question:
      'Dürfen wir uns auf eine Fortsetzung oder neue Welt nach Dreamer freuen? Gibt es bereits Pläne für eine neue Serie oder ein Spin-off im Sternendämmerung-Universum?',
    answer:
      'Sternendämmerung und Dreamer sind abgeschlossenen Reihen, für die erstmal kein Spin-off geplant ist. Aber man soll ja nie „Nie“ sagen. Allerdings gibt es schon diverse weitere Projekte, an denen wir arbeiten und die immer konkreter werden. Was fest steht ist, dass wir 2027 noch eine Reihe im DunkelStern Verlag veröffentlichen werden. Es wird episch, es wird düster und romantisch- und das alles in einem High Fantasy Setting.',
  },
];

const QandAPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center relative">
      {/* Spacer für Abstand zur Navbar */}
      <div className="h-24 w-full" />
      {/* Hintergrundbild wie bei den Werken-Seiten */}
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
      <div className="mx-auto mt-10 flex w-full flex-col items-start px-4 sm:w-11/12 md:w-2/3 lg:w-1/2 z-[10]">
        <h1
          className={`mb-8 w-full text-center text-6xl font-bold ${DesirePro.className}`}
        >
          Q &amp; A
        </h1>
        {qaData.map((item, index) => (
          <div
            key={index}
            className="mb-8 w-full rounded-lg bg-cream p-6 shadow-md"
          >
            <h2 className={`mb-2 text-2xl font-bold ${OpenSans.className}`}>
              {index + 1}. {item.question}
            </h2>
            <p className={`text-xl ${OpenSans.className}`}>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QandAPage;
