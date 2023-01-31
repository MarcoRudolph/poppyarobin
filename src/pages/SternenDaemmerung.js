import BookPresentation from "../components/Book";
import { Image, Container, Row, Col, Card } from "react-bootstrap";
import classes from "./SternenDaemmerung.module.css";

function SternenDaemmerung() {
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

  const colClasses =
    "col-xs-12 col-sm-10 col-md-6 col-sm-offset-1 col-md-offset-3 mx-md-auto mt-5";

  return (
    <div>
      <Container className="d-flex flex-column">
        <Row className="mt-5">
          {" "}
          {/*Sternendämmerung */}
          <h1
            className="text-center text-responsive"
            style={{ fontFamily: "desire", fontSize: "5rem" }}
          >
            &#57766;&#84;&#69;&#57751;&#78;&#69;&#57684;&#57411;&#196;&#77;&#57672;&#69;&#57751;&#85;&#78;&#71;
          </h1>
        </Row>
        <Row className="mt-5">
          <Col className={colClasses} >
            {" "}
            {/*style={{ height: "800px", border:"1px solid black" }} */}
            <img
              src="./assets/ebook cover.jpg"
              className="img-fluid rounded"
              alt="Bücher.jpg"
              style={{ objectFit: "cover" }}
            />
          </Col>

          <Col className={colClasses}>
            <Card
              style={{
                // backgroundColor: "rgba(245, 245, 245, .6)",
                backgroundColor: "transparent",
                border: "0px",
              }}
            >
              <Card.Body>
                <Card.Title style={{ fontSize: "28pt", fontFamily: "Dancing" }}>
                  Von Sternen geküsst
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: "22pt", fontFamily: "Dancing", marginBottom:"5px" }}
                >
                  Zwölf Throne. Zwölf Götter. Zwölf Schicksale.{" "}
                </Card.Subtitle>
                <Card.Text style={{ fontSize: "20pt", fontFamily: "Dancing" }}>
                  Es begab sich zu einer Zeit, da der Rat zum letzten Mal auf
                  Erden tagte. Ihnen allen war klar, dass sie Gefahr liefen, im
                  Strudel der Zeiten in Vergessenheit zu geraten. Ein neuer Gott
                  war aufgetaucht und hatte alles an sich gerissen. Immer mehr
                  Menschen schenkten ihm ihren Glauben, ihr Vertrauen, ihre
                  Hingabe. Neben ihm gab es keinen Raum mehr für andere, denn er
                  duldete sie nicht und verbat seinen Anhängern, weiterhin auch
                  an die alten Götter zu glauben. Mit jedem einzelnen Menschen,
                  der sich von ihnen abwandte, schwand ihre Kraft und damit auch
                  die Macht, Göttliches zu leisten. Ohne diesen göttlichen
                  Glanz, der ihnen durch den Glauben der Menschen verliehen
                  wurde, würden sie immer weiter in Bedeutungslosigkeit
                  versinken, Namen und Gestalt verlieren, bis sie nichts weiter
                  wären als Nebel im Wind. Lange hatten sie diskutiert und sich
                  gestritten, nur um am Ende einsehen zu müssen, dass gerade die
                  letzten Sandkörner durch das Stundenglas ihres irdischen
                  Daseins fielen. Am Ende dieses Treffens würden sie neue Wege
                  einschlagen und die ihnen verliehenen Mächte jenseits der Erde
                  nutzen. Zwölf Götter. Zwölf Schicksale. Neun Welten.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className={colClasses}>
            {" "}
            {/*style={{ height: "800px", border:"1px solid black" }} */}
            <img
              src="./assets/Buch2.jpg"
              className="img-fluid rounded"
              alt="Bücher.jpg"
              style={{ objectFit: "cover" }}
            />
          </Col>
          <Col className={colClasses}>
            <Card
              style={{
                backgroundColor: "transparent",
                border: "0px",
                paddingTop:"0"
              }}
            >
              <Card.Body>
                <Card.Title style={{ fontSize: "28pt", fontFamily: "Dancing", marginBottom:"5px" }}>
                  Von Göttern verraten
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: "20pt", fontFamily: "Dancing" }}
                >
                  Zwölf Götter. Neun Welten. Eine Prophezeiung
                </Card.Subtitle>
                <Card.Text style={{ fontSize: "20pt", fontFamily: "Dancing" }}>
                  Er träumte … befand sich auf einer weiten Ebene, die ihm
                  wohlbekannt war. Tiefschwarze Nacht wurde nur durch das
                  Funkeln der Sterne erhellt. Gesteinsbrocken waren auf dem
                  Plateau verteilt, als wäre ein Riese beim Murmelspiel gestört
                  worden. Kein Gras, kein Baum, kein Strauch, nichts unterbrach
                  die endlose Weite. Hier gab es nur düstere Einsamkeit. Es war
                  still und eisig, eine Atmosphäre, in der er geradezu
                  erwartete, dass der verschwundene Riese zurückkommen und nun
                  mit seinen Knochen spielen würde, da er der Steine überdrüssig
                  war. Freudige Schauer überliefen den Mann, wie jedes Mal, wenn
                  er in diesem Traum erwachte. Er war bei seinem Herrn und der
                  endgültigen Macht wieder ein Stück näher. Zuckende Schatten
                  flogen über das Geröll und verdichteten sich zu einer großen,
                  dunklen Gestalt, die wabernd in der Luft stand. Donner rollte
                  über das flache Land, als eine uralte Stimme anhob und sprach:
                  »Die Zeit schreitet voran und das Tor wird schwächer. Wir
                  können unsere Essenz immer öfter in die Welt hinaussenden.«
                  Der Mann nickte eifrig, obwohl es nicht sein Verdienst war.
                  Erneuter Donner brandete heran, die Schatten zogen sich
                  stärker zusammen und die fast körperlose Stimme fuhr fort:
                  »Nun, da wir uns nach so langer Zeit wieder nähren können,
                  spüren meine Brüder und Schwestern, wie die alte Kraft langsam
                  wiederkehrt. Es wird nicht mehr lange dauern, bis wir uns
                  erheben können.« Die Knie des Mannes wurden weich vor
                  Vorfreude, war dies schließlich der Moment, in dem auch er
                  seine größte Macht erlangen würde. »Du wirst uns ein letztes
                  Opfer bringen, wenn die Zeit gekommen ist und alle Götter in
                  einer Reihe stehen. Meine Geschwister und ich werden über die
                  Welt herfallen, und für diese verräterischen, erbärmlichen
                  Götter gibt es dann nur noch die Dämmerung.« Und noch während
                  ein schwarzer Blitz den Himmel zerriss, ihn aufzuzehren
                  schien, nickte der Mann, denn für die Herrschaft über die
                  Planeten würde er alles geben.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SternenDaemmerung;
