import {React,useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Stack } from "react-bootstrap";
import { Badge } from "react-bootstrap";


export const Profile = () => {

      const [fullName, setFullName] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleProfilePhotoUrlChange = (e) => {
    setProfilePhotoUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can perform actions with the entered data here
    console.log("Full Name:", fullName);
    console.log("Profile Photo URL:", profilePhotoUrl);

    // Optionally, you can reset the form fields after submission
    setFullName("");
    setProfilePhotoUrl("");
    };
    
    return (
        <div>
             <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Winners Never Quits,Quitter Never Wins.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="ms-auto">
                          <Stack direction="horizontal">
                                <div>
                                    <Badge>
                                        Your profile is 64% complete.
                                    </Badge></div>
                             <Nav.Link href="#home" style={{color:"blue"}}>Click here to complete it now.</Nav.Link>
                        </Stack> 
          </Nav>
        </Navbar.Collapse>
      </Container>
            </Navbar>
            <Container>
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
    )
}