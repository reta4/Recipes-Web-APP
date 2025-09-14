import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
