import React from "react";
import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import my_img from "../components/assets/my_img2.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Home = () => {

  const isDarkMode = useSelector((state) => state.theme.darkMode);
  
  const navigate = useNavigate();

  const handleBadgeClick = () => {
    navigate("/Profile");
  };

  return (
    <div>
      <Navbar expand="lg"
        style={{
          backgroundImage: isDarkMode ? "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)" : "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
        fontWeight : "bolder"}}
      >
        <Container>
          <Navbar.Brand
            style={{ color: isDarkMode ? "black" : "white" }}>
            <h1>Expense Tracker</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="m-1" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div style={{ color: isDarkMode ? "black" : "white" }}>
                Your profile is incomplete
                <Badge
                  bg="info"
                  className="ms-3"
                  style={{
                    transition: "transform 0.3s",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color : isDarkMode ? "black" : "white",
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  onClick={handleBadgeClick}
                >
                  Complete it now
                </Badge>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        className="bg-white text-dark text-center py-5"
        style={{
          backgroundImage: `url(${my_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Container className="mt-5">
          <h1 className="display-4 font-weight-bold" style={{
            fontWeight: "bolder", fontSize: "4rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          color:isDarkMode ? "black" : "blue"}}>
            Track Your Expenses.
          </h1>
          <p className="lead font-weight-bold" style={{
            fontWeight: "bolder", fontSize: "2.0rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            color: isDarkMode ? "black" : "blue",
          }}

>
            Manage your finances and keep track of your daily expenses with ease.
          </p>
        </Container>
      </div>
    </div>
  );
};
