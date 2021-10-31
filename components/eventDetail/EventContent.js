import { Container } from "react-bootstrap";

function EventContent(props) {
  return (
    <section>
      <Container className="px-3 event-content border-top pt-4 pb-5">
        {props.children}
      </Container>
    </section>
  );
}

export default EventContent;
