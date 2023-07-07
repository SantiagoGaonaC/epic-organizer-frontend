import { ITask } from "./Task.model";

export interface IMyInsertTaskProps {
  selectedDate?: Date | null;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  fetchTasks: () => Promise<ITask[]>;
}
