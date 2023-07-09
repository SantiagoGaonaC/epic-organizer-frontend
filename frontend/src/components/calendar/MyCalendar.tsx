import { useContext, useState } from "react";
import { MyMonth } from "@/components";
import { ITask } from "@/models";
import {
  Box,
  useColorModeValue,
  Stack,
  Button,
  ButtonGroup,
  Center,
} from "@chakra-ui/react";

interface ICalendarProps {
  // props if any
}

export const getNameOfMonth = (fecha: Date): string => {
  return fecha.toLocaleString("es-ES", {
    month: "long",
    year: "numeric",
  });
};

const MyCalendar = (props: ICalendarProps) => {
  const [monthViewed, setmonthViewed] = useState(new Date());

  const cambiarMes = (increase: number) => {
    setmonthViewed((getCurrentMonth) => {
      const newMonth = new Date(getCurrentMonth);
      newMonth.setMonth(getCurrentMonth.getMonth() + increase);
      return newMonth;
    });
  };

  const goToCurrentMonth = () => {
    setmonthViewed(new Date());
  };

  return (
    <Box
      bg={useColorModeValue("black", "gray.100")}
      px={4}
      color={useColorModeValue("white", "black")}
    >
      <div className="border-2 border-gray-400">
        <Center margin={3}>
          <p className="text-xl uppercase tracking-wide ">
            {getNameOfMonth(monthViewed)}
          </p>
        </Center>
        <Center>
          <Stack margin={3}>
            <ButtonGroup variant="outline" spacing="6">
              <Button
                colorScheme="gray"
                variant="outline"
                color="white"
                onClick={() => cambiarMes(-1)}
                rounded={"full"}
                _hover={{
                  bg: "gray.700",
                }}
              >
                Mes anterior
              </Button>
              <Button
                colorScheme="gray"
                variant="outline"
                color="white"
                onClick={goToCurrentMonth}
                rounded={"full"}
                _hover={{
                  bg: "gray.700",
                }}
              >
                Ir al mes actual
              </Button>
              <Button
                colorScheme="gray"
                variant="outline"
                color="white"
                onClick={() => cambiarMes(1)}
                rounded={"full"}
                _hover={{
                  bg: "gray.700",
                }}
              >
                Mes siguiente
              </Button>
            </ButtonGroup>
          </Stack>
        </Center>
        <MyMonth month={monthViewed}/>
      </div>
    </Box>
  );
};

export default MyCalendar;
