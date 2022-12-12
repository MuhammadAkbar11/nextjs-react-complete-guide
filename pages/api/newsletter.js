import { postNewsLetterSchema } from "../../schema/newsLetterSchema";
import { resAPIError, yupError } from "../../utils/error";

async function postHandler(req, res) {
  try {
    req.body = await postNewsLetterSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    return resAPIError(res, 400, yupError(error));
  }
  res.status(201).json({ message: "Subscribe successfully!" });
}

async function handler(req, res) {
  if (req.method === "POST") return postHandler(req, res);
}

export default handler;
