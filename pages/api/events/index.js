import connectDB from "../../../utils/database/connectDB";
import EventModel from "../../../utils/database/models/event.model";
import { generateEvents } from "../../../utils/database/seed";
import { ToBaseError, resAPIError } from "../../../utils/error";
import Pagination from "../../../utils/pagination";
import rgx from "../../../utils/rgx";

async function postHandler(req, res) {
  try {
    if (req.query.generate) {
      const resultQueries = req.query.result || 10;
      const eventsData = generateEvents(+resultQueries);

      const result = await EventModel.create(eventsData);

      return res
        .status(201)
        .json({ message: "generate event successfully!", events: result });
    }

    // req.body = await postNewsLetterSchema.validate(req.body, {
    //   abortEarly: false,
    //   stripUnknown: true,
    // });

    res.status(201).json({ message: "create event successfully!" });
  } catch (error) {
    const err = ToBaseError(error);
    return resAPIError(res, err);
  }
}

async function getHandler(req, res) {
  const _limit = +req.query.limit || 20;
  const _page = +req.query.page || 0;
  const _search = req.query.search || req.query.s;
  const _sortBy = req.query.sortBy || "title";
  const _orderBy = req.query.orderBy || "ASC";
  const _year = req.query.year || "";
  const _month = req.query.month || "";
  const _type = req.query.type;

  const searchRgxByDate = _month + ".*" + _year;

  const searchRgx = rgx(_search);
  let query = _search
    ? {
        $or: [
          { title: { $regex: searchRgx, $options: "i" } },
          { description: { $regex: searchRgx, $options: "i" } },
          { location: { $regex: searchRgx, $options: "i" } },
        ],
      }
    : {};

  if (_type === "featured") {
    query = {
      ...query,
      isFeatured: true,
    };
  }

  if (_year || _month) {
    query = {
      ...query,
      dateStart: {
        $regex: searchRgxByDate,
      },
    };
  }

  const paginated = Pagination(_page, _limit, {
    defaultLimit: 10,
    itemKeyName: "events",
  });

  const { limit, skip } = paginated.getPagination();
  let qrOptions = { skip: skip, limit: limit, sort: _sortBy };

  try {
    const countDocs = await EventModel.countDocuments({ ...query });
    const events = await EventModel.find({ ...query }, undefined, {
      ...qrOptions,
    }).select("-__v");

    const data = paginated.getPagingData(countDocs, events);

    res.status(200).json({ ...data });
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
