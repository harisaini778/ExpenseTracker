import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Stack } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import { Nav, Button,Alert } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { ExpenseTracker } from "./ExpenseTracker";

export const UserDetailsDisplay = () => {
  const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem("token"); // Replace with the actual user's ID token
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
        // Optionally, you can show a success message to the user
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
        // Optionally, you can show an error message to the user
      });
  };

    const logOutHandeler = () => {
        localStorage.removeItem("token");
        navigate("/LogIn");
        
    }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            Happiness is the key to success.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Stack direction="horizontal">
                <div>
                  <Badge>Your profile is now 100% complete.</Badge>
                </div>
                              <Nav.Link><Button onClick={logOutHandeler}>
                                  LogOut
                              </Button></Nav.Link>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
          <Container>
              {isClicked && showAlert && <Alert variant="success" onClose={()=>setShowAlert(false)} dismissible>
                  Verification link has been sent to your registered email successfully, check your email.
              </Alert>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>User Details</h2>
            <p>Full Name: {userData.displayName}</p>
            <p>Email: {userData.email}</p>
            <p>Profile Photo URL: {userData.photoUrl}</p>
          </div>
        )}
              {!isClicked &&<div>
                  Let's verify your email id
                  <Button onClick={verifyEmail}>Verify</Button>
              </div>}
          </Container>
          <Container>
              {!isLoading && <ExpenseTracker/> }
          </Container>
    </div>
  );
};
