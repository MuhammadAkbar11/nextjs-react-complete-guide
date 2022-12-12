import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Col, Container, Form } from "react-bootstrap";
import fetcher from "../../utils/fetcher";

const schema = yup
  .object({
    email: yup.string().required("Input your email").email("Invalid email"),
  })
  .required();

function NewsLetterRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async data => {
    try {
      const response = await fetcher("/api/newsletter", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="event-container d-flex justify-content-center flex-column align-items-center pt-4  ">
      <h3 className="mb-4 text-black-50 ">Subscribe to stay updated</h3>
      <Form className="row g-3" onSubmit={handleSubmit(onSubmit)} method="post">
        <Col>
          <Form.Group controlId="email">
            <Form.Label className="visually-hidden">Email</Form.Label>
            <Form.Control
              type="email"
              className="form-control"
              placeholder="Email"
              {...register("email")}
              isInvalid={errors?.email ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <div className="col-auto">
          <Button type="submit" variant="primary" className=" mb-3">
            Subscribe
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default NewsLetterRegistration;
