import { Card, Row, Col, Image } from "react-bootstrap";
import Link from "next/link";
import { ArrowRightIcon, CalendarIcon, LocationMarkerIcon } from "../icons";

function EventItem(props) {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatedAddress = location?.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <>
      <Card className="border-0 shadow-sm rounded overflow-hidden ">
        <Row>
          <Col
            md={4}
            style={{
              height: 230,
            }}
          >
            <Image className="h-100 img-cover" src={"/" + image} alt={title} />
          </Col>
          <Col md={8}>
            <Card.Body className="h-100 d-flex flex-column">
              <Card.Title className="mb-3">{title}</Card.Title>
              <Card.Text className="text-dark mb-1 ">
                <span className="me-2 ">
                  <CalendarIcon size={20} />
                </span>
                <time>{humanReadableDate}</time>
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
