import ImageWithText from "../components/ImageWithText";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import useWindowDimensions from "../hooks/useWindowDimensions";

function HomePage() {
  const { width } = useWindowDimensions();

  const coverRevealText =
    "C&#57984;&#58059;er &#57752;e&#58059;eal inc&#57984;ming";

  let subtitleTop = width > 768 ? "17%" : "37%";
  let footerTop = width > 768 ? "70%" : "60%";

  console.log("sub " + subtitleTop);

  return (
    <Container className="col-12 mx-auto">
      {/* style={{border:"1px solid black"}} */}
      <Row className="mx-auto h-100">
        {/* <Carousel className="mt-5">
          <Carousel.Item interval={10000}> */}
        <Col className="col-md-6 col-lg-6">
          <p className="font-dancing size-header mt-4">Cover Reveal Incoming</p>
          <p className="font-dancing text-justify">
            Der dritte Band der Sternendämmerung-Trilogie steht vor der Tür. Das
            Cover ist schon so gut wie fertig und wir sind gespannt wie das
            Finale um Mina und Co. bei euch ankommen.
          </p>
        </Col>
        <Col className="col-md-6 col-lg-6">
          <div className="mt-4 w-100 mx-2">
            <img
            // src="./assets/bookfantasy2.jpeg"
              src="./assets/moon.svg"
              alt="ImageWithText"
              className="w-100 rounded"
            />
          </div>
        </Col>

        {/* </Carousel.Item>
        </Carousel> */}
      </Row>
      <Row className="box" style={{ border: "1px solid black" }}>
        <div class="row header">
          <p>
            <b>header</b>
            <br />
            <br />
            (sized to content)
          </p>
        </div>
        <div class="row content"></div>
        <div class="row footer">
          <p>
            <b>footer</b> (fixed height)
          </p>
        </div>
      </Row>
    </Container>
  );
}

export default HomePage;
