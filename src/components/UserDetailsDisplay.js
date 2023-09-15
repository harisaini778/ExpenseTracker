import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button, Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ExpenseTracker } from "./ExpenseTracker";
import { ListGroup } from "react-bootstrap";

export const UserDetailsDisplay = () => {
 const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const fullName = localStorage.getItem("userFullName");
    const profilePhotoUrl = localStorage.getItem("userProfilePhotoUrl");
    const email = localStorage.getItem("email");

    // Create a user object
    const user = {
      displayName: fullName,
      photoUrl: profilePhotoUrl,
      email:email,
    };

    // Set user data and setLoading
    setUserData(user);
    setIsLoading(false);
  }, []);
  const logOutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("userProfilePhotoUrl");
    localStorage.removeItem("email");
    navigate("/LogIn");
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
        minHeight: "100vh",
      }}
    >
      <Navbar
        expand="lg"
        style={{
          backgroundImage: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
          fontWeight: "bolder",
        }}
      >
        <Container>
          <Navbar.Brand style={{ color: "white" }}>
            <h2>Expense Tracker</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Badge
                className="d-flex align-items-center bg-info"
                style={{ borderRadius: "10px" }}
              >
                <h6>Your profile is now 100% complete.</h6>
              </Badge>
              <Nav.Link>
                <Button className="btn-warning" onClick={logOutHandler}>
                  Log Out
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="py-4">
  {isLoading ? (
    <h2 style={{ color: "white" }}>Loading...</h2>
  ) : (
    <div>
      <Card style={{ marginTop: "80px" }}>
        <Card.Header
          style={{
            backgroundImage:
              "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
            color: "white",
          }}
        >
          <h2>User Details</h2>
        </Card.Header>
<Card.Body>
  <div className="user-details">
    <ListGroup>
      <ListGroup.Item className="d-flex align-items-center">
        <strong className="me-2">Full Name :</strong>{" "}
        {userData.displayName || "N/A"}
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center">
        <strong className="me-2">Email :</strong> {userData.email || "N/A"}
      </ListGroup.Item>
      <ListGroup.Item className="d-flex align-items-center justify-content-between">
        <strong className="me-2">Profile Photo:</strong>{" "}
        {userData.photoUrl ? (
          <img
            src={userData.photoUrl}
            alt="Profile"
            style={{
              maxWidth: "100px",
              borderRadius: "50%", // Adds rounded corners for a circular effect
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)", // Adds a shadow
            }}
          />
        ) : (
          "N/A"
        )}
      </ListGroup.Item>
    </ListGroup>
  </div>
</Card.Body>
      </Card>
    </div>
  )}
</Container>

      <Container>{!isLoading && <ExpenseTracker />}</Container>
    </div>
  );
};
