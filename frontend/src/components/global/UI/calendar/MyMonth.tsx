// Componentes/Mes.tsx
import { useEffect, useState } from "react";
import Dia from "@/components/global/UI/calendar/MyDay";
import Semana from "@/components/global/UI/calendar/MyWeek";
import MyColumnHead from "@/components/global/UI/calendar/MyColumnHead";
import axios from "axios";

interface MesProps {
  mes: Date;
}

interface Tarea {
  _id: string;
  task_title: string;
  toggle: boolean;
  category: string;
  description: string;
  date: string;
  user: string;
  __v: number;
}

const Mes = ({ mes }: MesProps) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    const obtenerTareas = async () => {
      axios.defaults.withCredentials = true;
      const res = await axios.get("http://localhost:4000/api/calendar/view", {
        withCredentials: true,
      });

      setTareas(res.data.tasks);
    };

    obtenerTareas();
  }, [mes]);

  const diasEnMes = new Date(
    mes.getFullYear(),
    mes.getMonth() + 1,
    0
  ).getDate();

  const primerDiaDelMes = new Date(
    mes.getFullYear(),
    mes.getMonth(),
    1
  ).getDay();

  const ultimoDiaMesAnterior = new Date(
    mes.getFullYear(),
    mes.getMonth(),
    0
  ).getDate();

  const ultimoDiaDelMes = new Date(
    mes.getFullYear(),
    mes.getMonth() + 1,
    0
  ).getDay();

  const dias = [];

  for (let i = 0; i < primerDiaDelMes; i++) {
    // Días del mes anterior
    dias.unshift(
      <Dia
        key={`prev-${ultimoDiaMesAnterior - i}`}
        dia={ultimoDiaMesAnterior - i}
        tareas={[]}
      />
    );
  }

  for (let i = 1; i <= diasEnMes; i++) {
    // Buscar todas las tareas para este día
    const tareasDelDia = tareas.filter((tarea) => {
      const fechaDeTareaParts = tarea.date.split("T")[0].split("-");
      const fechaDeTarea = new Date(
        parseInt(fechaDeTareaParts[0]),
        parseInt(fechaDeTareaParts[1]) - 1,
        parseInt(fechaDeTareaParts[2])
      );
      return (
        fechaDeTarea.getDate() === i &&
        fechaDeTarea.getMonth() === mes.getMonth() &&
        fechaDeTarea.getFullYear() === mes.getFullYear()
      );
    });

    dias.push(<Dia key={i} dia={i} tareas={tareasDelDia} />);
  }

  for (let i = 1; i <= 6 - ultimoDiaDelMes; i++) {
    dias.push(<Dia key={`next-${i}`} dia={i} tareas={[]} />);
  }

  const semanas = [];
  for (let i = 0; i < dias.length; i += 7) {
    semanas.push(dias.slice(i, i + 7));
  }

  return (
    <div>
      <MyColumnHead />
      {semanas.map((semana, i) => (
        <Semana key={i} dias={semana} />
      ))}
    </div>
  );
};

export default Mes;
