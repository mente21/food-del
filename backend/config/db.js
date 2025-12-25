import mongoose from "mongoose";

export const connectDB = async () => {
  // Check if we already have a connection
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not defined connection skipped.");
      return;
    }

    // Optimize for serverless
    mongoose.set('strictQuery', false);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Limit pool size for serverless
    });
    
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error.message);
  }
};
