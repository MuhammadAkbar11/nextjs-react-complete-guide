import { Col, Container, Nav, Row } from "react-bootstrap";
import Link from "next/link";

function MainHeader() {
  return (
    <Container className="event-container">
      <header className="header py-4">
        <Row className="flex-nowrap justify-content-between align-items-center">
          <Col xs={3}>
            <Link href="/">
              <a className="header-logo">Events</a>
            </Link>
          </Col>
          <Col xs={6}>
            <Nav
              className="header-nav justify-content-end align-items-center"
              // activeKey="/home"
            >
              <Nav.Item>
                <Link href="/events" passHref>
                  <Nav.Link className="header-nav-link text-link  ">
                    All Events
                  </Nav.Link>
                </Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </header>
    </Container>
  );
}

export default MainHeader;
