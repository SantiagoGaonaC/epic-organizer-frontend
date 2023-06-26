// Componentes/Calendario.tsx

import { useState } from "react";
import Mes from "@/components/global/UI/calendar/MyMonth";
import {
  Box,
  useColorModeValue,
  Stack,
  Button,
  ButtonGroup,
  Center,
} from "@chakra-ui/react";

interface CalendarioProps {
  // props si los hay
}

export const obtenerNombreDelMes = (fecha: Date): string => {
  return fecha.toLocaleString("es-ES", {
    month: "long",
    year: "numeric",
  });
};

const MyCalendar = (props: CalendarioProps) => {
  const [mesActual, setMesActual] = useState(new Date());

  const cambiarMes = (incremento: number) => {
    setMesActual((prevMesActual) => {
      const nuevoMes = new Date(prevMesActual);
      nuevoMes.setMonth(prevMesActual.getMonth() + incremento);
      return nuevoMes;
    });
  };

  const irAlMesActual = () => {
    setMesActual(new Date());
  };

  const nombreDelMes = obtenerNombreDelMes(mesActual);

  return (
    <Box
      bg={useColorModeValue("gray.800", "gray.100")}
      px={4}
      color={useColorModeValue("white", "black")}
    >
      <div className="border-2 border-gray-400">
        <Center margin={3}>
          <p className="text-xl uppercase tracking-wide ">{nombreDelMes}</p>
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
                onClick={irAlMesActual}
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
        <Mes mes={mesActual} />
      </div>
    </Box>
  );
};

export default MyCalendar;
