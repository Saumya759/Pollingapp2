import React from "react";
import { Modal, Button } from "react-bootstrap";
const DeletePoll = (props) => {
  return (
    <Modal show={props.show} onHide={props.onCloseDeleteModel}>
      <Modal.Header closeButton>
        <Modal.Title>Do you want to Delete Poll?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCloseDeleteModel}>
          No
        </Button>
        <Button variant="primary" onClick={props.onDeletePoll}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePoll;