import React from "react";
import { Modal, Button, InputGroup, FormControl, Container, Jumbotron } from "react-bootstrap";

const UpdateTitle = (props) => {
  return (
    <>

      <Modal show={props.show} onHide={props.onCloseModel}>
        <Modal.Header closeButton>
          <Modal.Title>Update Title</Modal.Title>
        </Modal.Header>
        <Jumbotron>
          <Container>
            <InputGroup>
              <FormControl value={props.title} onChange={props.onTitleChange} />
            </InputGroup>
              <Button variant="primary" onClick={props.onUpdateTitle}>
                Update
          </Button>
          </Container>
        </Jumbotron>
      </Modal>


    </>
  );
};
export default UpdateTitle;
