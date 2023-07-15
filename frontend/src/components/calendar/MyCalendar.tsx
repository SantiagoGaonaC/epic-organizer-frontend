import { useState } from "react";
import { MyMonth } from "@/components";
import {
  Box,
  useColorModeValue,
  Stack,
  ButtonGroup,
  Center,
} from "@chakra-ui/react";
import MyButtonAuth from "../entities/buttons/MyButtonAuth";

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
              <MyButtonAuth
                text="Mes anterior"
                onClickHandler={() => cambiarMes(-1)}
              />
              <MyButtonAuth
                text="Ir al mes actual"
                onClickHandler={goToCurrentMonth}
              />
              <MyButtonAuth
                text="Mes siguiente"
                onClickHandler={() => cambiarMes(1)}
              />
            </ButtonGroup>
          </Stack>
        </Center>
        <MyMonth month={monthViewed} />
      </div>
    </Box>
  );
};

export default MyCalendar;
