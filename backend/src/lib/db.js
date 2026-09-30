import mongoose from "mongoose";
import dns from "node:dns";

// Only set custom DNS locally if needed; avoid inside cloud serverless environments
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  } catch (e) {
    console.warn("Could not set DNS servers:", e.message);
  }
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw error;
  }
};
