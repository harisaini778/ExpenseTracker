import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Spinner, Alert } from "react-bootstrap";
import { BiCheckCircle } from "react-icons/bi"; // Import the check-circle icon

const EmailVerify = () => {
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/LogIn");
  };

  const verifyEmail = () => {
    // Send email verification request to Firebase
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDoq-H5WEJsZH-kVxJfOdBkOJ5i9U-8150", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: localStorage.getItem("token"),
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
        setVerificationStatus("pending"); // Set status back to pending
        setTimeout(() => {
          // Check email verification status after a delay
          checkEmailVerificationStatus();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
      });
  };

  const checkEmailVerificationStatus = () => {
    // Verify the email verification status using Firebase
    const idToken = localStorage.getItem("token");

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
        const user = data.users[0];
        if (user.emailVerified) {
          setVerificationStatus("verified"); // Set status to verified
          setTimeout(() => {
            navigate("/UserDetailsDisplay"); // Navigate after verification
          }, 2000); // Wait for 2 seconds before navigating
        } else {
          setVerificationStatus("not-verified"); // Set status to not-verified
        }
      })
      .catch((error) => {
        console.error("Error checking email verification:", error);
        setVerificationStatus("error"); // Set status to error
      });
  };

  useEffect(() => {
    // Check email verification status on component mount
    checkEmailVerificationStatus();
  }, []);

  return (
    <div>
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
          {verificationStatus === "pending" && (
            <div className="text-center">
              <Spinner animation="border" variant="light" />
              <p style={{ color: "white", marginTop: "20px" }}>Verifying email...</p>
            </div>
          )}
          {verificationStatus === "verified" && (
            <div className="text-center">
              <BiCheckCircle size={150} color="white" />
              <p style={{ color: "white", marginTop: "20px" }}>Email verified!</p>
            </div>
          )}
          {verificationStatus === "not-verified" && (
            <div
              className="py-4"
              style={{
                border: "2px solid white",
                borderRadius: "10px",
                margin: "20px",
                padding: "20px",
              }}
            >
              <h3 style={{ color: "white" }}>Let's verify your email id</h3>
              <Button onClick={verifyEmail} className="px-4 py-2">
                Verify
              </Button>
            </div>
          )}
          {verificationStatus === "error" && (
            <Alert variant="danger">
              Error checking email verification. Please try again later.
            </Alert>
          )}
        </Container>
      </div>
    </div>
  );
};

export default EmailVerify;
