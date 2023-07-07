import { useEffect, useState } from "react";
import { fetchTasks as fetchTasksService } from "@/services/public.services";
import { ITask } from "@/models";

const useFetchTasks = (): [ITask[], boolean, () => Promise<ITask[]>] => {
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

  return [tasks, loading, fetchTasks];
};

export default useFetchTasks;
