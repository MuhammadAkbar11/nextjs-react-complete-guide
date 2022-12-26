import { useRef } from "react";
import { Col, Form, Row, Button, Card } from "react-bootstrap";
import { getAllMonths } from "../../data/months-data";

function EventSearch({ onSearch }) {
  const monthInputRef = useRef();
  const yearInputRef = useRef();

  const months = getAllMonths();

  const submitHandler = event => {
    event.preventDefault();

    const selectedYear = yearInputRef.current?.value;
    const selectedMonth = monthInputRef.current?.value;

    onSearch(selectedYear, selectedMonth);
  };
  return (
    <Form onSubmit={submitHandler}>
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body className="d-flex flex-column flex-md-row gap-3 px-3 justify-content-start ">
          <Form.Group
            as={Row}
            className=" d-flex align-items-center flex-grow-1"
            controlId="years"
          >
            <Form.Label column sm={4}>
              Year
            </Form.Label>
            <Col sm={8}>
              <Form.Select size="sm" ref={yearInputRef}>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-2 d-flex align-items-center flex-grow-1"
            controlId="month"
          >
            <Form.Label column sm={3} className="text-nowrap">
              Months
            </Form.Label>
            <Col sm={8}>
              <Form.Select size="sm" ref={monthInputRef}>
                {months.map((m, i) => {
                  const key = i;
                  return (
                    <option key={key} value={i + 1}>
                      {m}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Form.Group>
          <div className="flex-grow-1">
            <Button type="submit" className="ms-auto">
              Filtered Events
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Form>
  );
}

export default EventSearch;
