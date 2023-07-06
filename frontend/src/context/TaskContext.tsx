import { ReactNode, createContext, useContext } from "react";
import { ITask } from "@/models/Task.models";
import { Flex, Spinner } from "@chakra-ui/react";
import useFetchTasks from "@/hooks/useFetchTasks";

interface ITaskContext {
  tasks: ITask[];
  loading: boolean;
  fetchTasks: () => Promise<ITask[]>; // Añade fetchTasks aquí
}

const TaskContext = createContext<ITaskContext | null>(null);

const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, loading, fetchTasks] = useFetchTasks();

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
    <TaskContext.Provider value={{ tasks, loading, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
