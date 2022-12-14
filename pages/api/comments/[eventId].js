import { postCommentSchema } from "../../../schema/commentSchema";
import { resAPIError, ToBaseError, validation } from "../../../utils/error";

async function postHandler(req, res) {
  const eventId = req.query.eventId;
  try {
    req.body = await validation(req.body, postCommentSchema);

    const newComment = {
      id: new Date().toISOString(),
      ...req.body,
    };

    res.status(201).json({
      message: "Successfully added a comment!",
      comment: newComment,
    });
  } catch (error) {
    const err = ToBaseError(error);
    return resAPIError(res, err);
  }
}

async function getHandler(req, res) {
  const eventId = req.query.eventId;

  try {
    const dummyComments = new Array(10).fill().map((_, i) => ({
      id: i,
      email: `unit${i}@gmail.com`,
      name: `unit${i}`,
      text: `This is a dummy comment with id ${i}.`,
    }));

    res
      .status(201)
      .json({ message: `get comments successfully!`, comments: dummyComments });
  } catch (error) {
    return resAPIError(res, 400, yupError(error));
  }
}

async function handler(req, res) {
  if (req.method === "POST") return postHandler(req, res);
  if (req.method === "GET") return getHandler(req, res);
}

export default handler;
