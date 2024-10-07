import Image from 'next/image';
import "../globals.css";

const About = () => {
  return (
    <div className="w-1/2 sm:w-full sm:flex-row mx-auto h-screen flex items-center justify-center">
        <div className="w-56 h-56 overflow-hidden shadow-lg mr-10">
          <Image
            src="/images/poppybio1.jpg"
            alt="Poppy A. Robin - Katja und Gesa"
            width={300}
            height={300}
            objectFit="cover"
          />
        </div>
        <div className="md:w-1/2 leading-relaxed sm:text-sm sm:w-full">
        <h2 className="text-4xl">Über uns</h2>
          <p>
            Poppy A. Robin, das sind wir, Katja und Gesa aus Deutschland/Schleswig-Holstein, beide Lehrerin an einer Gemeinschaftsschule.
            <br/>
            Als Klassenlehrerinnen hören wir jeden Tag Storys, die manchmal fantastisch und aberwitzig sind. Nun haben wir begonnen, unsere eigenen Geschichten zu erfinden. 
            Unabhängig voneinander wollten wir immer Bücher schreiben, wären aber nie dazu gekommen, hätten wir uns nicht gegenseitig inspiriert.
     
            Die Wahl der Genre fiel uns leicht, denn nachdem Gesa Katja mit Romantasy, Fantasy und Dystopien angefixt hatte, gab es für Katja kein Halten mehr. Fae, Hexen und 
            Elfen zogen in ihre Bücherregale ein.

            Seitdem plotten und schreiben wir gemeinsam mit viel Hingabe und Spaß an unseren fantastischen Geschichten, in denen auch die Liebe nie fehlt.
          </p>
        </div>
      </div>

  );
};

export default About;
