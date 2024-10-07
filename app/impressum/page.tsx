'use client';  // Marks this component as a client component

import React from 'react';
import { useRouter } from "next/navigation";

interface ImpressumProps {}

const Impressum: React.FC<ImpressumProps> = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto p-6 rounded-lg shadow-lg overflow-y-auto mt-8">
      {/* Impressum Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Impressum</h2>
          <p className="mb-2">Angaben gemäß §5 TMG:</p>
          <p>Poppy A. Robin</p>
          <p>Gesa & Marco Rudolph</p>
          <p>Bahnhofstr. 9</p>
          <p>25421 Pinneberg</p>

          <p className="mt-4 mb-2">Kontakt:</p>
          <p>Telefon: 0151 16321085</p>
          <p>Email: gesarudolph@hotmail.de</p>

          <p className="mt-4 mb-2">Streitschlichtung</p>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:
          </p>
          <p>
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p>
            Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht
            bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <p className="mt-4 mb-2">Haftung für Inhalte</p>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
            übermittelte oder gespeicherte fremde Informationen zu überwachen oder
            nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
            hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen
            nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche
            Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
            Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
            Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
            Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
            Verlinkung nicht erkennbar.
          </p>
          <p>
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
            konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
            Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
            entfernen.
          </p>

          <h2 className="text-2xl font-bold mt-4 mb-4">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
            Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
            Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
            bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten,
            nicht kommerziellen Gebrauch gestattet.
          </p>
          <p>
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden
            die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als
            solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
            aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
            Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend
            entfernen.
          </p>

          <p className="mt-4">
            Unser Massageangebot ist ein Dienstleistungsangebot aus dem Bereich Wellness.
            Es findet keine medizinische oder therapeutische Beratung oder Behandlung statt.
            Bitte sprechen Sie über körperliche Beschwerden oder medizinische Fragen mit einem
            Arzt. Erotikmassagen oder andere erotische Dienstleistungen zählen nicht zu unserem
            Angebot.
          </p>
        </div>
      </div>
      <div className="sm:hidden">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="text-white self-center mb-5 px-6 py-2 w-[200px] rounded mt-4 hover:bg-[#f0dfe7] hover:text-[#a6286f] transition bg-[#a6286f] mx-auto"
        >Zurück</button>
      </div>
    
    </div>
  );
};

export default Impressum;
