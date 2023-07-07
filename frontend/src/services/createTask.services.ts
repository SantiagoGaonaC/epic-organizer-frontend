import { ITask, ITaskService } from "@/models";
import { api } from "@/utilities/api.auth.utilities";
import axios from "axios";

/**
 * Crea una nueva tarea.
 * @param title - El título de la tarea.
 * @param category - La categoría de la tarea.
 * @param description - La descripción de la tarea.
 * @param date - La fecha de la tarea.
 * @param toggle - El estado de la tarea (activado o desactivado).
 * @returns Una promesa que se resuelve con la tarea creada.
 */
export class TaskServiceAxios implements ITaskService {
  async createTask(
    title: string,
    category: string,
    description: string,
    date: string,
    toggle: boolean
  ): Promise<ITask> {
    try {
      const response = await api.post(
        "/calendar/createtask",
        {
          task_title: title,
          category: category,
          description: description,
          date: date,
          toggle: toggle,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.ok) {
        console.log("Tarea creada con éxito!");
        return response.data.task; // Devolvemos la tarea creada
      } else {
        console.log("Error: Hubo un problema al crear la tarea");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Error: " + error.response.data.message);
        } else {
          console.log("Error: " + error.message);
        }
      } else {
        console.log("Error desconocido: ", error);
      }
    }

    return Promise.reject("Hubo un problema al crear la tarea"); // Devuelve una promesa rechazada si algo sale mal
  }
}
