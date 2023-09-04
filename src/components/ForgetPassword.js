import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Stack, Alert } from "react-bootstrap";

export const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStatus, setResetStatus] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      setResetStatus("Password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDoq-H5WEJsZH-kVxJfOdBkOJ5i9U-8150', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
      });

      if (response.ok) {
        setResetStatus("Password reset email sent successfully.");
        setShowAlert(true);
      } else {
        setResetStatus("Password reset failed. Please check your email.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setResetStatus("An error occurred while resetting the password.");
    }
  };

  const containerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px", // Adjust the maximum width as needed
    margin: "0 auto", // Center the container horizontally
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Welocome To The Expense Tracker!!!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Stack direction="horizontal">
                <div>Click here to go to Login page.</div>
                <Nav.Link href="LogIn" style={{ color: "blue" }}>Login</Nav.Link>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
        Your password has been reset successfully, Now you can log in with your updated password.
      </Alert>}
      <Container style={containerStyle}>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handlePasswordReset} style={buttonStyle}>Reset Password</button>
        </div>
        <div>{resetStatus}</div>
      </Container>
    </div>
  );
}
