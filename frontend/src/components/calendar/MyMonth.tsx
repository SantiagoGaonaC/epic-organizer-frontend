import { useState, useContext } from "react";
import { MyDay, MyWeek, MyColumnHead } from "@/components";
import { IMonthProps } from "@/models/Month.props.model";
import { TaskContext } from "@/context/TaskContext";

const MyMonth = ({ month, setTasks }: IMonthProps) => {
  const [selectedDate, setselectedDate] = useState<Date | null>(null);
  const { tasks, loading, fetchTasks } = useContext(TaskContext)!;

  const handleSelectDate = (dia: number) => {
    setselectedDate(new Date(month.getFullYear(), month.getMonth(), dia));
  };

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
        tasks={[]}
        setTasks={setTasks}
        onSelectDate={handleSelectDate}
        fetchTasks={fetchTasks} // Pasa fetchTasks al componente MyDay
      />
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    // Buscar todas las tareas para este día
    const dailyTasks = tasks.filter((tarea) => {
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
        tasks={dailyTasks}
        setTasks={setTasks}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
        fetchTasks={fetchTasks} // Pasa fetchTasks al componente MyDay
      />
    );
  }

  for (let i = 1; i <= 6 - lastDayOfMonth; i++) {
    days.push(
      <MyDay
        key={`next-${i}`}
        day={i}
        tasks={[]}
        setTasks={setTasks}
        onSelectDate={handleSelectDate}
        fetchTasks={fetchTasks} // Pasa fetchTasks al componente MyDay
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
      {loading ? (
        <div>Loading...</div> // Display a loading state while tasks are being fetched
      ) : (
        weeks.map((week, i) => <MyWeek key={i} days={week} />)
      )}
    </div>
  );
};

export default MyMonth;
