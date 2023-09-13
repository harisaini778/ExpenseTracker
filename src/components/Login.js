import React, { useState, useRef } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

export const LogIn = () => {
  const [isLogIn, setIsLogin] = useState(false);
  const [isExisting, setIsExisting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const enteredEmail = useRef(null);
  const enteredPassword = useRef(null);

  const submitFormHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;

    let url = isLogIn
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDoq-H5WEJsZH-kVxJfOdBkOJ5i9U-8150"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDoq-H5WEJsZH-kVxJfOdBkOJ5i9U-8150";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
        if (data.hasOwnProperty("error")) {
          alert(data.error.message);
          enteredEmail.current.value = "";
          enteredPassword.current.value = "";
        } else {
          enteredEmail.current.value = "";
          enteredPassword.current.value = "";
          localStorage.setItem("token", data.idToken);
          navigate("/Home");
          if (isLogIn) {
            alert("Log in successful");
          } else {
            alert(
              "Your account is created successfully. Now you can log in using your credentials"
            );
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert("An error occurred. Please try again later.");
        enteredEmail.current.value = "";
        enteredPassword.current.value = "";
      });
  };

  const existingAccountHandler = () => {
    setIsExisting((prevState) => !prevState);
    setIsLogin((prevState) => !prevState);
  };

  const handleFocus = (e) => {
    e.target.classList.add("focus");
  };

  const handleBlur = (e) => {
    e.target.classList.remove("focus");
  };

  const forgetPasswordHandler = () => {
    navigate("/ForgetPassword");
  };

  return (
    <div
      className="login-container"
    style={{
   backgroundImage: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
}}

    >
      <Navbar expand="lg" fixed="top" style={{
        backgroundImage: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
       fontWeight: "bolder",
      }}>
        <Container fluid>
          <Navbar.Brand style={{ color: "white" }}><h2>Expense Tracker</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div style={{ color: "white" }}>
                <h4>Winner never quits, quitter never wins!</h4>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container
        className="main-body-login"
        style={{
          maxWidth: "400px",
          margin: "80px auto 0",
        }}
      >
        <Container>
          <Card className="card-body-login mt-5" >
            <Card.Header
              className="card-border-login"
              style={{ backgroundImage: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", color: "white", textAlign: "center" }}
            >
              <h2>Welcome to Your Expense Tracker</h2>
            </Card.Header>
            <Card.Body className="card-border-login" style={{ backgroundColor: "#F9F9F9",paddingBottom:"0px" }}>
              <Form onSubmit={submitFormHandler}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label
                    className="mb-2"
                    style={{
                      textAlign: "center", color: "#0E4C92",
                 }}
                  >
                    <h5>Your Email</h5>
                  </Form.Label>
                  <Form.Control
                    style={{ textAlign: "center", color: "#0E4C92" }}
                    type="email"
                    className="mb-2 form-control"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={enteredEmail}
                    placeholder="Enter your email"
                  />
                  <Form.Label
                    className="mb-2"
                    style={{ textAlign: "center", color: "#0E4C92" }}
                  >
                    <h5>Your Password</h5>
                  </Form.Label>
                  <Form.Control
                    style={{ textAlign: "center", color: "#0E4C92" }}
                    type="password"
                    className="mb-2 form-control"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={enteredPassword}
                    placeholder="Enter your password"
                  />
                  {isLogIn || isExisting ? (
                    <div className="d-grid login-btn">
                      <Button
                        variant="outline-primary"
                        className="m-2 btn-sm"
                        type="submit"
                      >
                        Log In
                      </Button>
                    </div>
                  ) : (
                    <div className="d-grid login-btn">
                      <Button
                        variant="outline-primary"
                        className="m-2 btn-sm"
                          type="submit"
                      >
                        Create an Account
                      </Button>
                    </div>
                  )}
                  {isLoading && (
                    <div className="spinner-container">
                      <Spinner
                        animation="grow"
                        variant="danger"
                        className="spinner-container"
                      />
                      <Spinner
                        animation="grow"
                        variant="warning"
                        className="spinner-container"
                      />
                      <Spinner
                        animation="grow"
                        variant="info"
                        className="spinner-container"
                      />
                    </div>
                  )}
                  <div>
                    <a
                      onClick={forgetPasswordHandler}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        textAlign: "center",
                        marginTop: "0px",
                        marginBottom: "0px",
                        paddingTop:"0px"
                      }}
                    >
                      Forget Password ?
                    </a>
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer
              style={{
                backgroundColor: "#F9F9F9",
              }}
            >
              {!isExisting ? (
                <p
                  onClick={existingAccountHandler}
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  Log in with an existing account
                </p>
              ) : (
                <p
                  onClick={existingAccountHandler}
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  New User? Create an account
                </p>
              )}
            </Card.Footer>
          </Card>
        </Container>
      </Container>
    </div>
  );
};
