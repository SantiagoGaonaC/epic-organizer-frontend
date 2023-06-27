import { Flex } from "@chakra-ui/react";
import { MyInsertTask } from "./entites/MyInsertTask";

interface DiaProps {
  dia: number;
}

const Dia = ({ dia }: DiaProps) => {
  return (
    <Flex
      className="aspect-content flex-grow border border-gray-200"
      style={{
        flexBasis: "14.2857%",
        flexShrink: 0,
        aspectRatio: "1 / 1",
      }}
      direction="column"
      position="relative"
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
      <MyInsertTask />
    </Flex>
  );
};

export default Dia;
