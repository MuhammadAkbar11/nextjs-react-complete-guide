import React from "react";
import Image from "next/image";

function EventAuthor(props) {
  const {
    author: { username, name, avatar },
    date,
  } = props;
  console.log(props);
  return (
    <div className="py-2">
      <p className="mb-2">Posted By: </p>
      <div className=" event-author">
        <div className="event-author-avatar">
          <Image src={avatar} alt={username} layout="fill" />
        </div>
        <div>
          <a
            href={`/user/events/${username}`}
            className="text-dark fw-medium my-0 event-author-name "
          >
            {name}
          </a>
          <p className="text-dark fw-medium text-black-50 my-0 ">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default EventAuthor;
