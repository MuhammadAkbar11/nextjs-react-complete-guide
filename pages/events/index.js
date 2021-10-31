import Head from "next/head";
import { Container } from "react-bootstrap";
import EventList from "../../components/events/EventList";
import { getAllEvents } from "../../data/dummy-data";

function AllEventsPage() {
  const events = getAllEvents();
  return (
    <Container className="event-container pt-3">
      <Head>
        <title>Home</title>
      </Head>
      <h5>All Events</h5>
      <EventList items={events} />
    </Container>
  );
}

export default AllEventsPage;
