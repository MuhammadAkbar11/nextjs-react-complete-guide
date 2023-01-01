import React from "react";
import { Button } from "react-bootstrap";
import ListComment from "../comments/ListComment";

// const DUMMY_COMMENTS = new Array(10).fill().map((_, i) => ({
//   id: i,
//   email: `unit${i}@gmail.com`,
//   name: `Commentator ${i}`,
//   text: `This is a dummy comment with id ${i}.`,
// }));

function EventComments(props) {
  const [filter, setFilter] = React.useState({ limit: 8 });
  const [open, setOpen] = React.useState(false);

  return (
    <section>
      <div className="py-4 d-flex justify-content-center ">
        <Button variant="outline-primary" onClick={() => setOpen(!open)}>
          {open ? "Hide Comments" : "Open Comments"}
        </Button>
      </div>
      {open ? <ListComment filter={filter} eventId={props.eventId} /> : null}
    </section>
  );
}

export default EventComments;
