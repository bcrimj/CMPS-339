import { Navbar, Nav, Container} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Basenav() {
    return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/User">User</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
    )
}

export default Basenav;