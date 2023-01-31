import { Outlet } from "react-router-dom";
import { Button, Card, Container, Row, Col, Image } from "react-bootstrap";
import NavBar from "../components/NavBar";

function RootLayout() {
  return (
    <div>
      <Image
        src="./assets/poppy.jpg"
        fluid
        style={{
          backgroundSize: "contain",
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
      />
      <Container className="col-12">
        <Row
          className="fixed-top"
          style={{
            overflowY: "scroll",
            height: "100%",
            width:"100%",
            maxHeight: "100vh",
            boxSizing: "content-box",
            marginLeft: "5px",
          }}
        >
          <div className="mx-auto">
            <h1 className="mt-5 text-responsive text-center pap">
              &#57711;&#111;&#112;&#112;&#58086; &#57361;.
              &#57752;&#111;&#98;&#105;&#110;
            </h1>
            <h1 className="display-5 mt-5 mb-5 eternal text-responsive">
              Eternal Romantasy
            </h1>
            <NavBar />
            <main>
              <Outlet />
            </main>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default RootLayout;
