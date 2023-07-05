import { Response } from "express";
import TaskModel from "../../models/calendar";

export const deleteTask = async (req: any, res: Response) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    if (deletedTask) {
      res.status(200).json({
        ok: true,
        task: deletedTask,
        activity: "deleteTask",
        status: "success delete",
      });
    } else {
      res.status(404).json({ ok: false, error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Internal Server Error",
      activity: "deleteTask",
    });
  }
};
