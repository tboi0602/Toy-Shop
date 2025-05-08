import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ninjashop";
export async function connectDB() {
  try {
    if (!MONGO_URI) {
      throw new Error(" MONGO_URI is not defined in environment variables");
    }
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}
