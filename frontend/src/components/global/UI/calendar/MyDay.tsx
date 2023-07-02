// Componentes/Dia.tsx
import { Flex, Button, Checkbox } from "@chakra-ui/react";
import { MyInsertTask } from "./entites/MyInsertTask";

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
  task: ITarea[];
  selectedDate?: Date | null;
  onSelectDate: (dia: number) => void;
}

const MyDay = ({
  day,
  month,
  year,
  task,
  selectedDate,
  onSelectDate,
}: IMyDayProps) => {
  const handleClick = () => {
    onSelectDate(day);
  };
  console.log(selectedDate);
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
        {task.map((task, index) => (
          <div
            key={index}
            className="m-1 list-outside border p-1 text-left text-xs "
          >
            <Checkbox id={task._id} defaultChecked={task.toggle}>
              {task.task_title}
            </Checkbox>
            <div className="p-1">{task.category}</div>
          </div>
        ))}
      </div>
      <MyInsertTask selectedDate={selectedDate} />
    </Flex>
  );
};

export default MyDay;
