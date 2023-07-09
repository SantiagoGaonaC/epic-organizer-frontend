import { ITask } from "@/models";
import { api } from "@/utilities/api.auth.utilities";
import axios from "axios";

export class TaskUpdateServices {
  async updateTask(id: string, task: ITask): Promise<ITask> {
    try {
      const response = await api.put(`/calendar/updatetask/${id}`, task, {
        withCredentials: true,
      });

      if (response.data.ok) {
        console.log("Tarea actualizada con éxito!");
        return response.data.task;
      } else {
        console.log("Error: Hubo un problema al actualizar la tarea");
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
    return Promise.reject("Hubo un problema al actualizar la tarea");
  }
}
