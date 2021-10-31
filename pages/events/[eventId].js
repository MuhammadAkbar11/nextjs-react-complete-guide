import { useRouter } from "next/router";
import Head from "next/head";
import { Container } from "react-bootstrap";
import EventContent from "../../components/eventDetail/EventContent";
import EventLogistics from "../../components/eventDetail/EventLogistic";
import EventNotFound from "../../components/eventDetail/EventNotFound";
import { getEventById } from "../../data/dummy-data";

function EventDetailPage() {
  const router = useRouter();
  const {
    query: { eventId },
  } = router;

  const event = getEventById(eventId);

  return (
    <Container className="event-container ">
      {!event ? (
        <>
          <Head>
            <title>Event - Not Found</title>
          </Head>
          <EventNotFound eventId={eventId} />
        </>
      ) : (
        <>
          <Head>
            <title>Event - {event?.title}</title>
          </Head>
          <EventLogistics
            date={event?.date}
            address={event?.location}
            image={event?.image}
            title={event?.title}
          />
          <EventContent>
            <p>{event?.description}</p>
          </EventContent>
        </>
      )}
    </Container>
  );
}

export default EventDetailPage;
