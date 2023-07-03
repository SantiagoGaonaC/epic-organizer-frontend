import { useEffect, useState, Dispatch } from "react";
import MyDay from "@/components/global/UI/calendar/MyDay";
import Week from "@/components/global/UI/calendar/MyWeek";
import MyColumnHead from "@/components/global/UI/calendar/MyColumnHead";
import axios from "axios";

interface IMonthProps {
  month: Date;
  setTasks: Dispatch<React.SetStateAction<ITask[]>>;
}

export interface ITask {
  _id: string;
  task_title: string;
  toggle: boolean;
  category: string;
  description: string;
  date: string;
  user: string;
  __v: number;
}

const MyMonth = ({ month, setTasks }: IMonthProps) => {
  const [selectedDate, setselectedDate] = useState<Date | null>(null);
  const [tasks, setFetchedTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async (): Promise<ITask[]> => {
    try {
      const res = await axios.get("http://localhost:4000/api/calendar/view", {
        withCredentials: true,
      });
      setFetchedTasks(res.data.tasks);
      setLoading(false);
      return res.data.tasks; // Asegúrate de devolver los datos de las tareas aquí
    } catch (error: unknown) {
      console.log("Error fetching tasks:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSelectDate = (dia: number) => {
    setselectedDate(new Date(month.getFullYear(), month.getMonth(), dia));
    fetchTasks(); // Fetch tasks after changing the selected date
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
        weeks.map((week, i) => <Week key={i} days={week} />)
      )}
    </div>
  );
};

export default MyMonth;
