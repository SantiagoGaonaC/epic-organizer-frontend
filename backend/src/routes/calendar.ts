import Express from "express";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/calendar";
import { validateUser } from "../middlewares/auth";

const router = Express.Router();

router.get("/view", validateUser(), getTask);
router.post("/createtask", validateUser(), createTask);
router.put("/updatetask/:taskId", validateUser(), updateTask);
router.delete("/deletetask/:taskId", validateUser(), deleteTask);

export default router;
