import { ListGroup } from "react-bootstrap";
import EventItem from "./EventItem";

function EventList(props) {
  const { items } = props;
  return (
    <>
      <ListGroup>
        {items.map(event => {
          return <EventItem key={event?.id} {...event} />;
        })}
      </ListGroup>
    </>
  );
}

export default EventList;
