import { Dispatch } from "react";
import { ITask } from "./Task.models";

export interface IMonthProps {
  month: Date;
  setTasks: Dispatch<React.SetStateAction<ITask[]>>;
}
