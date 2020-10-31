import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ListPollRequest, PollRequest } from "../../Redux/createAction/createAction";
import { Spinner, Card, Navbar, Nav, Button, Jumbotron, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const GuestDashboard = () => {
    const [error, seterror] = useState(false)
    const [poll, setpoll] = useState([])
    const [item, setitem] = useState()
    const dispatch = useDispatch();
    const dispatch1 = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(ListPollRequest());
    });

    const pollList = useSelector((state) => {
        return state.PollListstatus.poll;
    });
    useEffect(() => {
        setpoll(pollList);
    }, [pollList]);

    const pollstatus = useSelector((state) => {
        return state.PollListstatus.isPollfetched;
    });

    const handlePoll = (id, option) => {
        let usertoken = localStorage.getItem("token");
        let Poll = {
            id: id,
            option: option,
            token: usertoken,
        };
        localStorage.setItem(id, option);
        dispatch1(PollRequest(Poll));
    };

    const handleLogout = () => {
        localStorage.clear();
        history.push("/login");
    };
    useEffect(() => {
        var item = poll[Math.floor(Math.random() * poll.length)];

        if (item) {
            console.log(item.id)
            setitem(item)
        }

    }, [poll.length])

    const handledoublePollClick = (id) => {
        if (localStorage.getItem(id)) {
            console.log(localStorage.getItem(id))
            seterror(true)
        }
    }

    const refreshPage = () =>{
        window.location.reload(false);
        //localStorage.setItem(item.id,""); 
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Polling Page</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                </Nav>
                <span></span>
                <Button
                    variant="danger"
                    onClick={handleLogout}
                >
                    Log Out
          </Button>
            </Navbar>
            <Jumbotron>
                <Container>
                    {pollstatus === false ? (
                        <Spinner className="spinner" animation="border" variant="primary" />
                    ) : null}

                    {item &&
                        (<Card key={item.id} className="Card" >
                            <div className="Card1" onClick={() => handledoublePollClick(item.id)}>
                                <Card.Title>Title :{item.title}</Card.Title>
                                <Container>
                                {item.options.map((option, i) => (
                                    <div key={i} >
                                        <input
                                            type="radio"
                                            name={item.id}
                                            // disabled={localStorage.getItem(item.id) ? true : false}
                                            onChange={() => {
                                                handlePoll(item.id, option.option);
                                            }}
                                        />
                                        <label>{option.option}</label>
                                        
                                    </div>
                                ))}
                                </Container>
                            </div>
                            <Button variant="primary" onClick={refreshPage}>Next</Button>
                        </Card>)
                    }
                </Container>
            </Jumbotron>

        </div>
    )
}
export default GuestDashboard;