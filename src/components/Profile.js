import React, { useState } from "react";
import { Container, Badge, Alert, Navbar,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";



export const Profile = () => {
const [fullName, setFullName] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  console.log("In profile darkMode : ", darkMode);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleProfilePhotoUrlChange = (e) => {
    setProfilePhotoUrl(e.target.value);
  };

   const updateUserProfile = () => {
  
    setTimeout(() => {
      try {

        localStorage.setItem('userFullName', fullName);
        localStorage.setItem('userProfilePhotoUrl', profilePhotoUrl);

        setShowAlert(true);


        navigate('/EmailVerify');
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    }, 1000); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile();
  };


  return (
    <div className="profile-container"
       style={{
       backgroundColor: darkMode ? "black" : "white",
       minHeight: "100vh",
}}
    >
      <Navbar expand="lg"
         style={{
          backgroundImage: darkMode
            ? "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)"
            : "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
          fontWeight: "bolder",
        }}>
       <Container>
          <Navbar.Brand style={{ color: darkMode ? "black":"white" }}>
            <h2>Welcome To The<br className="d-sm-none" /> Expense Tracker!!!</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Badge
              bg="info"
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                color : darkMode ? "black" : "white",
              }}
              onClick={() => navigate("/UserDetailsDisplay")} // Navigate when badge is clicked
            >
              <h6>Your profile is 64% complete. Update it now!</h6>
            </Badge>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container
      style={{marginTop:"100px",width:"80vw"}}>
        {/* Success Alert */}
        {showAlert && (
          <Alert variant="success" onClose={() => setShowAlert(false)} dismissible
          style={{color:"white"}}>
            <h3>User details have been saved successfully!</h3>
          </Alert>
        )}
        <div className="mt-4"
        style={{color: darkMode? "white" : "black",border:darkMode ? "2px solid white" : "2px solid black",borderRadius:"10px",padding:"25px"}}>
          <h2 style={{marginBottom:"10px"}}>Contact Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3" style={{
                fontWeight: "bold",
                color: darkMode ? "white" : "black"}}>
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
              <div className="col-md-6 mb-3" style={{
                fontWeight: "bold",
              color: darkMode ? "white" : "black"}}>
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
              <Button variant="primary" size="lg" onClick={handleSubmit}
               style={{
              backgroundImage: darkMode
            ? "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)"
            : "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
              color: darkMode ? "black" : "white"
        }}>
             Save
           </Button>
            </div> 
          </form>
        </div>
      </Container>
    </div>
  );
};
