import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { ExpenseTracker } from "./ExpenseTracker";
import piggybank_img from "../components/assets/piggybank2.jpg";

// Define a professional background image URL
const backgroundImageUrl = `url(${piggybank_img})`;

export const UserDetailsDisplay = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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

  const verifyEmail = () => {
    const idToken = localStorage.getItem("token");

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDoq-H5WEJsZH-kVxJfOdBkOJ5i9U-8150", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: idToken,
        requestType: "VERIFY_EMAIL",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        console.log("Verification email sent successfully");
        setIsClicked(true);
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
      });
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/LogIn");
  };

  return (
    <div
      style={{
        background: backgroundImageUrl,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Navbar expand="lg" className="bg-primary" variant="dark" style={{fontWeight:"bolder"}} >
        <Container>
          <Navbar.Brand>Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Badge
                pill
                bg="info"
                className="d-flex align-items-center"
                style={{
                  color: "white",
                  fontSize: "1rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                }}
              >
                Your profile is now 100% complete.
              </Badge>
              <Nav.Link>
                <Button
                  variant="outline-light"
                  onClick={logOutHandler}
                >
                  Log Out
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="py-4">
        {isClicked && showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            Verification link has been sent to your registered email successfully. Check your email.
          </Alert>
        )}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <Card>
              <Card.Header className="bg-primary text-white">
                <h2>User Details</h2>
              </Card.Header>
              <Card.Body>
                <div className="user-details">
                  <p>
                    <strong>Full Name:</strong> {userData.displayName}
                  </p>
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p>
                    <strong>Profile Photo URL:</strong> {userData.photoUrl}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
        {!isClicked && (
          <div className="py-4"> {/* Add padding to the text and button */}
            <p>
              Let's verify your email id
            </p>
            <Button onClick={verifyEmail} className="px-4 py-2"> {/* Add padding to the button */}
              Verify
            </Button>
          </div>
        )}
      </Container>
      <Container>
        {!isLoading && <ExpenseTracker />}
      </Container>
    </div>
  );
};
