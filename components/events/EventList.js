import { Col, Row } from "react-bootstrap";
import EventItem from "./EventItem";

function EventList(props) {
  const { items } = props;
  return (
    <>
      <Row className=" pt-2">
        {items.map(event => {
          return (
            <Col sm={12} className="mb-4 mx-auto" key={event?._id}>
              <EventItem {...event} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default EventList;
