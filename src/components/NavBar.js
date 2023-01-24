import React from "react";
import { Navbar, Nav} from "react-bootstrap";
import { Link } from 'react-router-dom';

const NavBar = (props) => {

  return (
    <Navbar bg="body-tertiary" expand="lg" className="opacity-nav" style={{background: "white"}}>
      <Navbar.Toggle
        aria-controls="navbarNavDropdown" aria-label="bra" className="mx-auto">
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-list"
          display="inline"
          viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
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
            fontSize:29,
            fontFamily: "Dancing Script",
          }}
        >
          Eternal Romance
        </h1>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Link to="/" className="px-5 text-dark font-weight-bold" href="#link">
            Home
          </Link>
          <Link to="/bio" className="px-5 text-dark font-weight-bold" href="#link">
            Biographie
          </Link>
          <Link to="buecher"
            className="px-5 text-dark font-weight-bold"
            href="#another-link"
          >
            Bücher
          </Link>
          <Link to="/aktuelles"
            className="px-5 text-dark font-weight-bold"
            href="#final-link"
          >
            Aktuelles
          </Link>
          <Link to="/qnda"
            className="px-5 text-dark font-weight-bold"
            href="#final-link">
            Q&A
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
// style={{ marginRight:"28px"}}
export default NavBar;
