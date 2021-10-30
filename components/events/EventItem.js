import { ListGroup } from "react-bootstrap";

function EventItem(props) {
  const { title } = props;
  return (
    <>
      <ListGroup.Item>{title}</ListGroup.Item>
    </>
  );
}

export default EventItem;
