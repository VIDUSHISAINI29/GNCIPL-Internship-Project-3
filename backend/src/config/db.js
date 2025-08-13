import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error in connecting to MongoDB:", error.message);
    process.exit(1); // ✅ correct exit syntax
  }
};
