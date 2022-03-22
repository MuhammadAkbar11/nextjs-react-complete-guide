import Head from "next/head";
import { Container, Spinner } from "react-bootstrap";
import EventContent from "../../components/eventDetail/EventContent";
import EventLogistics from "../../components/eventDetail/EventLogistic";
import EventNotFound from "../../components/eventDetail/EventNotFound";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";

function EventDetailPage(props) {
  const { event, eventId } = props;

  // if (!event) {
  //   return (
  //     <div className="mt-3">
  //       <Spinner animation="border" size="lg" />
  //     </div>
  //   );
  // }

  return (
    <Container className="event-container pt-3">
      {!event ? (
        <>
          <Head>
            <title>BaeEvent - Not Found</title>
          </Head>
          <EventNotFound eventId={eventId} />
        </>
      ) : (
        <>
          <Head>
            <title>BaeEvent - {event?.title}</title>
            <meta name="description" content={event?.description} />
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
      event: event || null,
      eventId,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({ params: { eventId: `${event.id}` } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;
