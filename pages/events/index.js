import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../data/dummy-data";

function AllEventsPage() {
  const router = useRouter();

  const events = getAllEvents();

  const searchEventsHandler = (year, month) => {
    router.push(`events/${year}/${month}`);
  };

  return (
    <Container className="event-container pt-3">
      <Head>
        <title>Home</title>
      </Head>
      <EventSearch onSearch={searchEventsHandler} />
      <h5>All Events</h5>
      <EventList items={events} />
    </Container>
  );
}

export default AllEventsPage;
