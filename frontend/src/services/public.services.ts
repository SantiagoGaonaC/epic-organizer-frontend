/*
Archivo de configuración 
para llamada a todos los servicios externos de la app 
[llamada a (APIs)]
*/

import { ITask } from "@/models/Task.models";
import axios from "axios";

export async function fetchTasks(): Promise<ITask[]> {
  try {
    const res = await axios.get("http://localhost:4000/api/calendar/view", {
      withCredentials: true,
    });
    return res.data.tasks;
  } catch (error: unknown) {
    console.log("Error fetching tasks:", error);
    return [];
  }
}
