import { Response } from "express";
import TaskModel from "../../models/calendar";

export const getTask = async (req: any, res: Response) => {
  try {
    const tasks = await TaskModel.find({ user: req.user.sub });
    res.status(200).json({ ok: true, tasks: tasks });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
};
