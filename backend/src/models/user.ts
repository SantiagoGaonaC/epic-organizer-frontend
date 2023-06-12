import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  login_code: { type: String, required: true, length: 6 }, //camelCase
  rol: {
    type: {
      admin: Boolean,
      user: Boolean,
    },
    required: true,
  },
});

export default model("User", userSchema, "users");
