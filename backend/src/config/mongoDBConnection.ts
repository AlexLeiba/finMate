import mongoose from "mongoose";

let connectionPromise: Promise<void> | null = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (mongoose.connection.readyState === 1) return;

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(uri)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error: unknown) => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;
};
