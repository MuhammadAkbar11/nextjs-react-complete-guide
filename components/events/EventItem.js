import { Card, Button } from "react-bootstrap";
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
      <Card>
        <Card.Img
          variant="top"
          height={300}
          // flui
          className="img-cover"
          src={"/" + image}
          alt={title}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <time>{humanReadableDate}</time>
          </Card.Text>
          <Card.Text>
            <address>{formatedAddress}</address>
          </Card.Text>
          <Card.Text>
            <small className="text-muted"></small>
          </Card.Text>
          <Link href={exploreLink}>
            <Button variant="danger">Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default EventItem;
