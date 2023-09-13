import React, { useState } from "react";
import { Container, Badge, Alert, Navbar,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


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
    <div className="profile-container"
       style={{
       backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
      minHeight: "100vh",
}}
    >
      <Navbar expand="lg"
       style={{
        backgroundImage: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
       fontWeight: "bolder",
      }}>
       <Container>
          <Navbar.Brand style={{ color: "white" }}>
            <h2>Welcome To The<br className="d-sm-none" /> Expense Tracker!!!</h2>
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
              <h6>Your profile is 64% complete. Update it now!</h6>
            </Badge>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container
      style={{marginTop:"100px",width:"50vw"}}>
        {/* Success Alert */}
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible
          style={{color:"white"}}>
            <h3>User details have been saved successfully!</h3>
          </Alert>
        )}
        <div className="mt-4"
        style={{color:"white",border:"2px solid white",borderRadius:"10px",padding:"25px"}}>
          <h2 style={{marginBottom:"10px"}}>Contact Information</h2>
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
             <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={handleSubmit}>
             Save
           </Button>
            </div> 
          </form>
        </div>
      </Container>
    </div>
  );
};
