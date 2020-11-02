import React, { useState } from "react";
import {
  Form,
  Button,
  Navbar,
  Nav,
  Container,
  Jumbotron
} from "react-bootstrap";
import { CreateNewPollRequest } from "../../Redux/createAction/createAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";


const AddPoll = () => {
  const [title, settitle] = useState("");
  const [options, setoptions] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddOption = () => {
    setoptions((prevState) => [...prevState, ""]);
  };
  const handleonChangeAddOption = (e, i) => {
    e.preventDefault();
    const data = [...options];
    data[i] = e.target.value;
    setoptions(data);
  };
  const state = useSelector((state) => {
    return state.CreateNewPollstatus;
  });
  const handlePollSubmit = () => {
    let poll = {
      title: title,
      options: options,
    };
    dispatch(CreateNewPollRequest(poll));
  };
  const handleRemoveOption = (i) => {
    const data = [...options];
    data.splice(i, 1);
    setoptions(data);
  };
  const handleLogout = () => {
    localStorage.clear();
    history.push("/login")
  }
  if (state.isLoading === true) {
    return <Redirect to="/admindashboard" />;
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Link to="/">
          <Navbar.Brand>Add Poll</Navbar.Brand>
        </Link>
        <Nav className="mr-auto"></Nav>
        <Link to="admindashboard">
          <Button variant="success">Dashboard</Button>
        </Link>
        <span>-</span>
        <Button variant="danger" onClick={handleLogout}>
          Logout
          </Button>
      </Navbar>
      <Jumbotron>
        <Container>
          <div>
            <Form.Label>
              <h2>Add Poll</h2>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the question here"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <br />
          {options.map((option, i) => (
            <div key={i}>
              <div>
                <Form.Label>Option:{i + 1}</Form.Label>
                <div>
                  <Form.Control
                    type="text"
                    placeholder="Enter your option here"
                    value={options[i]}
                    onChange={(e) => handleonChangeAddOption(e, i)}
                  />
                  <span>
                    <Button
                      onClick={() => {
                        handleRemoveOption(i);
                      }}
                      variant="warning"
                    >
                      Delete
                </Button>
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div>
            {title ? (
              <Button onClick={handleAddOption} variant="primary">
                Add Option
              </Button>
            ) : null}
              {options.length ? (
                <Button onClick={handlePollSubmit} variant="success">
                  Submit Poll
                </Button>
              ) : null}
          </div>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default AddPoll;