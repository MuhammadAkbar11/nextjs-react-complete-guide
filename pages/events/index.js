import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../helpers/api-utils";

function AllEventsPage(props) {
  const router = useRouter();

  const { events } = props;

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
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
