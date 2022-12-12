import { Container } from "react-bootstrap";

function MainFooter() {
  const scrollToTop = e => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Container className=" mt-auto border-top event-container d-flex justify-content-center">
      <footer className="py-3 text-center ">
        <p>
          Event Manager, built by{" "}
          <a
            href="https://github.com/MuhammadAkbar11"
            target={"_blank"}
            rel="noreferrer"
            className="text-primary"
          >
            Muhammad Akbar.
          </a>
        </p>
        <a href="#" onClick={scrollToTop} className="ms-auto">
          To top
        </a>
      </footer>
    </Container>
  );
}

export default MainFooter;
