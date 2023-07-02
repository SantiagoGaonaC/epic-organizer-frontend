// Componentes/Cabecera.tsx
const MyColumnHead = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex">
      {days.map((day) => (
        <div key={day} className="flex-grow text-center">
          {day}
        </div>
      ))}
    </div>
  );
};

export default MyColumnHead;
