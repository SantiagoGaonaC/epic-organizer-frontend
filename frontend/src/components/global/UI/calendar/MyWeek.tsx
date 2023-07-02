interface WeekProps {
  days: JSX.Element[];
}

const Week = ({ days }: WeekProps) => {
  return <div className="flex">{days}</div>;
};

export default Week;
