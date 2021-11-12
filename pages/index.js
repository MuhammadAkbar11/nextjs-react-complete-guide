import Head from "next/head";
import { Container } from "react-bootstrap";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-utils";

function HomePage(props) {
  const { events } = props;
  return (
    <Container className="event-container pt-3">
      <Head>
        <title>Home</title>
      </Head>
      <h5>Featured Events</h5>
      <EventList items={events} />
    </Container>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 50,
  };
}

export default HomePage;
