import React from "react";
import { Card, Col, Row } from "react-bootstrap";

function CommentItem(props) {
  return (
    <Card className="border-0">
      <Card.Body className="p-4">
        <Row>
          <Col className="p-0">
            <div className=" w-100 rounded-circle shadow-1-strong me-3 overflow-hidden ">
              <Card.Img
                className="h-100 w-100 "
                style={{ objectFit: "cover" }}
                src={`https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(${
                  props.id + 1
                }).webp`}
              />
            </div>
          </Col>
          <Col xs="11" md="11" className="">
            <div className="flex-grow-1 flex-shrink-1 ps-1">
              <div>
                <div className="d-flex  justify-content-between align-items-center">
                  <p className="mb-1">
                    <span className="fw-bold me-1">{props.name}</span>
                    <span className="small text-black-50 ">- 2 hours ago</span>
                  </p>
                  <a href="#!" className="mt-n1">
                    <span className="small">reply</span>
                  </a>
                </div>
                <p className="small mb-0 text-dark ">{props.text}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CommentItem;
