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

export const getEventCommentsService = async eventId => {
  try {
    const { data } = await axios.get(`/api/comments/${eventId}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const postEventCommentService = async (eventId, values) => {
  try {
    const { data } = await axios.post(`/api/comments/${eventId}`, values);

    return data;
  } catch (error) {
    throw error;
  }
};
