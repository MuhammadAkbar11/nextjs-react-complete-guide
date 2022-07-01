import Head from "next/head";
import { useRef, useState } from "react";

import axios from "axios";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [feedbacks, setFeedbacks] = useState([]);
  const [createLoader, setCreateLoader] = useState(false);
  const [fetchLoader, setFetchLoader] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();

    const { value: emailValue } = emailInputRef.current;
    const { value: feedbackValue } = feedbackInputRef.current;

    const saveData = async () => {
      setCreateLoader(true);
      try {
        const response = await axios.post("/api/feedback", {
          email: emailValue,
          text: feedbackValue,
        });

        emailInputRef.current.value = "";
        feedbackInputRef.current.value = "";
        console.log(response);
        setCreateLoader(false);
      } catch (error) {
        setCreateLoader(false);
        console.log(error);
      }
    };

    saveData();
  }

  function loadFeedbackHandler(e) {
    setFetchLoader(true);
    const loadData = async () => {
      try {
        const {
          data: { feedbacks },
        } = await axios.get("/api/feedback");
        setFeedbacks(feedbacks);
        setFetchLoader(false);
      } catch (error) {
        setFetchLoader(false);
        console.log(error);
      }
    };

    loadData();
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
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
          <button type="submit" disabled={createLoader}>
            {createLoader ? "Saving..." : "Send Feedback"}
          </button>
        </form>
        <hr />
        <div>
          <button onClick={loadFeedbackHandler}>Load Feedbacks</button>

          {fetchLoader && <p>Loading...</p>}

          <ul>
            {feedbacks.length !== 0 &&
              feedbacks.map(f => {
                return (
                  <li
                    key={f.id}
                    style={{
                      margin: "0.5rem 0rem",
                    }}
                  >
                    <strong>{f.email}</strong> <br />
                    <p style={{ margin: "0px 0px" }}>{f.text}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default HomePage;
