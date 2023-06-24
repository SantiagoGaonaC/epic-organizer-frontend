import { Response } from "express";
import TaskModel from "../models/calendar";

export const getTask = async (req: any, res: Response) => {
  try {
    const tasks = await TaskModel.find({ user: req.user.sub });
    res.status(200).json({ ok: true, tasks: tasks });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
};

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

export const updateTask = async (req: any, res: Response) => {
  try {
    const { taskId } = req.params;
    const { task_title, category, description, date } = req.body;

    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      {
        task_title,
        category,
        description,
        date,
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

export const deleteTask = async (req: any, res: Response) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    if (deletedTask) {
      res
        .status(200)
        .json({
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
