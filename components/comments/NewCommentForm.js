import React from "react";
import { Form, Button, ListGroup, Row, Col, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter your email address!"),
  name: yup.string().required("Please enter your name!"),
  text: yup
    .string()
    .min(5, "Comments must contain at least 5 characters")
    .max(500, "Comment length is limited to 500 characters")
    .required("We need your comment to submit"),
});

function NewCommentForm(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = data => {
    props.onAddNewComment(data);
    reset();
  };

  return (
    <Card className=" bg-light mb-3 ">
      <Card.Header className="border-0 bg-transparent text-center pt-3   ">
        <Card.Title>New Comment</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email"
                {...register("email")}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email && errors.email.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your name"
                {...register("name")}
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name && errors.name.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Tect</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("text")}
              isInvalid={errors.text}
            />
            <Form.Control.Feedback type="invalid">
              {errors.text && errors.text.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={props.isLoading}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default NewCommentForm;
