import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginRequest } from "../../Redux/createAction/createAction";
import { Form, Button, Container, Navbar, Nav, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => {
    return state.Loginstatus;
  });

  const handleSubmit = (e) => {
      e.preventDefault();
    let loginData = {
      username: username.trim(),
      password: password.trim(),
    };
    dispatch(LoginRequest(loginData));
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (state?.response?.role.toLowerCase() === "admin") {
        history.push("/admindashboard");
        setUsername("");
        setPassword("");
        localStorage.setItem("userType", state.response.role);
      } else if (state?.response?.role.toLowerCase() === "guest") {
        history.push("/pollpage");
        setUsername("");
        setPassword("");
        localStorage.setItem("userType", state.response.role);
      } else {
        localStorage.clear();
        history.push("/");
      }
    }
  }, [state?.response]);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Polling System</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
        </Nav>
        <Link to="/registration">
          <Button className="float-right" variant="info">
            SignUp
          </Button>
        </Link>
      </Navbar>
      <Container>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autocomplete="off"
            />
            <Form.Text className="text-muted">
              We'll never share your username
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autocomplete="off"
            />
          </Form.Group>
          <Button
            type="Submit"
            variant="primary"
            size="lg"
            block
            disabled={username && password ? false : true}
            onClick={handleSubmit}
          >
            {state.isLoading ? (
              <Spinner animation="grow" role="status" aria-hidden="true" />
            ) : (
              "Sign In"
            )}
          </Button>
          {state.error ? (
            <h6 style={{ color: "red", textAlign: "center" }}>
              Incorrect Credentials
            </h6>
          ) : null}
        </Form>
      </Container>
    </div>
  );
};

export default Login;
