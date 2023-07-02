// Componentes/Mes.tsx
import { useEffect, useState } from "react";
import MyDay from "@/components/global/UI/calendar/MyDay";
import Week from "@/components/global/UI/calendar/MyWeek";
import MyColumnHead from "@/components/global/UI/calendar/MyColumnHead";
import axios from "axios";

interface IMonthProps {
  month: Date;
}

interface ITask {
  _id: string;
  task_title: string;
  toggle: boolean;
  category: string;
  description: string;
  date: string;
  user: string;
  __v: number;
}

const MyMonth = ({ month }: IMonthProps) => {
  const [task, setTask] = useState<ITask[]>([]);
  const [selectedDate, setselectedDate] = useState<Date | null>(null);

  const handleSelectDate = (dia: number) => {
    const newDate = new Date(month.getFullYear(), month.getMonth(), dia);
    setselectedDate(newDate);
  };
  useEffect(() => {
    const getTask = async () => {
      axios.defaults.withCredentials = true;
      const res = await axios.get("http://localhost:4000/api/calendar/view", {
        withCredentials: true,
      });

      setTask(res.data.tasks);
    };

    getTask();
  }, [month]);

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    month.getFullYear(),
    month.getMonth(),
    1
  ).getDay();

  const lastDayOfPreviousMonth = new Date(
    month.getFullYear(),
    month.getMonth(),
    0
  ).getDate();

  const lastDayOfMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDay();

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    // Días del mes anterior
    days.unshift(
      <MyDay
        key={`prev-${lastDayOfPreviousMonth - i}`}
        day={lastDayOfPreviousMonth - i}
        task={[]}
        onSelectDate={handleSelectDate}
      />
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    // Buscar todas las tareas para este día
    const dailyTasks = task.filter((tarea) => {
      const taskDateParts = tarea.date.split("T")[0].split("-");
      const taskDate = new Date(
        parseInt(taskDateParts[0]),
        parseInt(taskDateParts[1]) - 1,
        parseInt(taskDateParts[2])
      );
      return (
        taskDate.getDate() === i &&
        taskDate.getMonth() === month.getMonth() &&
        taskDate.getFullYear() === month.getFullYear()
      );
    });

    days.push(
      <MyDay
        key={i}
        day={i}
        month={month.getMonth()}
        year={month.getFullYear()}
        task={dailyTasks}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />
    );
  }

  for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
    days.push(
      <MyDay
        key={`next-${i}`}
        day={i}
        task={[]}
        onSelectDate={handleSelectDate}
      />
    );
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div>
      <MyColumnHead />
      {weeks.map((week, i) => (
        <Week key={i} days={week} />
      ))}
    </div>
  );
};

export default MyMonth;
