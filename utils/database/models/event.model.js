import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: { type: String },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
  },
  image: {
    type: String,
    required: true,
  },
  isFeatured: {
    type: Boolean,
  },
});

const EventModel =
  models.EventModel || model("EventModel", eventSchema, "events");

export default EventModel;
