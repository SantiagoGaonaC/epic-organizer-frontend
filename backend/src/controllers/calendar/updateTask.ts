import { Response } from "express";
import TaskModel from "../../models/calendar";
export const updateTask = async (req: any, res: Response) => {
  try {
    const { taskId } = req.params;
    const { task_title, category, description, date, toggle } = req.body;

    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      {
        task_title,
        category,
        description,
        date,
        toggle,
      },
      { new: true }
    );

    if (updatedTask) {
      res.status(200).json({ ok: true, task: updatedTask });
    } else {
      res.status(404).json({ ok: false, error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Internal Server Error",
      activity: "updateTask",
    });
  }
};
