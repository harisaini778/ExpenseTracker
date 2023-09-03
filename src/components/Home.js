import React from "react";
// import NavBar from "./NavBar";
// import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Stack } from "react-bootstrap";
import { Profile } from "./Profile";



export const Home = () => {
  return (
    <div>
          {/* <NavBar /> */}
         <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Welocome To The Expense Tracker!!!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="ms-auto">
                          <Stack direction="horizontal">
                              <div>Your profile is incomplete</div>
                             <Nav.Link href="Profile" style={{color:"blue"}}>Click here to complete it now.</Nav.Link>
                        </Stack> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};


