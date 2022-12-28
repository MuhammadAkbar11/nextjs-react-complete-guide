import Head from "next/head";
import { Container } from "react-bootstrap";
import EventList from "../components/events/EventList";
import NewsLetterRegistration from "../components/input/NewsLetterRegistration";
import { getFeaturedEventsService } from "../utils/services/event.service";
import { API_URL } from "../utils/constants";

function HomePage(props) {
  const {
    eventsData: { events },
  } = props;
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
      <Container className="event-container pt-3 pb-5">
        <h5>Featured Events</h5>
        <EventList items={events} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const featuredEventsData = await getFeaturedEventsService(API_URL, {
    limit: 15,
    type: "featured",
  });

  return {
    props: {
      eventsData: featuredEventsData,
    },
    revalidate: 50,
  };
}

export default HomePage;
