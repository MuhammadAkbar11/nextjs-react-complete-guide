import { Card, Row, Col, Image as RBImage } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, CalendarIcon, LocationMarkerIcon } from "../icons";
import { humanReadableDate } from "../../utils/date";

function EventItem(props) {
  const { title, image, dateStart, dateEnd, location, slug } = props;

  const dateStartFormat = humanReadableDate(dateStart);
  const dateEndFormat = humanReadableDate(dateEnd);

  const formatedAddress = location?.replace(", ", "\n");
  const exploreLink = `/events/${slug}`;

  return (
    <>
      <Card className="border-0 shadow-sm rounded overflow-hidden ">
        <Row>
          <Col
            md={4}
            style={{
              height: 230,
            }}
            className=" position-relative "
          >
            <Image
              className="h-100 img-cover"
              src={image}
              alt={title}
              layout="fill"
            />
          </Col>
          <Col md={8}>
            <Card.Body className="h-100 d-flex flex-column">
              <Card.Title className="mb-3">{title}</Card.Title>
              <Card.Text className="text-dark mb-1 ">
                <span className="me-2 ">
                  <CalendarIcon size={20} />
                </span>
                <time>
                  {dateStartFormat} - {dateEndFormat}
                </time>
              </Card.Text>
              <Card.Text className=" fst-italic  ">
                <span className="me-2">
                  <LocationMarkerIcon size={20} />
                </span>
                <span>{formatedAddress}</span>
              </Card.Text>
              <Card.Text className="mb-auto">
                <small className="text-muted"></small>
              </Card.Text>
              <div className="mt-auto d-flex justify-content-end ">
                <Link href={exploreLink}>
                  <a className="btn btn-primary text-capitalize ">
                    <span> Explore Event</span>
                    <span className="ms-2">
                      <ArrowRightIcon size={20} />
                    </span>
                  </a>
                </Link>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default EventItem;
