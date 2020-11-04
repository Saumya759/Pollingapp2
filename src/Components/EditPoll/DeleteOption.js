import React from "react";
import { Modal, Button, Jumbotron, Container } from "react-bootstrap";
const DeleteOption = (props) => {
  return (
    <Jumbotron>
      <Container>
        <Modal show={props.show} onHide={props.onCloseOption}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onCloseOption}>
              No
            </Button>
            <Button variant="primary" onClick={props.onDeletePollOption}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Jumbotron>

  );
};

export default DeleteOption;