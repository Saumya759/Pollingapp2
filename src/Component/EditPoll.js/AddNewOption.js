import React from "react";
import { Modal, Button, InputGroup, FormControl, Jumbotron, Container } from "react-bootstrap";

const AddNewOption = (props) => {
  return (
    <div>

      <Modal show={props.show} onHide={props.onCloseNewOption}>
        <Jumbotron>
          <Container>
            <Modal.Header closeButton>
              <Modal.Title>Add Option</Modal.Title>
            </Modal.Header>
            <InputGroup>
              <FormControl value={props.title} onChange={props.onOptionChange} />
              <span>_</span>
              <Button variant="primary" onClick={props.onUpdateOption}>
                Update
              </Button>
            </InputGroup>
          </Container>
        </Jumbotron>
      </Modal>
    </div>
  );
};
export default AddNewOption;