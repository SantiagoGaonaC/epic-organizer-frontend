// Componentes/Mes.tsx
import Dia from "@/components/global/UI/calendar/MyDay";
import Semana from "@/components/global/UI/calendar/MyWeek";
import MyColumnHead from "@/components/global/UI/calendar/MyColumnHead";

interface MesProps {
  mes: Date;
}

const Mes = ({ mes }: MesProps) => {
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
      />
    );
  }

  for (let i = 1; i <= diasEnMes; i++) {
    dias.push(<Dia key={i} dia={i} />);
  }

  for (let i = 1; i <= 6 - ultimoDiaDelMes; i++) {
    dias.push(<Dia key={`next-${i}`} dia={i} />);
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
