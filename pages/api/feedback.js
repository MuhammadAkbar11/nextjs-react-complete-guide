import path from "path";
import fs from "fs";

const feedbackDataPath = path.join(process.cwd(), "data", "feedback.json");

const saveFeedbackData = data => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(feedbackDataPath, stringifyData);
};

const getFeedbackData = () => {
  const jsonData = fs.readFileSync(feedbackDataPath);
  return JSON.parse(jsonData);
};

function getFeedback(req, res) {
  res.json({ message: "GET" });
}

function postFeedback(req, res) {
  const { email, text } = req.body;
  const feedbackData = getFeedbackData();

  const newFeedback = {
    id: String(Object.keys(feedbackData).length + 1),
    email: email,
    text: text,
  };

  feedbackData.push(newFeedback);
  saveFeedbackData(feedbackData);
  res.status(201).json({
    message: "Success send feedback",
    feedbacks: newFeedback,
  });
}

function handler(req, res) {
  const { method } = req;

  const logMethod = {
    GET: () => getFeedback(req, res),
    POST: () => postFeedback(req, res),
  };

  (logMethod[method] || logMethod["DEFAULT"])();
}

export default handler;
