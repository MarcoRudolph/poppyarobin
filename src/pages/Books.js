import BookPresentation from "../components/Book";
import classes from "./Books.module.css";
import { Image, Container, Col } from "react-bootstrap";

function Books() {
  const book1 = {
    title: "Sternendämmerung",
    date: "29. April 2022",
    description:
      "Prolog Zwölf Throne. Zwölf Götter. Zwölf Schicksale. Es begab sich zu einer Zeit, da der Rat zum letzten Mal auf Erden tagte. Ihnen allen war klar, dass sie Gefahr liefen, im Strudel der Zeiten in Vergessenheit zu geraten. Ein neuer Gott war aufgetaucht und hatte alles an sich gerissen. Immer mehr Menschen schenkten ihm ihren Glauben, ihr Vertrauen, ihre Hingabe. Neben ihm gab es keinen Raum mehr für andere, denn er duldete sie nicht und verbat seinen Anhängern, weiterhin auch an die alten Götter zu glauben. Mit jedem einzelnen Menschen, der sich von ihnen abwandte, schwand ihre Kraft und damit auch die Macht, Göttliches zu leisten. Ohne diesen göttlichen Glanz, der ihnen durch den Glauben der Menschen verliehen wurde, würden sie immer weiter in Bedeutungslosigkeit versinken, Namen und Gestalt verlieren, bis sie nichts weiter wären als Nebel im Wind. Lange hatten sie diskutiert und sich gestritten, nur um am Ende einsehen zu müssen, dass gerade die letzten Sandkörner durch das Stundenglas ihres irdischen Daseins fielen. Am Ende dieses Treffens würden sie neue Wege einschlagen und die ihnen verliehenen Mächte jenseits der Erde nutzen. Zwölf Götter. Zwölf Schicksale. Neun Welten.",
    image: "./assets/Buch1.jpg",
  };

  const bio = {
    text: "Poppy A. Robin, das sind wir, Katja und Gesa aus Deutschland/ Schleswig-Holstein, beide Lehrerin an einer Gemeinschaftsschule. Als Klassenlehrerinnen hören wir jeden Tag Storys, die manchmal fantastisch und aberwitzig sind. Nun haben wir begonnen, unsere eigenen Geschichten zu erfinden. Unabhängig voneinander wollten wir immer Bücher schreiben, wären aber nie dazu gekommen, hätten wir uns nicht gegenseitig inspiriert. Die Wahl der Genre fiel uns leicht, denn nachdem Gesa Katja mit Romantasy, Fantasy und Dystopien angefixt hatte, gab es für Katja kein Halten mehr und ihr Mann musste neue Bücherregale bauen. Gemeinsam entwickeln wir unsere Plots und Storylines in einer alten, ehemaligen Schmiede an einer Au mit Blick auf den Nord-Ostsee-Kanal.",
  };

  return (
    <Container className="fluid">
      <Col className="col-12">
        <Image
          src="./assets/Buecher.jpg"
          className="p-5 d-block fluid m-auto"
          alt="Bücher.jpg"
        />
      </Col>
      <Col className="col-12">
        <Image
          src="./assets/BuchText2.jpg"
          className="d-block p-5 fluid m-auto"
          alt="Buchtext.jpg"
        />
      </Col>
    </Container>
  );
}

export default Books;
