import { Col, Form, Row, Button, Card } from "react-bootstrap";
import { getAllMonths } from "../../data/months-data";

function EventSearch() {
  const months = getAllMonths();
  return (
    <Form>
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body className="d-flex flex-column flex-md-row gap-3 px-3 justify-content-start ">
          <Form.Group
            as={Row}
            className="mb-2 d-flex align-items-center flex-grow-1"
            controlId="years"
          >
            <Form.Label column sm={4}>
              Year
            </Form.Label>
            <Col sm={8}>
              <Form.Select size="sm">
                <option value="2020">2020</option>
                <option value="2021">2021</option>
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
              <Form.Select size="sm">
                {months.map((m, i) => {
                  const key = i;
                  return (
                    <option key={key} value={m}>
                      {m}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Form.Group>
          <div className="flex-grow-1">
            <Button className="ms-auto">Filtered Events</Button>
          </div>
        </Card.Body>
      </Card>
    </Form>
  );
}

export default EventSearch;
