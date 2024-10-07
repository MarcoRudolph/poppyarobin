import Image from 'next/image';
import "../globals.css";

const About = () => {
  return (
    <div className="w-full max-h-screen">
      {/* Add the new image above the existing content */}
      <div className="w-full">
        <Image
          src="/images/background2.PNG"  // Replace with the actual path to your image
          alt="Header Image"
          width={1427}
          height={321}
          layout="responsive"
          objectFit="cover"
        />
      </div>

      {/* Existing content */}
      <div className="w-full mx-auto flex flex-col sm:flex-row items-start justify-center mt-5">
        <div className="flex items-center lg:w-80 lg:h-80 w-2/3 h-2/3 overflow-hidden shadow-[10px_10px_15px_rgba(0,0,0,0.3)] lg:mr-10 lg:mt-0 mt-10">
          <Image
            src="/images/poppybio1.jpg"
            alt="Poppy A. Robin - Katja und Gesa"
            width={500}
            height={500}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col items-start lg:w-1/3 md:w-1/2 w-10/12 sm:w-full leading-relaxed sm:text-sm lg:mt-0 mt-10">
          <h2 className="text-4xl">Über uns</h2>
          <p>
            Poppy A. Robin, das sind wir, Katja und Gesa aus Deutschland/Schleswig-Holstein, beide Lehrerin an einer Gemeinschaftsschule.
            <br />
            Als Klassenlehrerinnen hören wir jeden Tag Storys, die manchmal fantastisch und aberwitzig sind. Nun haben wir begonnen, unsere eigenen Geschichten zu erfinden.
            Unabhängig voneinander wollten wir immer Bücher schreiben, wären aber nie dazu gekommen, hätten wir uns nicht gegenseitig inspiriert.
            <br />
            Die Wahl der Genre fiel uns leicht, denn nachdem Gesa Katja mit Romantasy, Fantasy und Dystopien angefixt hatte, gab es für Katja kein Halten mehr. Fae, Hexen und
            Elfen zogen in ihre Bücherregale ein.
            <br />
            Seitdem plotten und schreiben wir gemeinsam mit viel Hingabe und Spaß an unseren fantastischen Geschichten, in denen auch die Liebe nie fehlt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
