import { useRef } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = event => {
    event.preventDefault();

    const { value: emailValue } = emailInputRef.current;
    const { value: feedbackValue } = feedbackInputRef.current;

    console.log(emailValue, feedbackValue);
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form action="" method="POST" onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <br />
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <br />
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <br />
          <textarea
            name="feedback"
            id="feedback"
            rows="3"
            ref={feedbackInputRef}
          ></textarea>
        </div>
        <button type="submit">Send Feedback</button>
      </form>
    </div>
  );
}

export default HomePage;
