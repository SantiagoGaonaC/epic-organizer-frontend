import { ITask } from "@/models";
import { api } from "@/utilities/api.auth.utilities";
import axios from "axios";

export class TaskDeleteServices {
  async deleteTask(id: string): Promise<ITask> {
    try {
      const response = await api.delete(`/calendar/deletetask/${id}`, {
        withCredentials: true,
      });

      if (response.data.ok) {
        console.log("Tarea eliminada con éxito!");
        return response.data.task;
      } else {
        console.log("Error: Hubo un problema al eliminar la tarea");
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
    return Promise.reject("Hubo un problema al eliminar la tarea");
  }
}
