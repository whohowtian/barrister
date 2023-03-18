import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { JournalText, Cart, BagCheckFill, List } from 'react-bootstrap-icons';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";

function Header() {
  return (
    <Navbar 
        expand="lg"
        fixed="top" 
        variant="dark" 
        style={{backgroundColor:"#584B3C"}}
    >
      <Container>
        <Navbar.Brand href="#home" style={{fontSize:"36px", fontWeight:"bold"}}>Barrister</Navbar.Brand>
        <NavDropdown title={<List color="white" size={36} className="align-top"/>} id="basic-nav-dropdown">
              <NavDropdown.Item href="#1"><JournalText /> Recipe Book</NavDropdown.Item>
              <NavDropdown.Item href="#2"><Cart /> My Cart</NavDropdown.Item>
              <NavDropdown.Item href="#3"><BagCheckFill /> My Order</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default Header;