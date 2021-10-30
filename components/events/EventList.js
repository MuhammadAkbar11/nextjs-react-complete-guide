import { Col, Row } from "react-bootstrap";
import EventItem from "./EventItem";

function EventList(props) {
  const { items } = props;
  return (
    <>
      <Row className="px-5 py-5 ">
        {items.map(event => {
          return (
            <Col sm={8} className="mb-3 mx-auto" key={event?.id}>
              <EventItem {...event} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default EventList;
