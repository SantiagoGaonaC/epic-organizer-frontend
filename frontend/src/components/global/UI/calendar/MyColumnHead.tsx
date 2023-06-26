// Componentes/Cabecera.tsx
const MyColumnHead = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex">
      {days.map((dia) => (
        <div key={dia} className="flex-grow text-center">
          {dia}
        </div>
      ))}
    </div>
  );
};

export default MyColumnHead;
