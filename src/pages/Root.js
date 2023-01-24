import { Outlet } from "react-router-dom";
import { Button, Card, Container, Row, Col, Image } from "react-bootstrap";
import NavBar from "../components/NavBar";

function RootLayout() {
  return (
    <>
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
      <Container className="overlay">
        <Row className="fixed-top">
          <div className="mx-auto">
            <h1
              className="display-3 mt-5 text-responsive"
              style={{
                background: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#444444",
                fontWeight: 400,
              }}
            >
              Poppy A. Robin
            </h1>
            <h1 className="display-5 mt-2 eternal text-responsive">
              Eternal Romantasy
            </h1>
            <NavBar />
            <main>
              <Outlet />
            </main>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default RootLayout;
