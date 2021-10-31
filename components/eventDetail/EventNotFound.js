import { Container } from "react-bootstrap";
import { EmojiSadIcon } from "../icons";

function EventNotFound({ eventId }) {
  return (
    <section className="event-notfound py-5 mb-auto h-100 ">
      <Container className=" d-flex flex-column align-items-center justify-content-center  ">
        <div className="mb-3">
          <EmojiSadIcon size={90} />
        </div>
        <h1>Sorry! There are no event for {eventId ? `"${eventId}"` : ""}.</h1>
      </Container>
    </section>
  );
}

export default EventNotFound;
