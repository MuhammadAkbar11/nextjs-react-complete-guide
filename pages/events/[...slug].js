import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Container, Button } from "react-bootstrap";
import EventList from "../../components/events/EventList";
import { EmojiSadIcon, ExclamationCircleIcon } from "../../components/icons";
import Loader from "../../components/ui/Loader";
import { getMonthByIndex } from "../../data/months-data";
import { getFilteredEvents } from "../../helpers/api-utils";
import useSWR from "swr";
import fetcher from "../../helpers/fetcher";

function FilteredEventsPage() {
  // const { events, hasError, date } = props;

  const [events, setEvents] = React.useState(null);
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-app-ce56a-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    fetcher
  );

  React.useEffect(() => {
    if (data) {
      const eventsArr = [];
      for (const key in data) {
        eventsArr.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(eventsArr);
    }
  }, [data]);

  if (!events) {
    return (
      <Container className="event-container mt-2">
        <div className="d-flex w-100 justify-content-center py-5">
          <Loader />
        </div>
      </Container>
    );
  }

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
    numMonth > 12 ||
    error
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

  const month = getMonthByIndex(numMonth - 1)?.[0];

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Container className="event-container mt-2">
        <div className="d-flex  w-100 justify-content-center align-items-center py-5 flex-column">
          <div className="mb-3">
            <ExclamationCircleIcon size={90} />
          </div>
          <p className=" display-6 text-center ">
            Sorry! No event found in{" "}
            <span className="fw-bold">
              {month} {numYear}
            </span>
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

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData?.[0];
//   const filteredMonth = filterData?.[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2020 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     console.log("okk");
//     return {
//       props: { hasError: true },
//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   const month = getMonthByIndex(numMonth - 1)?.[0];

//   return {
//     props: {
//       events: filteredEvents,
//       date: { month, year: numYear },
//     },
//   };
// }

export default FilteredEventsPage;
