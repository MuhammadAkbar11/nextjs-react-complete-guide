import { useRouter } from "next/router";
import Link from "next/link";
import { Container, Button } from "react-bootstrap";
import EventList from "../../components/events/EventList";
import { EmojiSadIcon, ExclamationCircleIcon } from "../../components/icons";
import Loader from "../../components/ui/Loader";
import { getFilteredEvents } from "../../data/dummy-data";
import { getMonthByIndex } from "../../data/months-data";

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  const filteredYear = filterData?.[0];
  const filteredMonth = filterData?.[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (!filterData) {
    return (
      <Container className="event-container mt-2">
        <div className="d-flex w-100 justify-content-center py-5">
          <Loader />
        </div>
      </Container>
    );
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    // invalidFiltered = true;
    return (
      <Container className="event-container mt-2">
        <div className="d-flex  w-100 justify-content-center align-items-center py-5 flex-column">
          <div className="mb-3">
            <EmojiSadIcon size={90} />
          </div>
          <p className="mb-4 display-6 text-center ">
            Sorry! Filter is <span className="text-danger">Invalid</span> please
            adjust your value
          </p>
          <Link href="/events">
            <Button>Show All Events</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  const month = getMonthByIndex(numMonth - 1)?.[0];

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Container className="event-container mt-2">
        <div className="d-flex  w-100 justify-content-center align-items-center py-5 flex-column">
          <div className="mb-3">
            <ExclamationCircleIcon size={90} />
          </div>
          <p className=" display-6 text-center ">
            Sorry! No event found in {month} {numYear}
          </p>
          <Link href="/events">
            <Button>Show All Events</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="event-container mt-2">
      <h4 className="text-center mb-4">
        Events in {month} {numYear}
      </h4>
      <h6 className="text-dark text-opacity-75 text-end">
        {filteredEvents.length} Events Found
      </h6>
      <EventList items={filteredEvents} />
    </Container>
  );
}

export default FilteredEventsPage;
