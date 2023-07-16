import { useEffect, useState } from "react";
import { fetchTasks as fetchTasksService } from "@/services/public.services";
import { ITask } from "@/models";

const useFetchTasks = (): [
  ITask[],
  React.Dispatch<React.SetStateAction<ITask[]>>,
  boolean,
  () => Promise<ITask[]>
] => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const fetchedTasks = await fetchTasksService();
    setTasks(fetchedTasks);
    setLoading(false);
    return fetchedTasks;
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return [tasks, setTasks, loading, fetchTasks]; // Asegúrate de devolver setTasks aquí
};

export default useFetchTasks;
