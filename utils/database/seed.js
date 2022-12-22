import { faker } from "@faker-js/faker";
import slug from "slug";

export function generateEvents(result = 10) {
  console.log("GENERATE EVENT....");
  let data = [];
  for (let index = 0; index < result; index++) {
    console.log(index);
    const totalTitleLength = faker.datatype.number({ min: 8, max: 20 });
    const totalDescLength = faker.datatype.number({ min: 80, max: 200 });
    const title = faker.random.words(totalTitleLength);
    const desc = faker.random.words(totalDescLength);
    const location = faker.address.streetAddress(true);
    const dateStart = faker.date.future();
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
      dateStart,
      dateEnd,
      image,
      isFeatured,
    });
  }
  console.log("RETURN EVENT GENERATE DATA");
  return data;
}
