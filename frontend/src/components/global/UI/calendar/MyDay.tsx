import { Flex, Checkbox } from "@chakra-ui/react";
import { MyInsertTask } from "./entites/MyInsertTask";
import { ITask } from "./MyMonth";

interface ITarea {
  _id: string;
  task_title: string;
  toggle: boolean;
  category: string;
  description: string;
  date: string;
  user: string;
  __v: number;
}

interface IMyDayProps {
  day: number;
  month?: number;
  year?: number;
  tasks: ITarea[];
  setTasks: React.Dispatch<React.SetStateAction<ITarea[]>>;
  selectedDate?: Date | null;
  onSelectDate: (dia: number) => void;
  fetchTasks: () => Promise<ITask[]>; // Ajusta el tipo de la prop fetchTasks
}

const MyDay = ({
  day,
  month,
  year,
  tasks,
  setTasks,
  selectedDate,
  onSelectDate,
  fetchTasks,
}: IMyDayProps) => {
  const handleClick = () => {
    onSelectDate(day);
  };

  const isSelected = selectedDate?.getDate() === day;

  return (
    <Flex
      className={`aspect-content flex-grow border border-gray-200 ${
        isSelected ? "bg-blue-200" : ""
      }`}
      style={{
        flexBasis: "14.2857%",
        flexShrink: 0,
        aspectRatio: "1 / 1",
      }}
      direction="column"
      position="relative"
      onClick={handleClick}
    >
      <span
        style={{
          position: "absolute",
          top: "4px",
          left: "4px",
        }}
      >
        {day}
      </span>
      <div className="mt-7">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="m-1 list-outside border p-1 text-left text-xs "
          >
            <Checkbox id={task._id} defaultChecked={task.toggle}>
              {task.task_title}
            </Checkbox>
            <div className="p-1">{task.category}</div>
          </div>
        ))}
      </div>
      <MyInsertTask
        selectedDate={selectedDate}
        setTasks={setTasks}
        fetchTasks={fetchTasks}
      />
    </Flex>
  );
};

export default MyDay;
