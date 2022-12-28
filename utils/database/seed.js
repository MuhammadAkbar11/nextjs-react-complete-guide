import { faker } from "@faker-js/faker";
import slug from "slug";

function getPastDateInISOFormat(months, days = 0) {
  const pastDate = new Date();
  pastDate.setMonth(pastDate.getMonth() - months);
  pastDate.setDate(pastDate.getDate() - days);
  return pastDate.toISOString();
}

export function generateEvents(result = 10, withPast = false) {
  let data = [];
  for (let index = 0; index < result; index++) {
    const totalTitleLength = faker.datatype.number({ min: 8, max: 15 });
    const totalDescLength = faker.datatype.number({ min: 80, max: 200 });
    const title = faker.random.words(totalTitleLength);
    const desc = faker.random.words(totalDescLength);
    const location = faker.address.streetAddress(true);

    const isPastDate = withPast ? faker.datatype.boolean() : false;
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
    data.push({
      title,
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
