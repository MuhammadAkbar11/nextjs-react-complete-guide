import { Container, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import transformAddressToText from "../../utils/addressText";
import { humanReadableDate } from "../../utils/date";
import { CalendarIcon, LocationMarkerIcon } from "../icons";
import LogisticsItem from "./LogisticsItem";

function EventLogistic(props) {
  const { date, address, image, title } = props;
  return (
    <section className=" pt-5 pb-3   event-logistics rounded-3">
      <div className="event-logistics-image p-0 border">
        <Image src={`/${image}`} alt={title} />
      </div>
      <Container className="pt-4  px-3">
        <p className=" display-5 ">{title}</p>
        <ListGroup className="border-0 bg-transparent">
          <LogisticsItem icon={CalendarIcon} iconProps={{ size: 20 }}>
            {humanReadableDate(date)}
          </LogisticsItem>
          <LogisticsItem icon={LocationMarkerIcon} iconProps={{ size: 20 }}>
            {transformAddressToText(address)}
          </LogisticsItem>
        </ListGroup>
      </Container>
    </section>
  );
}

export default EventLogistic;
