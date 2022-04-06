import { useRef } from "react";
import axios from "axios";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = event => {
    event.preventDefault();

    const { value: emailValue } = emailInputRef.current;
    const { value: feedbackValue } = feedbackInputRef.current;

    const saveData = async () => {
      try {
        const response = await axios.post("/api/feedback", {
          email: emailValue,
          text: feedbackValue,
        });

        emailInputRef.current.value = "";
        feedbackInputRef.current.value = "";
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    saveData();
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
