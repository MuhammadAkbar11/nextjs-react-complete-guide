import connectDB from "../../../utils/database/connectDB";
import EventModel from "../../../utils/database/models/event.model";
import { generateEvents } from "../../../utils/database/seed";
import { ToBaseError, resAPIError } from "../../../utils/error";
import Pagination from "../../../utils/pagination";
import rgx from "../../../utils/rgx";
import { getAllMonths } from "../../../data/months-data";

async function postHandler(req, res) {
  const postType = req.query?.type?.trim() || "default";
  try {
    if (postType === "generate") {
      const withPastDate = req.query.genDateType === "withpast";
      const resultQueries = req.query.genResult || 10;

      const eventsData = generateEvents(+resultQueries, withPastDate);
      // const result = eventsData;
      const result = await EventModel.create(eventsData);

      return res.status(201).json({
        message: "generate event successfully!",
        totalGenerated: result.length,
        events: result,
      });
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
    const months = getAllMonths();
    const monthIndex = months.indexOf(_month);
    const startDate = new Date(_year, monthIndex, 1);
    const endDate = new Date(_year, monthIndex + 1, 1);
    // console.log(startDate);
    query = {
      ...query,
      dateStart: {
        $gte: new Date(startDate.toUTCString()),
        $lt: new Date(endDate.toUTCString()),
      },
    };
  }

  const paginated = Pagination(_page, _limit, {
    defaultLimit: 10,
    itemKeyName: "events",
  });

  const { limit, skip } = paginated.getPagination();
  let qrOptions = { skip: skip, limit: limit };

  try {
    const countDocs = await EventModel.countDocuments({ ...query });
    const events = await EventModel.find({ ...query }, undefined, {
      ...qrOptions,
    })
      .populate("user", "name username avatar email _id")
      .sort({ dateStart: 1 })
      .select("-__v");

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
