import { Dispatch } from "react";
import { ITask } from "@/models";

export interface IMonthProps {
  month: Date;
  setTasks: Dispatch<React.SetStateAction<ITask[]>>;
}
