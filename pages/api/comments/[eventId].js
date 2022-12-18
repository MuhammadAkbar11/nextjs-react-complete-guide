import { postCommentSchema } from "../../../schema/commentSchema";
import { resAPIError, ToBaseError, validation } from "../../../utils/error";

const DUMMY_COMMENTS = new Array(10).fill().map((_, i) => ({
  id: i,
  email: `unit${i}@gmail.com`,
  name: `unit${i}`,
  text:
    i % 2 === 0
      ? `It is a long established fact that a reader will be distracted
  by the readable content of a page. Lorem ipsum dolor sit amet
  consectetur adipisicing elit.`
      : `It is a long established fact that a reader will be distracted
  by the readable content of a page. Lorem ipsum dolor sit amet
  consectetur adipisicing elit. Accusamus ex sequi corporis
  repellat rem sunt, magni enim doloribus facilis vel quam vero
  soluta atque quia mollitia deserunt nostrum sapiente? Nihil.`,
}));

async function postHandler(req, res) {
  const eventId = req.query.eventId;
  console.log(DUMMY_COMMENTS.length);
  try {
    req.body = await validation(req.body, postCommentSchema);

    const newComment = {
      id: DUMMY_COMMENTS.length + 1,
      eventId: eventId,
      ...req.body,
    };

    DUMMY_COMMENTS.unshift(newComment);

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
    res.status(201).json({
      message: `get comments successfully!`,
      comments: DUMMY_COMMENTS,
    });
  } catch (error) {
    return resAPIError(res, 400, yupError(error));
  }
}

async function handler(req, res) {
  if (req.method === "POST") return postHandler(req, res);
  if (req.method === "GET") return getHandler(req, res);
}

export default handler;
