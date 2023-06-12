import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  task_title: { type: String, required: true },
  toggle: { type: Boolean, required: true },
  category: { type: String },
  description: { type: String },
  date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const TaskModel = model("Task", taskSchema, "tasks");

export default TaskModel;
