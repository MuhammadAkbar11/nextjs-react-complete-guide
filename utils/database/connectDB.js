import mongoose from "mongoose";
import { MONGO_URI } from "../constants";

async function connectDB() {
  const dbUri = MONGO_URI;

  if (!dbUri) throw new Error("Invalid Database URL");
  try {
    const conn = await mongoose.connect(dbUri, {
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("[mongoose] Connected to DB");
    console.log(
      `[mongoose] connected on 'mongodb://*****:*****@${conn.connection.host}:${conn.connection.port}' `
    );
    console.log(`[mongoose] mongo database : ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.log("could not connect to DB");
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
