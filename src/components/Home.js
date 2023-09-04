import React from "react";
import { Container, Nav, Navbar, Stack, Badge } from "react-bootstrap";
import my_img from "../components/assets/home_img.jpg";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const handleBadgeClick = () => {
    navigate("/Profile");
  };

  return (
    <div>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand className="text-white">Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div className="text-white">
                Your profile is incomplete
                <Badge
                  bg="info"
                  className="ms-2"
                  style={{
                    transition: "transform 0.3s",
                    cursor: "pointer",
                    fontWeight: "bold",
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
        <Container>
          <h1 className="display-4 text-secondary font-weight-bold" style={{ fontWeight: "bolder", fontSize: "2rem" }}>
            Track Your Expenses.
          </h1>
          <p className="lead text-secondary font-weight-bold" style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>
            Manage your finances and keep track of your daily expenses with ease.
          </p>
        </Container>
      </div>
    </div>
  );
};
