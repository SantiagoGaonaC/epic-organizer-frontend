// Componentes/Dia.tsx
interface DiaProps {
  dia: number;
}

const Dia = ({ dia }: DiaProps) => {
  return (
    <div
      className="aspect-content flex-grow border border-gray-200"
      style={{
        flexBasis: "14.2857%",
        flexShrink: 0,
        aspectRatio: "1 / 1",
      }}
    >
      {dia}
    </div>
  );
};

export default Dia;
