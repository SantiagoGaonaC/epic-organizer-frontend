// Componentes/Semana.tsx
interface SemanaProps {
  dias: JSX.Element[];
}

const Semana = ({ dias }: SemanaProps) => {
  return <div className="flex">{dias}</div>;
};

export default Semana;
