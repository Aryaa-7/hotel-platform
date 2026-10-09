import mongoose from "mongoose";
import { env } from "../../config/env.js";
import { logger } from "../logger/logger.js";

export async function connectMongo() {
  await mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  logger.info("mongo connected");
}
export async function pingMongo(): Promise<boolean> {
  try { await mongoose.connection.db?.admin().ping(); return true; } catch { return false; }
}
export const closeMongo = () => mongoose.disconnect();