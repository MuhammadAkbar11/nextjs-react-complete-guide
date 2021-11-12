import Head from "next/head";
import { Container } from "react-bootstrap";
import EventContent from "../../components/eventDetail/EventContent";
import EventLogistics from "../../components/eventDetail/EventLogistic";
import EventNotFound from "../../components/eventDetail/EventNotFound";
import { getAllEvents, getEventById } from "../../helpers/api-utils";

function EventDetailPage(props) {
  const { event, eventId } = props;

  return (
    <Container className="event-container pt-3">
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

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(+eventId);
  return {
    props: {
      event,
      eventId,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map(event => ({ params: { eventId: `${event.id}` } }));
  return {
    paths: paths,
    fallback: false,
  };
}

export default EventDetailPage;
