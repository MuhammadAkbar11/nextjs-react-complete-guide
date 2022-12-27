import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Container, Button } from "react-bootstrap";
import { EmojiSadIcon } from "../../components/icons";
import { getMonthByIndex } from "../../data/months-data";
import EventFilterList from "../../components/events/EventFilterList";

function FilteredEventsPage() {
  const router = useRouter();
  const [isInvalidFilter, setIsInvalidFiter] = React.useState(false);
  const [filterDate, setFilterDate] = React.useState(null);
  const slug = router.query?.slug;

  React.useEffect(() => {
    if (slug) {
      const filteredYear = slug[0];
      const filteredMonth = slug[1];
      const numYear = +filteredYear;
      const numMonth = +filteredMonth;
      const monthShort = getMonthByIndex(numMonth - 1, "shortened");
      const monthLong = getMonthByIndex(numMonth - 1, "long");
      setFilterDate({
        year: numYear,
        month: numMonth,
        monthLong,
        monthShort,
      });

      if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2020 ||
        numMonth < 1 ||
        numMonth > 12
      ) {
        setIsInvalidFiter(true);
      } else {
        setIsInvalidFiter(false);
      }
    }
  }, [slug]);

  if (filterDate && isInvalidFilter) {
    return (
      <>
        <Head>
          <title>BaeEvents - Invalid Filter</title>
          <meta
            name="description"
            content="Sorry! Filter is Invalid please adjust your value"
          />
        </Head>
        <Container className="event-container mt-2">
          <div className="d-flex  w-100 justify-content-center align-items-center py-5 flex-column">
            <div className="mb-3">
              <EmojiSadIcon size={90} />
            </div>
            <p className="mb-4 display-6 text-center ">
              Sorry! Filter is <span className="text-danger">Invalid</span>{" "}
              please adjust your value
            </p>
            <Link href="/events" passHref>
              <Button>Show All Events</Button>
            </Link>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      {filterDate ? (
        <>
          <Container className="event-container mt-2">
            <EventFilterList filterDate={filterDate} />
          </Container>
        </>
      ) : (
        <>
          <Head>
            <title>BaeEvents - Loading...</title>
            <meta name="description" content={`A list of filtred events`} />
          </Head>
          <Container className="event-container mt-2"></Container>
        </>
      )}
    </>
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
