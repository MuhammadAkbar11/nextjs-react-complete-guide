import axios from "axios";
import toQueriesToString from "../objToQueryStr";

export const getAllEventsService = async (
  prefixUrl = "/api",
  filter = { limit: 10 }
) => {
  const queries = toQueriesToString(filter);
  try {
    const { data } = await axios.get(`${prefixUrl}/events?${queries}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getEventDetailService = async (prefixUrl = "/api/", slug) => {
  try {
    const { data } = await axios.get(`${prefixUrl}/events/${slug}`);
    return data.event;
  } catch (error) {
    throw error;
  }
};

export const getFeaturedEventsService = async (prefixUrl, filter) => {
  const allEvents = await getAllEventsService(prefixUrl, filter);
  return allEvents;
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
