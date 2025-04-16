import mongoose from 'mongoose';
import env from 'dotenv';

env.config();

const mongoUri = process.env.MONGO_URI; // Add your Mongo URI in .env file

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
