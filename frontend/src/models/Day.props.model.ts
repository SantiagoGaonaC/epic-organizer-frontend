import { ITask } from "@/models";

export interface IMyDayProps {
  day: number;
  month?: number;
  year?: number;
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  selectedDate?: Date | null;
  onSelectDate: (dia: number) => void;
  fetchTasks: () => Promise<ITask[]>;
}
