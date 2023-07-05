import Express from "express";
import { validateUser } from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import {
  CreateTaskSchema,
  DeleteTaskSchema,
  UpdateTaskSchema,
} from "../schemas/calendar";
import { createTask } from "../controllers/calendar/createTask";
import { getTask } from "../controllers/calendar/getTask";
import { updateTask } from "../controllers/calendar/updateTask";
import { deleteTask } from "../controllers/calendar/deleteTask";

const router = Express.Router();

router.get("/view", validateUser(), getTask);
router.post(
  "/createtask",
  validateUser(),
  validateRequest(CreateTaskSchema),
  createTask
);
router.put(
  "/updatetask/:taskId",
  validateUser(),
  validateRequest(UpdateTaskSchema),
  updateTask
);
router.delete(
  "/deletetask/:taskId",
  validateUser(),
  validateRequest(DeleteTaskSchema),
  deleteTask
);

export default router;
