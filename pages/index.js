import Head from "next/head";
import { Container } from "react-bootstrap";
import EventList from "../components/events/EventList";
import NewsLetterRegistration from "../components/input/NewsLetterRegistration";
import { getFeaturedEvents } from "../utils/api-utils";

function HomePage(props) {
  const { events } = props;
  return (
    <>
      <Head>
        <title>BaeEvents - Home</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <NewsLetterRegistration />
      <Container className="event-container pt-3">
        <h5>Featured Events</h5>
        <EventList items={events} />
      </Container>
    </>
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
