"use client";

import MyColorMode from "@/components/entities/MyColorMode";
import MyButtonAuth from "@/components/entities/buttons/MyButtonAuth";
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function SplitScreen() {
  const router = useRouter();
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("black", "gray.200")}
      >
        <MyColorMode margin={3} />
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
              color={useColorModeValue("white", "black")}
            >
              Epic Organizer
            </Text>
            <br />{" "}
            <Text color={"blue.400"} as={"span"}>
              Gestiona tus tareas
            </Text>{" "}
          </Heading>
          <Text
            fontSize={{ base: "md", lg: "lg" }}
            color={useColorModeValue("gray.500", "black")}
            textAlign="justify"
          >
            Gestiona tareas de forma interactiva y minimalista con nuestra web.
            Organiza tu día en el calendario, establece recordatorios y mantén
            un flujo de trabajo eficiente. Simplifica tu vida y maximiza tu
            productividad.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <MyButtonAuth
              text="Iniciar Sesión"
              onClickHandler={() => router.push("/login")}
            />
            <MyButtonAuth
              text="Registrarse"
              onClickHandler={() => router.push("/register")}
            />
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1616530834117-9167fb0d8ebc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29vZ2xlJTIwY2FsZW5kYXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
