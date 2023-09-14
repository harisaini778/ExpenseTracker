import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button, Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ExpenseTracker } from "./ExpenseTracker";

export const UserDetailsDisplay = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem("token");

    if (!idToken) {
      console.error("User is not authenticated");
      setIsLoading(false);
      return;
    }

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDoq-H5WEJsZH-kVxJfOdBkOJ5i9U-8150", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: idToken,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.users[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      });
  }, []);

  const logOutHandler = () => {
    localStorage.removeItem("token");
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
                  backgroundImage: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
                  color: "white",
                }}
              >
                <h2>User Details</h2>
              </Card.Header>
              <Card.Body>
                <div className="user-details">
                  <p>
                    <strong>Full Name :</strong> {userData.displayName}
                  </p>
                  <p>
                    <strong>Email :</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Profile Photo URL :</strong> {userData.photoUrl}
                  </p>
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
