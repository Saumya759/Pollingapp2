import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { LoginRequest } from "../../Redux/createAction/createAction";
import { Form, Button, Container, Navbar, Nav, Spinner } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => {
        return state.Loginstatus;
    });
    const handleSubmit = () => {
        let loginData = {
            username: username.trim(),
            password: password.trim(),
        };
        dispatch(LoginRequest(loginData));
        setUsername("");
        setPassword("");
    };
    useEffect(() => {
        if (state.isLogin && localStorage.getItem("token")) {
            if (state.response.role.toLowerCase() === "admin") {
                history.push("/admindashboard");
                localStorage.setItem("userType", state.response.role);
            }   else if(state.response.role.toLowerCase() === "guest"){
                history.push("/pollpage");
                localStorage.setItem("userType", state.response.role);
            } 
            else {
                localStorage.clear();
                history.push("/");
            }
        }
    });

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Poll Management System</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                </Nav>
                <Link to="/registration">
                    <Button className="float-right" variant="success">
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
                        />
                        <Form.Text className="text-muted">
                            We'll never share your username with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="Submit" variant="dark" size="lg" block
                        disabled={username && password ? false : true}
                        onClick={handleSubmit}>
                        {state.isLoading ? (
                            <Spinner
                                animation="grow"
                                role="status"
                                aria-hidden="true"
                            />
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
    )
}


export default Login;