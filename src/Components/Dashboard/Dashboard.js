import React, { useEffect, useState } from "react";
import {
  Card,
  Spinner,
  Navbar,
  Button,
  Nav,
  Jumbotron,
  Container,
} from "react-bootstrap";

import { ListPollRequest } from "../../Redux/createAction/createAction";
import { useDispatch, useSelector } from "react-redux";

import { Link, Redirect, useHistory } from "react-router-dom";

const Dashboard = () => {
  const [latestPoll, setlatestPoll] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(ListPollRequest());
  }, []);
  const pollList = useSelector((state) => {
    return state.PollListstatus.poll;
  });
  const pollstatus = useSelector((state) => {
    return state.PollListstatus.isPollfetched;
  });

  useEffect(() => {
    setlatestPoll(pollList);
  });

  const poll = [...latestPoll];

  const handleEditPoll = (id) => {
    history.push(`/editpoll/${id}`);
  };

  const handleLogout = () => {
    console.log(localStorage.clear());

    history.push("/");
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Link to="/admindashboard">
          <Navbar.Brand>Polling Page</Navbar.Brand>
        </Link>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
        </Nav>
        <Link to="/addpoll">
          <Button variant="success">Add Poll</Button>
        </Link>
        <span>_</span>
        <Button variant="primary" onClick={handleLogout}>
          Log Out
        </Button>
      </Navbar>
      <Jumbotron>
        <Container>
          {pollstatus === false ? (
            <center>
              <Spinner className="spinner" animation="grow" variant="dark" />
            </center>
          ) : null}
          {poll.map((item) => (
            <Card key={item._id} className="Card">
              <Card.Body>
                <div>
                  <Card.Title>Title :{item.title}</Card.Title>
                  {item.options.map((option, i) => (
                    <div key={i}>
                      <input type="radio" name={item._id} />
                      <label>{option.option}</label>
                      <label className="float-right">Votes:{option.vote}</label>
                    </div>
                  ))}
                </div>

                <hr />
                <Button
                  variant="warning"
                  onClick={() => handleEditPoll(item._id)}
                >
                  Edit Poll
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </Jumbotron>
    </div>
  );
};
export default Dashboard;
