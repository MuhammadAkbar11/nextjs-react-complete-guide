import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import EventContent from "../../components/eventDetail/EventContent";
import EventLogistics from "../../components/eventDetail/EventLogistic";
import { getEventById } from "../../data/dummy-data";

function EventDetailPage() {
  const router = useRouter();
  const {
    query: { eventId },
  } = router;

  const event = getEventById(eventId);

  return (
    <>
      <Container className="py-4">
        <EventLogistics
          date={event?.date}
          address={event?.location}
          image={event?.image}
          title={event?.title}
        />
        <EventContent>
          <p>{event?.description}</p>
        </EventContent>
      </Container>
    </>
  );
}

export default EventDetailPage;
