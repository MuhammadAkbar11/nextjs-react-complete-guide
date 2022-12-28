import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import EventList from "../../../components/events/EventList";
import EventSearch from "../../../components/events/EventSearch";
import { getAllEventsService } from "../../../utils/services/event.service";
import { API_URL } from "../../../utils/constants";
import Paginate from "../../../components/ui/Paginate";

function EventsPagePagination(props) {
  const router = useRouter();

  const {
    eventsData: { events, currentPage: page, totalPages: pages },
  } = props;

  const searchEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  const onChangePageHandler = value => {
    router.push(`/events/page/${value}`);
  };

  return (
    <>
      <Head>
        <title>BaeEvents - All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <Container className="event-container pt-3  pb-5 ">
        <EventSearch onSearch={searchEventsHandler} />
        <h5>All Events</h5>
        <EventList items={events} />
        <Paginate
          page={page < 1 ? page + 1 : page}
          pages={pages}
          onChangePage={onChangePageHandler}
        />
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log(context);
  let page = context.params?.page || 1;

  if (page === 0) {
    page = 1;
  } else if (page <= 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/events",
      },
      props: { eventsData: null },
    };
  }

  const eventsData = await getAllEventsService(API_URL, {
    limit: 10,
    page: page,
  });
  return {
    props: {
      eventsData,
    },
  };
}

export default EventsPagePagination;
