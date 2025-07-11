import Image from 'next/image';

interface QAItem {
  question: string;
  answer: string;
}

const qaData: QAItem[] = [
  {
    question:
      'Wie habt ihr euch als Autorinnen-Duo gefunden und wie teilt ihr euch das Schreiben auf?',
    answer: 'To Do',
  },
  {
    question: 'Was hat euch zu der Welt von Sternendämmerung inspiriert?',
    answer: 'To Do',
  },
  {
    question: 'Gibt es Figuren in euren Büchern, mit denen ihr euch besonders identifiziert?',
    answer: 'To Do',
  },
  {
    question:
      'Wie unterscheidet sich die Dreamer-Reihe stilistisch oder thematisch von der Sternendämmerung-Trilogie?',
    answer: 'To Do',
  },
  {
    question: 'Welche Bedeutung haben Träume und Sterne in euren Geschichten?',
    answer: 'To Do',
  },
  {
    question:
      'Wie lange arbeitet ihr an einem Buch – von der ersten Idee bis zur Veröffentlichung?',
    answer: 'To Do',
  },
  {
    question: 'Habt ihr beim Schreiben feste Rituale oder besondere Schreiborte?',
    answer: 'To Do',
  },
  {
    question: 'Dürfen wir uns auf eine Fortsetzung oder neue Welt nach Dreamer freuen?',
    answer: 'To Do',
  },
  {
    question: 'Wie reagiert ihr auf Fan-Theorien und Interpretationen eurer Bücher?',
    answer: 'To Do',
  },
  {
    question: 'Welche Romantasy-Autor*innen haben euch selbst geprägt?',
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
      <div className="mx-auto mt-10 flex w-full flex-col items-start px-4 sm:w-11/12 md:w-2/3">
        {qaData.map((item, index) => (
          <div key={index} className="mb-8 border-b pb-6 last:border-none">
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
