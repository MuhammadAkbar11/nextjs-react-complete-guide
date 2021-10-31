import Head from "next/head";
import { Container } from "react-bootstrap";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../data/dummy-data";

function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <Container className="event-container pt-3">
      <Head>
        <title>Home</title>
      </Head>
      <h5>Featured Events</h5>
      <EventList items={featuredEvents} />
    </Container>
  );
}

export default HomePage;
