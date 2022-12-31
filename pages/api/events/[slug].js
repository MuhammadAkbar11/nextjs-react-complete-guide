import connectDB from "../../../utils/database/connectDB";
import EventModel from "../../../utils/database/models/event.model";
import { ToBaseError, resAPIError } from "../../../utils/error";

async function postHandler(req, res) {
  try {
    res.status(201).json({ message: "successfully!" });
  } catch (error) {
    const err = ToBaseError(error);
    return resAPIError(res, err);
  }
}

async function getHandler(req, res) {
  const _slug = req.query.slug;
  try {
    const event = await EventModel.findOne({ slug: _slug })
      .populate("user", "name username avatar email _id")
      .select("-__v");

    res.status(200).json({ event });
  } catch (error) {
    const err = ToBaseError(error);
    return resAPIError(res, err);
  }
}

async function handler(req, res) {
  await connectDB();
  if (req.method === "POST") return postHandler(req, res);
  if (req.method === "GET") return getHandler(req, res);
}

export default handler;
