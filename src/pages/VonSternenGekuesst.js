import BookPresentation from "../components/Book";
import { Image, Container, Row, Col, Card } from "react-bootstrap";

function VonSternenGekuesst() {
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
    <Container className="d-flex flex-column">
       <Row className="flex-grow-1 mt-5"> {/*Sternendämmerung */}
        <h1 className="text-center text-responsive" style={{fontFamily:"desire", fontSize:"5rem"}}>&#57766;&#84;&#69;&#57751;&#78;&#69;&#57684;&#57411;&#196;&#77;&#57672;&#69;&#57751;&#85;&#78;&#71;</h1>
      </Row>
      <Row className="flex-grow-1 mt-5">
         <Col className="xs-auto flex-row col-3">  {/*style={{ height: "800px", border:"1px solid black" }} */}
          <img
            src="./assets/Buch2.jpg"
            className="img-fluid rounded"
            alt="Bücher.jpg"
            style={{objectFit: "cover"}}
          />
        </Col>
        <Col style={{ width: "50%", height: "50%", minWidth: "450px" }}>
          <Card style={{backgroundColor: "rgba(245, 245, 245, .6)", border:"1px #FFDE2E solid"}}>
            <Card.Body>
              <Card.Title style={{fontSize: "28pt", fontFamily:"Dancing"}}>Die Reise geht weiter</Card.Title>
              <Card.Subtitle style={{fontSize: "24pt", fontFamily:"Dancing"}}>Auf zur Rettung</Card.Subtitle>
              <Card.Text style={{fontSize: "20pt", fontFamily:"Dancing"}}>Mina Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</Card.Text>
            
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default VonSternenGekuesst;
