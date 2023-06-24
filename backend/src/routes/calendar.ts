import Express from "express";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/calendar";
import { validateUser } from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import {
  CreateTaskSchema,
  DeleteTaskSchema,
  UpdateTaskSchema,
} from "../schemas/calendar";

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
