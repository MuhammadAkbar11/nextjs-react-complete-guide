import { Schema, model, models } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: { type: String },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
    location: {
      type: String,
      required: true,
    },
    dateStart: {
      type: Date,
      required: true,
      index: true,
    },
    dateEnd: {
      type: Date,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["REJECT", "PENDING", "APPROVED"],
      default: "PENDING",
    },
    isFeatured: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const EventModel =
  models.EventModel || model("EventModel", eventSchema, "events");

export default EventModel;
