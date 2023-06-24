import { z } from "zod";

export const CreateTaskSchema = z.object({
  task_title: z.string().nonempty(),
  category: z.string(),
  description: z.string(),
  date: z.string(),
});

export const UpdateTaskSchema = z.object({
  taskId: z.string().nonempty(),
  task_title: z.string().nonempty(),
  category: z.string(),
  description: z.string(),
  date: z.string(),
});

export const DeleteTaskSchema = z.object({
  taskId: z.string().nonempty(),
});
