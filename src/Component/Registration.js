import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Spinner, Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RegistrationRequest } from "../../Redux/createAction/createAction";

const Registration = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [option, setoptions] = useState("Admin");

    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return state;
    });

    const regisstatus = state.Registrationstatus;

    const handlesubmit = () => {
        let formData = {
            username: username.trim(),
            password: password.trim(),
            option: option,
        };
        dispatch(RegistrationRequest(formData));
        setusername("");
        setpassword("");
    };
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Link to="/">
                    <Navbar.Brand>Poll Management System</Navbar.Brand>
                </Link>
                <Nav className="mr-auto">

                </Nav>
                <Link to="/">
                    <Button className="float-right" variant="success">
                        Sign In
                    </Button>
                </Link>
            </Navbar>
            <div className="Registration">
                <Container>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formGridState">
                            <Form.Label >User type</Form.Label>
                            <Form.Control
                                name={option}
                                as="select"
                                onChange={(e) => setoptions(e.target.value)}
                            >
                                <option>--Select--</option>
                                <option value="Guest">Guest</option>
                                <option value="Admin">Admin</option>

                            </Form.Control>
                        </Form.Group>
                        <Button variant="dark" size="lg" block
                            type="submit"
                            disabled={username && password ? false : true}
                            onClick={() => handlesubmit()}
                        >
                            {regisstatus.isLoading === true ? (
                                <Spinner
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : null}
                            {regisstatus.isLoading === true ? null : <span>Register Now!</span>}
                        </Button>
                        <div className="message">
                            {regisstatus.error && regisstatus.error.error && !regisstatus.isRegistered ? (
                                <h6 style={{ color: "Red" }}>{regisstatus.error.message}</h6>
                            ) : null}
                            {regisstatus.isRegistered ? (
                                <h6 style={{ color: "black" }}>
                                    Registration Successful
                                </h6>
                            ) : null}
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    );
};

export default Registration;