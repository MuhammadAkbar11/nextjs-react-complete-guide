import mongoose from "mongoose";
import { MONGO_URI } from "../constants";

async function connectDB() {
  const dbUri = MONGO_URI;

  if (!dbUri) throw new Error("Invalid Database URL");
  try {
    const conn = await mongoose.connect(dbUri);
    console.log("[mongoose] Connected to DB");
    console.log(
      `[mongoose] connected on 'mongodb://*****:*****@${conn.connection.host}:${conn.connection.port}' `
    );
    console.log(`[mongoose] mongo database : ${conn.connection.name}`);
  } catch (error) {
    console.log("could not connect to DB");
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
