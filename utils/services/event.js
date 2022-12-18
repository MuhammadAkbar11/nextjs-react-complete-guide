import axios from "axios";

export const getAllEventsService = async () => {
  try {
    const { data } = await axios.get(
      "https://nextjs-app-3f3f8-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
    );

    const events = [];
    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }

    return events;
  } catch (error) {
    throw error;
  }
};
