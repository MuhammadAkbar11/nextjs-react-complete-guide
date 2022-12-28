import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useQuery } from "react-query";
import { getAllEventsService } from "../../utils/services/event.service";
import { Button, Container } from "react-bootstrap";
import Loader from "../ui/Loader";
import { ExclamationCircleIcon } from "../icons";
import EventList from "./EventList";
import Paginate from "../ui/Paginate";

function EventFilterList(props) {
  const {
    filterDate: { year, month, monthLong },
  } = props;

  const [currPage, setCurrPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const { data, isLoading, error } = useQuery(
    ["filter-events", { year, month, page: currPage }],
    {
      queryFn: () =>
        getAllEventsService("/api", {
          page: currPage,
          limit: 10,
          year: year,
          month: monthLong,
        }),
      retry: 2,
      staleTime: 15 * 1000,
    }
  );

  React.useEffect(() => {
    if (data) {
      console.log(data);
      const page = data?.currentPage;
      const totalPages = data?.totalPages;
      setCurrPage(page < 1 ? page + 1 : page);
      setTotalPages(totalPages);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>BaeEvents - Loading...</title>
      <meta name="description" content={`A list of filtred events`} />
    </Head>
  );

  if (isLoading) {
    return (
      <>
        {pageHeadData}
        <Container className="event-container mt-2">
          <div className="d-flex w-100 justify-content-center py-5">
            <Loader />
          </div>
        </Container>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Head>
          <title>BaeEvents - Something went wrong!</title>
          <meta name="description" content={`A list of filtred events`} />
        </Head>
        <Container className="event-container mt-2">
          <div className="d-flex  w-100 justify-content-center align-items-center py-5 flex-column">
            <div className="mb-3">
              <ExclamationCircleIcon size={90} />
            </div>
            <p className=" display-6 text-center ">Something went wrong!</p>

            <div className="pt-3">
              <Link href="/" passHref>
                <Button>Back to Home</Button>
              </Link>
            </div>
          </div>
        </Container>
      </>
    );
  }

  const onChangePageHandler = value => {
    setCurrPage(value);
  };

  return (
    <>
      <Head>
        <title>
          BaeEvents - Events In {monthLong} {year}
        </title>
        <meta name="description" content={`A list of filtred events`} />
      </Head>
      {data ? (
        <>
          {data?.events?.length !== 0 ? (
            <>
              <h4 className="text-center mb-4">
                Events in {monthLong} {year}
              </h4>
              <h6 className="text-dark text-opacity-75 text-end">
                {data?.totalItems} Events Found
              </h6>
              <EventList items={data.events} />
              <Paginate
                page={currPage}
                pages={totalPages}
                onChangePage={onChangePageHandler}
              />
            </>
          ) : (
            <div className="d-flex  w-100 justify-content-center align-items-center py-5 flex-column">
              <div className="mb-3">
                <ExclamationCircleIcon size={90} />
              </div>
              <p className=" display-6 text-center ">
                Sorry! No event found in{" "}
                <span className="fw-bold">
                  {monthLong} {year}
                </span>
              </p>
              <Link href="/events" passHref>
                <Button>Back to Events</Button>
              </Link>
            </div>
          )}
        </>
      ) : null}
    </>
  );
}

export default EventFilterList;
