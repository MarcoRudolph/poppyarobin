import { Container, Row, Col } from "react-bootstrap";

function Bio() {
  const text1 =
    "Poppy A. Robin, das sind wir, Katja und Gesa aus Deutschland/ Schleswig-Holstein, beide Lehrerin an einer Gemeinschaftsschule. Als Klassenlehrerinnen hören wir jeden Tag Storys, die manchmal fantastisch und aberwitzig sind. Nun haben wir begonnen, unsere eigenen Geschichten zu erfinden.";
  const text2 =
    "Unabhängig voneinander wollten wir immer Bücher schreiben, wären aber nie dazu gekommen, hätten wir uns nicht gegenseitig inspiriert. Die Wahl der Genre fiel uns leicht, denn nachdem Gesa Katja mit Romantasy, Fantasy und Dystopien angefixt hatte, gab es für Katja kein Halten mehr und ihr Mann musste neue Bücherregale bauen. Gemeinsam entwickeln wir unsere Plots und Storylines in einer alten, ehemaligen Schmiede an einer Au mit Blick auf den Nord-Ostsee-Kanal.";

  const textClasses = "h3 text-responsive text-justify";
  const textStyle = { fontFamily: "Dancing" };

  return (
    <Container>
      <Row className="mt-5">
        <Col className={"col-12 " + textClasses} style={textStyle}>
          {text1}
        </Col>
        <Col
          className="col-xs-12 col-sm-6 col-6 mt-3"
          style={{ border: "0px black solid" }}
        >
          <img
            src="./assets/poppybio1.jpg"
            className="img-responsive rounded"
            alt="Bücher.jpg"
            width="100%"
          />
        </Col>
        <Col
          className={"col-xs-12 col-sm-6 col-6" + textClasses}
          style={textStyle}>
          <h3 className="mt-3">{text2}</h3>
        </Col>
      </Row>
      
    </Container>
  );
}

export default Bio;
