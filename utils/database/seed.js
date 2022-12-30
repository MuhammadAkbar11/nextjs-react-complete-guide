import { faker } from "@faker-js/faker";
import slug from "slug";
import bcryptjs from "bcryptjs";
import UserModel from "./models/user.model";

function getPastDateInISOFormat(months, days = 0) {
  const pastDate = new Date();
  pastDate.setMonth(pastDate.getMonth() - months);
  pastDate.setDate(pastDate.getDate() - days);
  return pastDate.toISOString();
}

export async function generateEvents(result = 10, { includePast = false }) {
  let data = [];
  for (let _i = 0; _i < result; _i++) {
    const totalTitleLength = faker.datatype.number({ min: 8, max: 15 });
    const totalDescLength = faker.datatype.number({ min: 80, max: 200 });
    const title = faker.random.words(totalTitleLength);
    const desc = faker.random.words(totalDescLength);
    const location = faker.address.streetAddress(true);

    const isPastDate = includePast ? faker.datatype.boolean() : false;
    const dateWithPast = getPastDateInISOFormat(
      faker.datatype.number({ min: 1, max: 3 }),
      faker.datatype.number({ min: 1, max: 30 })
    );

    const dateStart = isPastDate ? new Date(dateWithPast) : faker.date.future();

    const dateEnd = faker.date.soon(
      faker.datatype.number({ min: 1, max: 15 }),
      dateStart
    );
    const image = faker.image.abstract(1920, 1280, true);
    const eventSlug = slug(title, "-");
    const isFeatured = faker.datatype.boolean();
    const randomUser = await UserModel.aggregate([
      { $match: { role: "USER" } },
      { $sample: { size: 1 } },
    ]);
    data.push({
      title,
      user: randomUser[0]?._id,
      status: "APPROVED",
      slug: eventSlug,
      description: desc,
      location,
      dateStart: dateStart.toUTCString(),
      dateEnd: dateEnd.toUTCString(),
      image,
      isFeatured,
    });
  }
  console.log("RETURN EVENT GENERATE DATA");
  return data;
}

export function generateUsers(result = 10) {
  let data = [];
  console.log("PREPARING TO GENERATE USERS DATA...");

  for (let _i = 0; _i < result; _i++) {
    const name1st = faker.name.firstName();
    const name2nd = faker.name.lastName();
    const name = `${name1st} ${name2nd}`;
    const username = name.split(" ").join("_").toLowerCase();
    const email = faker.internet.email(name1st, name2nd, "storegg.com");
    const password = bcryptjs.hashSync("12345", 12);
    const avatar = faker.image.avatar();

    data.push({
      name,
      username,
      email,
      avatar,
      password,
    });
  }

  console.log("RETURN USERS DATA...");
  return data;
}
