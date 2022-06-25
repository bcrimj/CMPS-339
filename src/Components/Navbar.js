import { Navbar, Nav, Container, Dropdown} from 'react-bootstrap';
import React from 'react';
import { Link } from "react-router-dom";

function Basenav() {
    return (
    <Navbar bg="dark" variant="dark" sticky="top">
    <Container>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/User">User</Nav.Link>
      <Nav.Link as={Link} to="/Products">Products</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item>
                <input type="text" placeholder="login"></input>
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    </Container>
  </Navbar>
    )
}

export default Basenav;