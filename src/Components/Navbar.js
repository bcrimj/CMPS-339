/** @format */

import { Navbar, Nav, Container } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import "./Nav.css";
import Cart from "../screens/Cart";

function Basenav() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Navbar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/user">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link>
          <Nav.Link as={Link} to="/orders">
            Orders
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/products/admin">
            Admin
          </Nav.Link>
        </Nav>
        <h2 className="cart">
          <IoCartOutline onClick={() => setShow(true)} />
        </h2>
        <Cart show={show} onClose={handleClose} />
      </Container>
    </Navbar>
  );
}

export default Basenav;
