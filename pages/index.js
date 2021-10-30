import { Container } from "react-bootstrap";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../data/dummy-data";

function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <Container className="bg-light">
      <h1>Home Page</h1>
      <EventList items={featuredEvents} />
    </Container>
  );
}

export default HomePage;
