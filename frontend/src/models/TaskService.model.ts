import { ITask } from "./Task.model";
// Interfaz para el servicio de Tareas
export interface ITaskService {
  createTask: (
    title: string,
    category: string,
    description: string,
    date: string,
    toggle: boolean
  ) => Promise<ITask>;
}
