import React, { useEffect, useState } from "react";
import { Button, Card, Badge, Navbar, Nav, Container, Jumbotron, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  UpdatePollTitleRequest,
  DeletePollRequest,
  DeleteOptionRequest,
  AddNewOptionRequest,
} from "../../Redux/createAction/createAction";
import { ListPollRequest } from "../../Redux/createAction/createAction";
import DeletePoll from "../EditPoll/DeletePoll";
import DeleteOption from "../EditPoll/DeleteOption";
import AddNewOption from "../EditPoll/AddNewOption";
import UpdateTitle from "../EditPoll/UpdatePollTitle";
const EditPoll = (props) => {

  const [poll, setpoll] = useState([])
  const [Title, setTitle] = useState("");
  const [id, setid] = useState("");
  const [showTitleUpdate, setshowTitleUpdate] = useState(false);
  const [showDeletePoll, setshowDeletePoll] = useState(false);
  const [showDeleteOption, setshowDeleteOption] = useState(false);
  const [showAddNewOption, setshowAddNewOption] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(ListPollRequest());
  }, []);

  const pollList = useSelector((state) => {
    return state.PollListstatus.poll;
  });

  useEffect(() => {
    setpoll(pollList)
  }, [pollList])

  const pollid = props.match.params.id

  const polltoedit = pollList.filter(item => item._id == pollid)
  useEffect(() => {
    setpoll(polltoedit)
  }, [pollList])

  const _handleshowTitle = (title, id) => {
    setshowTitleUpdate(true);
    setTitle(title);
    setid(id);
  };

  const _handlecloseModel = () => {
    setshowTitleUpdate(false);
  };

  const _handleUpdateTitle = () => {
    let titleUpdate = {
      id: id,
      Title: Title,
    };
    if (titleUpdate.Title !== "") {
      dispatch(UpdatePollTitleRequest(titleUpdate));
      setshowTitleUpdate(false);
      setTitle("");
      setid("");
    }
    else {
      setshowTitleUpdate(false);
      setTitle("");
      setid("");
    }
  };

  const _handletitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const _handleDeletePoll = (title, id) => {
    setshowDeletePoll(!showDeletePoll);
    setTitle(title.trim());
    setid(id);
  };

  const _handleCloseDeleteModel = () => {
    setshowDeletePoll(false);
  };

  const _handlePollDeletion = () => {
    let Pollid = {
      id: id,
    };
    dispatch(DeletePollRequest(Pollid));
    setid("");
    setTitle("");
    setshowDeletePoll(false);
  };

  const _handleOptionDelete = (option, id) => {
    setTitle(option.trim());
    setid(id);
    setshowDeleteOption(true);
  };

  const _handleCloseOption = () => {
    setshowDeleteOption(false);
  };

  const _handleDeletePollOption = () => {
    let optionid = {
      id: id,
      text: Title,
    };

    dispatch(DeleteOptionRequest(optionid));
    setshowDeleteOption(false);
    setid("");
    setTitle("");
  };

  const _handleUpdateOption = () => {
    let Optiondata = {
      id: id,
      option: Title,
    };
    if (Optiondata.option !== "") {
      dispatch(AddNewOptionRequest(Optiondata));
      setid("");
      setTitle("");
      setshowAddNewOption(false);
    }
    else {
      setid("");
      setTitle("");
      setshowAddNewOption(false);
    }
  };

  const _handleAddNewOption = (id) => {
    setTitle("");
    setid(id);
    setshowAddNewOption(!showAddNewOption);
  };

  const _handleCloseNewOption = () => {
    setshowAddNewOption(false);
  };

  const _handleOptionChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login")
  };

  const state_update = useSelector((state) => {
    return state.UpdateTitlestatus;
  });

  const state_delPoll = useSelector((state) => {
    return state.DeletePollstatus;
  });
  const state_delOption = useSelector((state) => {
    return state.DeleteOptionstatus;
  });
  const state_addOption = useSelector((state) => {
    return state.AddNewOptionstatus;
  });

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Link to="/">
          <Navbar.Brand>
            Add Poll
          </Navbar.Brand>
        </Link>
        <Nav className="mr-auto"></Nav>
        <Link to="/admindashboard">
          <Button variant="success">
            Dashboard
          </Button>
        </Link>
        <span>-</span>
        <Button variant="danger" onClick={handleLogout}>
          Logout
          </Button>
      </Navbar>
      <Jumbotron>
        <Container>
          {
            poll.map((item) =>
              <Card key={item._id} className="Card">
                <Card.Body >
                  {state_update.isLoading === true ? (
                    <center>
                      <Spinner className="spinner" animation="border" variant="primary" />
                    </center>
                  ) : null}
                  {state_delPoll.isLoading === true ? (
                    <center>
                      <Spinner className="spinner" animation="border" variant="primary" />
                    </center>
                  ) : null}
                  {state_delOption.isLoading === true ? (
                    <center>
                      <Spinner className="spinner" animation="border" variant="primary" />
                    </center>
                  ) : null}
                  {state_addOption.isLoading === true ? (
                    <center>
                      <Spinner className="spinner" animation="border" variant="primary" />
                    </center>
                  ) : null}
                  <div className="Card1">
                    <Card.Title>Title :{item.title}</Card.Title>
                    {item.options.map((option, i) => (
                      <div key={i}>
                        <input type="radio" name={item._id} />
                        <label>{option.option}</label>
                        <div className="d-flex justify-content-end">
                          <label>
                            <Badge variant="light">{item.__v}</Badge>
                          </label>
                          <Button
                            size={"sm"}
                            onClick={() =>
                              _handleOptionDelete(option.option, item._id)
                            }
                            className="ml-5"
                            variant="danger"
                          >
                            Delete
                      </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="warning"
                    onClick={() => {
                      _handleshowTitle(item.title, item._id);
                    }}
                  >
                    Update Title
              </Button>
                  <Button
                    className="ml-2"
                    variant="danger"
                    onClick={() => {
                      _handleDeletePoll(item.title, item._id);
                    }}
                  >
                    Delete Poll
              </Button>
                  <Button
                    onClick={() => {
                      _handleAddNewOption(item._id);
                    }}
                    className="ml-2"
                    variant="primary"
                  >
                    Add Option
            </Button>
                </Card.Body>
              </Card>)
          }
          <UpdateTitle
            show={showTitleUpdate}
            onCloseModel={() => _handlecloseModel()}
            title={Title}
            onTitleChange={(e) => _handletitleChange(e)}
            onUpdateTitle={() => {
              _handleUpdateTitle();
            }}
          />
          <DeletePoll
            show={showDeletePoll}
            title={Title}
            onCloseDeleteModel={() => {
              _handleCloseDeleteModel();
            }}
            onDeletePoll={() => _handlePollDeletion()}
          />
          <DeleteOption
            show={showDeleteOption}
            option={Title}
            onCloseOption={() => {
              _handleCloseOption();
            }}
            onDeletePollOption={() => {
              _handleDeletePollOption();
            }}
          />
          <AddNewOption
            show={showAddNewOption}
            onCloseNewOption={() => _handleCloseNewOption()}
            onOptionChange={(e) => {
              _handleOptionChange(e);
            }}
            title={Title}
            onUpdateOption={() => {
              _handleUpdateOption();
            }}
          />
        </Container>
      </Jumbotron>
    </div>
  );
}

export default EditPoll;