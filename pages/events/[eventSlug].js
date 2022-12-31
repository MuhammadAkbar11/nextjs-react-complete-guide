import Head from "next/head";
import { Container } from "react-bootstrap";
import EventComments from "../../components/eventDetail/EventComments";
import EventContent from "../../components/eventDetail/EventContent";
import EventLogistics from "../../components/eventDetail/EventLogistic";
import EventNotFound from "../../components/eventDetail/EventNotFound";
import { getEventDetailService } from "../../utils/services/event.service";
import { API_URL } from "../../utils/constants";
import { humanReadableDate } from "../../utils/date";
import { useRouter } from "next/router";
import Loader from "../../components/ui/Loader";
import EventAuthor from "../../components/eventDetail/EventAuthor";

function EventDetailPage(props) {
  const { isFallback } = useRouter();

  const { event, eventId } = props;
  if (isFallback) {
    return (
      <>
        <Container className="event-container pt-3">
          <div className="d-flex justify-content-centent py-4 ">
            <Loader />
          </div>
        </Container>
      </>
    );
  }

  const dateStartFormat = humanReadableDate(event?.dateStart);
  const dateEndFormat = humanReadableDate(event?.dateEnd);

  const date = `${dateStartFormat} - ${dateEndFormat}`;

  return (
    <Container className="event-container pt-3 pb-5">
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
            date={date}
            address={event?.location}
            image={event?.image}
            title={event?.title}
          />
          <EventContent>
            <p>{event?.description}</p>
            <EventAuthor
              author={event?.user}
              date={humanReadableDate(event?.createdAt)}
            />
          </EventContent>
          <hr />
          <EventComments eventId={eventId} />
        </>
      )}
    </Container>
  );
}

export async function getStaticProps(context) {
  const eventSlug = context.params.eventSlug;

  try {
    const event = await getEventDetailService(API_URL, eventSlug);
    return {
      notFound: false,
      props: {
        event: event || null,
        eventId: eventSlug,
      },
      revalidate: 5,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: 5,
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default EventDetailPage;
