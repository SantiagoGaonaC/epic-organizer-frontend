import { Response } from "express";
import TaskModel from "../../models/calendar";
export const createTask = async (req: any, res: Response) => {
  try {
    const { task_title, category, description, date } = req.body;
    const createTask = await TaskModel.create({
      task_title,
      toggle: false,
      category,
      description,
      date,
      user: req.user.sub,
    });
    res.status(201).json({ ok: true, task: createTask });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Internal Server Error",
      activity: "createTask",
    });
  }
};
