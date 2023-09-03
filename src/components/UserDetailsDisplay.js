import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Stack } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { Nav } from "react-bootstrap";

export const UserDetailsDisplay = () => {
  const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    

  useEffect(() => {
    // Replace with the actual URL for your GET request
    fetch("http://localhost:9099/emulator/v1/projects/expensetracker-4ddaf/config")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            Winners Never Quits, Quitter Never Wins.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Stack direction="horizontal">
                <div>
                  <Badge>Your profile is now 100% complete.</Badge>
                              </div>
                              <Nav.Link></Nav.Link>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>User Details</h2>
            <p>Full Name: {userData.fullName}</p>
            <p>Email: {userData.email}</p>
            <p>Profile Photo URL: {userData.profilePhotoUrl}</p>
          </div>
        )}
      </Container>
    </div>
  );
};
