import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import { EmojiSadIcon, ExclamationCircleIcon } from "../../components/icons";
import Loader from "../../components/ui/Loader";
import { getFilteredEvents } from "../../data/dummy-data";

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
          <p className=" display-6 text-center ">
            Sorry! Filter is <span className="text-danger">Invalid</span> please
            adjust your value{" "}
          </p>
        </div>
      </Container>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Container className="event-container mt-2">
        <div className="d-flex  w-100 justify-content-center align-items-center py-5 flex-column">
          <div className="mb-3">
            <ExclamationCircleIcon size={90} />
          </div>
          <p className=" display-6 text-center ">
            Sorry! No event found for the chosen filter
          </p>
        </div>
      </Container>
    );
  }

  // console.log(numYear, numMonth);

  return <Container className="event-container mt-2">{content}</Container>;
}

export default FilteredEventsPage;
