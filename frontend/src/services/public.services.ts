/*
Archivo de configuración 
para llamada a todos los servicios externos de la app 
[llamada a (APIs)]
*/

import { ITask } from "@/models";
import { api } from "@/utilities/api.auth.utilities";

export async function fetchTasks(): Promise<ITask[]> {
  try {
    const res = await api.get("/calendar/view");
    return res.data.tasks || [];
  } catch (error) {
    console.log("Error fetching tasks:", error);
    return [];
  }
}
