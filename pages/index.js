import { getFeaturedEvents } from "../data/dummy-data";

function HomePage() {
  const featuredEvent = getFeaturedEvents();
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default HomePage;
