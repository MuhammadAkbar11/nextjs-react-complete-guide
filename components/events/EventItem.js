import { Card, Button, Row, Col, Image } from "react-bootstrap";
import Link from "next/link";

function EventItem(props) {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <>
      <Card className="border-0 shadow-sm">
        <Row>
          <Col md={4}>
            <Image
              className="h-100 img-cover"
              fluid
              src={"/" + image}
              alt={title}
            />
          </Col>
          <Col md={8}>
            <Card.Body className="h-100 d-flex flex-column">
              <Card.Title>{title}</Card.Title>
              <Card.Text>
                <time>{humanReadableDate}</time>
              </Card.Text>
              <Card.Text>
                <address>{formatedAddress}</address>
              </Card.Text>
              <Card.Text className="mb-auto">
                <small className="text-muted"></small>
              </Card.Text>
              <div className="mt-auto d-flex justify-content-end ">
                <Link href={exploreLink}>
                  <a>Explore Event</a>
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
