// Componentes/Dia.tsx
import { Flex, Button, Checkbox } from "@chakra-ui/react";
import { MyInsertTask } from "./entites/MyInsertTask";

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

interface DiaProps {
  dia: number;
  mes?: number;
  anio?: number;
  tareas: Tarea[];
  fechaSeleccionada?: Date | null;
  onSeleccionarFecha: (dia: number) => void;
}

const Dia = ({
  dia,
  mes,
  anio,
  tareas,
  fechaSeleccionada,
  onSeleccionarFecha,
}: DiaProps) => {
  const handleClick = () => {
    onSeleccionarFecha(dia);
  };
  console.log(fechaSeleccionada);
  const isSelected = fechaSeleccionada?.getDate() === dia;

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
        {dia}
      </span>
      <div className="mt-7">
        {tareas.map((tarea, index) => (
          <div
            key={index}
            className="m-1 list-outside border p-1 text-left text-xs "
          >
            <Checkbox id={tarea._id} defaultChecked={tarea.toggle}>
              {tarea.task_title}
            </Checkbox>
            <div className="p-1">{tarea.category}</div>
          </div>
        ))}
      </div>
      <MyInsertTask />
    </Flex>
  );
};

export default Dia;
