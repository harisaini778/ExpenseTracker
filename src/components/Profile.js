import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Stack } from "react-bootstrap";
import { Badge, Alert } from "react-bootstrap";
import { UserDetailsDisplay } from "./UserDetailsDisplay";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State for controlling the alert
  const navigate = useNavigate();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleProfilePhotoUrlChange = (e) => {
    setProfilePhotoUrl(e.target.value);
  };

  const updateUserProfile = async () => {
    try {
      const idToken = localStorage.getItem("token"); // Replace with the actual user's ID token
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDoq-H5WEJsZH-kVxJfOdBkOJ5i9U-8150`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
            displayName: fullName,
            photoUrl: profilePhotoUrl,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating user profile");
      }

      const data = await response.json();
      console.log("User details updated successfully:", data);

      // Optionally, you can reset the form fields after submission
      setFullName("");
      setProfilePhotoUrl("");
      setShowAlert(true); // Show the success alert

      // Navigate to UserDetailsDisplay upon successful update
      navigate("/UserDetailsDisplay");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the updateUserProfile function to update user details
    updateUserProfile();
  };

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
                  <Badge>Your profile is 64% complete.Update the profile now!</Badge>
                </div>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {/* Success Alert */}
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
            User details have been saved successfully!
          </Alert>
        )}
        <div>
          <h2>Contact Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value={fullName}
                onChange={handleFullNameChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="profilePhotoUrl" className="form-label">
                Profile Photo URL:
              </label>
              <input
                type="url"
                className="form-control"
                id="profilePhotoUrl"
                value={profilePhotoUrl}
                onChange={handleProfilePhotoUrlChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};
