import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.PORDUCTION === "true";
const MONGO_URI = isProduction
  ? process.env.PROD_MONGO_URI
  : process.env.LOCAL_MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
