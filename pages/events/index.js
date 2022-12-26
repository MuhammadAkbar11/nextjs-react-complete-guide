import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEventsService } from "../../utils/services/event.service";
import { API_URL } from "../../utils/constants";

function AllEventsPage(props) {
  const router = useRouter();

  const {
    eventsData: { events },
  } = props;

  const searchEventsHandler = (year, month) => {
    router.push(`events/${year}/${month}`);
  };

  return (
    <>
      <Head>
        <title>BaeEvents - All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <Container className="event-container pt-3">
        <EventSearch onSearch={searchEventsHandler} />
        <h5>All Events</h5>
        <EventList items={events} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const eventsData = await getAllEventsService(API_URL, { limit: 20 });

  return {
    props: {
      eventsData,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
