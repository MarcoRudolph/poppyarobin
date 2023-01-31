import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  // const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  //   <a
  //     href=""
  //     ref={ref}
  //     onClick={(e) => {
  //       e.preventDefault();
  //       onClick(e);
  //     }}
  //     className="px-5 text-dark mom"
  //   >
  //     {children}
  //   </a>
  // ));

  return (
    <Navbar
      bg="body-tertiary"
      expand="lg"
      className="opacity-nav mt-5"
      style={{ background: "white" }}
    >
      <Navbar.Toggle
        aria-controls="navbarNavDropdown"
        aria-label="bra"
        className="mx-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-list"
          display="inline"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
        <h1
          className="display-5 mt-2 text-responsive"
          style={{
            background: "transparent",
            display: "inline",
            justifyContent: "center",
            alignItems: "center",
            color: "#444444",
            fontWeight: 400,
            width: "100%",
            fontSize: 29,
            fontFamily: "Dancing Script",
          }}
        >
          Eternal Romantasy
        </h1>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Link to="/" className="px-5 text-dark mom my-auto" href="#link">
            Home
          </Link>
          <Link to="/bio" className="px-5 text-dark mom my-auto" href="#link">
            Biographie
          </Link>

          <NavDropdown
            id="basic-navbar-nav"
            className="px-5 text-dark mom"
            title={<span className="text-dark mom">Bücher</span>}
          >
            <NavDropdown.Item
              href="/sternendaemmerung"
              className="mom"
              style={{ fontSize: "19pt" }}
            >
              Sternendämmerung
            </NavDropdown.Item>
          </NavDropdown>
          <Link
            to="/aktuelles"
            className="px-5 text-dark mom my-auto"
            href="#final-link"
          >
            Aktuelles
          </Link>
          <Link
            to="/qnda"
            className="px-5 text-dark mom my-auto"
            href="#final-link"
          >
            Q&A
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
// style={{ marginRight:"28px"}}
export default NavBar;
