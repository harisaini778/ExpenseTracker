import React, { useState } from "react";
import { Container, Badge, Alert, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import profile_img from "../components/assets/profile_img.jpg"

export const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleProfilePhotoUrlChange = (e) => {
    setProfilePhotoUrl(e.target.value);
  };

  const updateUserProfile = async () => {
    try {
      // Your code for updating user profile...

      // Show the success alert
      setShowAlert(true);

      // Navigate to UserDetailsProfiles upon successful update
      navigate("/UserDetailsDisplay"); // Updated route
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
    <div className="profile-container" style={{ backgroundImage: `url(${profile_img})`, minHeight: "100vh", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
      <Navbar expand="lg" bg="primary" variant="dark">
       <Container>
          <Navbar.Brand>
            Welcome To The<br className="d-sm-none" /> Expense Tracker!!!
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Badge
              bg="info"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/UserDetailsDisplay")} // Navigate when badge is clicked
            >
              Your profile is 64% complete. Update it now!
            </Badge>
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
        <div className="mt-4">
          <h2>Contact Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3" style={{fontWeight:"bold"}}>
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
              <div className="col-md-6 mb-3" style={{fontWeight:"bold"}}>
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
