import { Col, Container, Nav, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

function MainHeader() {
  const router = useRouter();

  return (
    <Container className="event-container border-bottom mb-3">
      <header className="header pt-4 pb-3">
        <Row className="flex-nowrap justify-content-between align-items-center">
          <Col xs={3}>
            <Link href="/">
              <a className="header-logo">Baevent</a>
            </Link>
          </Col>
          <Col xs={6}>
            <Nav className="header-nav justify-content-end align-items-center">
              <Nav.Item>
                <Link href="/events" passHref>
                  <Nav.Link
                    className="header-nav-link text-link  "
                    active={router.pathname === "/events"}
                  >
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
