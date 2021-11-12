import { useRouter } from "next/router";
import Link from "next/link";
import { Container, Button } from "react-bootstrap";
import EventList from "../../components/events/EventList";
import { EmojiSadIcon, ExclamationCircleIcon } from "../../components/icons";
import Loader from "../../components/ui/Loader";
import { getMonthByIndex } from "../../data/months-data";
import { getFilteredEvents } from "../../helpers/api-utils";

function FilteredEventsPage(props) {
  // const router = useRouter();

  // const filterData = router.query.slug

  const { events, hasError, date } = props;

  // if (!filterData) {
  //   return (
  //     <Container className="event-container mt-2">
  //       <div className="d-flex w-100 justify-content-center py-5">
  //         <Loader />
  //       </div>
  //     </Container>
  //   );
  // }

  if (hasError) {
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

  if (!events || events.length === 0) {
    return (
      <Container className="event-container mt-2">
        <div className="d-flex  w-100 justify-content-center align-items-center py-5 flex-column">
          <div className="mb-3">
            <ExclamationCircleIcon size={90} />
          </div>
          <p className=" display-6 text-center ">
            Sorry! No event found in {date?.month} {date?.year}
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
        Events in {month} {year}
      </h4>
      <h6 className="text-dark text-opacity-75 text-end">
        {events.length} Events Found
      </h6>
      <EventList items={events} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData?.[0];
  const filteredMonth = filterData?.[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    console.log("okk");
    return {
      props: { hasError: true },
      // redirect: {
      //   destination: "/error",
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  const month = getMonthByIndex(numMonth - 1)?.[0];

  return {
    props: {
      events: filteredEvents,
      date: { month, year: numYear },
    },
  };
}

export default FilteredEventsPage;
