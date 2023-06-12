import mongoose from "mongoose";
//import UserModel from "../models/user";

async function connectDB() {
  if (!process.env.MONGODB_URL) {
    throw new Error(
      "Please define the MONGODB_URL environment variable inside .env.local"
    );
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    /* 
        const newUser = new UserModel({
            firstName: "Santiago",
            lastName: "Gaona",
            email: "sgaonacarvajal@outlook.com",
            login_code: "123456",
            rol:{
                admin: true,
                user: true
            }
        });
        console.log({newUser});
        await newUser.save();
        */
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

export default connectDB;
