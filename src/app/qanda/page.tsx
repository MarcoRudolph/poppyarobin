import Image from 'next/image';
import { DesirePro } from '../../lib/fonts';

interface QAItem {
  question: string;
  answer: string;
}

const qaData: QAItem[] = [
  {
    question:
      'Wie habt ihr euch als Autorinnen-Duo gefunden und wie teilt ihr euch das Schreiben auf? Erzählt uns, wie eure Zusammenarbeit funktioniert und ob ihr bestimmte Rollen oder Aufgaben beim Schreiben übernehmt.',
    answer: 'To Do',
  },
  {
    question:
      'Was hat euch zu der Welt von Sternendämmerung inspiriert? Gibt es konkrete Bücher, Filme oder reale Orte, die eure Fantasy-Welt beeinflusst haben?',
    answer: 'To Do',
  },
  {
    question:
      'Gibt es Figuren in euren Büchern, mit denen ihr euch besonders identifiziert? Welche Charaktere liegen euch persönlich am meisten am Herzen – und warum?',
    answer: 'To Do',
  },
  {
    question:
      'Wie unterscheidet sich die Dreamer-Reihe stilistisch oder thematisch von der Sternendämmerung-Trilogie? Was erwartet Leser*innen, die beide Reihen gelesen haben, im Vergleich?',
    answer: 'To Do',
  },
  {
    question:
      'Welche Bedeutung haben Träume und Sterne in euren Geschichten? Beide Reihen spielen mit starken Symbolen – steckt dahinter ein übergreifendes Motiv?',
    answer: 'To Do',
  },
  {
    question:
      'Wie lange arbeitet ihr an einem Buch – von der ersten Idee bis zur Veröffentlichung? Gebt uns einen kleinen Einblick in euren Schreibprozess und eure Zeitplanung.',
    answer: 'To Do',
  },
  {
    question:
      'Habt ihr beim Schreiben feste Rituale oder besondere Schreiborte? Schreibt ihr gemeinsam an einem Ort oder lieber getrennt – und was darf beim Schreiben auf keinen Fall fehlen?',
    answer: 'To Do',
  },
  {
    question:
      'Dürfen wir uns auf eine Fortsetzung oder neue Welt nach Dreamer freuen? Gibt es bereits Pläne für eine neue Serie oder ein Spin-off im Sternendämmerung-Universum?',
    answer: 'To Do',
  },
  {
    question:
      'Wie reagiert ihr auf Fan-Theorien und Interpretationen eurer Bücher? Gibt es Theorien, die euch besonders überrascht oder begeistert haben?',
    answer: 'To Do',
  },
  {
    question:
      'Welche Romantasy-Autor*innen haben euch selbst geprägt? Welche Bücher habt ihr geliebt, bevor ihr selbst angefangen habt zu schreiben?',
    answer: 'To Do',
  },
];

const QandAPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="w-full">
        <Image
          src="/images/background2.PNG"
          alt="Header Image"
          width={1427}
          height={321}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div className="mx-auto mt-10 flex w-full flex-col items-start px-4 sm:w-11/12 md:w-2/3 lg:w-1/2">
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
            <h2 className="mb-2 text-3xl font-bold">
              {index + 1}. {item.question}
            </h2>
            <p className="text-xl">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QandAPage;
