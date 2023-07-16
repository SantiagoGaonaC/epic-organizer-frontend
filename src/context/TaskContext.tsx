import { ReactNode, createContext, useContext } from "react";
import { ITask } from "@/models/Task.model";
import { Flex, Spinner } from "@chakra-ui/react";
import useFetchTasks from "@/hooks/useFetchTasks";
import { TaskServiceAxios, TaskUpdateServices } from "@/services";

interface ITaskContext {
  tasks: ITask[];
  loading: boolean;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>; // Add setTasks here
  fetchTasks: () => Promise<ITask[]>;
  updateTask: (id: string, updatedTask: ITask) => Promise<void>;
  createTask: (newTask: ITask) => Promise<void>;
}

const TaskContext = createContext<ITaskContext | null>(null);

const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks, loading, fetchTasks] = useFetchTasks();

  const updateTaskService = new TaskUpdateServices();
  const updateTask = async (id: string, updatedTask: ITask) => {
    await updateTaskService.updateTask(id, updatedTask);
    (setTasks as React.Dispatch<React.SetStateAction<ITask[]>>)(
      (prevTasks: ITask[]) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
    );
  };

  const TaskCreateService = new TaskServiceAxios();
  const createTask = async (newTask: ITask) => {
    const createdTask = await TaskCreateService.createTask(
      newTask.task_title,
      newTask.category,
      newTask.description,
      newTask.date,
      newTask.toggle
    );
    (setTasks as React.Dispatch<React.SetStateAction<ITask[]>>)(
      (prevTasks: ITask[]) => [...prevTasks, createdTask]
    );
  };
  if (loading)
    return (
      <Flex
        minHeight={"100vh"}
        margin="0 auto"
        width="40rem"
        height="40rem"
        alignItems="center"
        justifyContent="center"
      >
        <div className="grid h-full place-items-center">
          <Spinner w={34} h={34} />
        </div>
      </Flex>
    );

  return (
    <TaskContext.Provider
      value={{ tasks, loading, setTasks, fetchTasks, updateTask, createTask }} // Provide setTasks here
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
