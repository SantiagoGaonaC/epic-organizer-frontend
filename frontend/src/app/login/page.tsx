"use client";

import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  ButtonGroup,
  Center,
  Link,
  useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import axios from "axios";
import { env } from "@/env";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { LoginValues, LoginSchema } from "@/schemas/AuthSchema";
import useAuth from "../../../hooks/useAuth";
import MyForm from "@/components/global/UI/entities/forms/MyForm";
import MyInput from "@/components/global/UI/entities/input/MyInput";

const Login: NextPage = () => {
  const white = useColorModeValue("white", "white");
  const [noActiveUser, setNoActiveUser] = useState(false);
  const [emailCodeIncorrect, setEmailCodeIncorrect] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [errLogin, setErrLogin] = useState(false);
  const toast = useToast();
  const { setUser } = useAuth();

  const resetStates = () => {
    setNoActiveUser(false);
    setEmailCodeIncorrect(false);
    setErrLogin(false);
  };

  const onSubmit = async (values: LoginValues) => {
    const { email, code } = values;
    console.log({ email, code });
    resetStates();

    try {
      const response = await axios.post(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`,
        { code },
        { withCredentials: true }
      );

      if (response.data.ok) {
        const tokenPayload = response.data.data;
        localStorage.setItem("user", JSON.stringify(tokenPayload));
        setUser(tokenPayload);
        router.push("/calendar");
      } else {
        console.log("Error: Error en el inicio de sesión");
        setErrLogin(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 403:
              console.log("Usuario no activado");
              setNoActiveUser(true);
              break;
            case 404:
              console.log("Email o código incorrecto");
              setEmailCodeIncorrect(true);
              break;
            default:
              console.log("Error: " + error);
              setErrLogin(true);
          }
        } else {
          console.log("Error: " + error);
          setErrLogin(true);
        }
      } else {
        console.log("Error: " + error);
        setErrLogin(true);
      }
    }
  };

  const getCode = async (email: string) => {
    console.log({ email });
    try {
      const response = await axios.post(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}/code`
      );
      if (response.data.ok) {
        toast({
          description: response.data.message,
          status: "success",
          icon: <CheckIcon />,
          position: "top",
        });
      } else {
        console.log("Error: Error al obtener el código");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Error: " + error.response.data.message);
        } else {
          console.log("Error: " + error);
        }
      } else {
        console.log("Error: " + error);
      }
    }
  };

  const onError = (errors: any) => {
    resetStates();
    console.log({ errors: errors });
  };

  const router = useRouter();

  const errorMessages = [
    { condition: noActiveUser, message: "Usuario no activo" },
    { condition: emailCodeIncorrect, message: "Email o código incorrecto" },
    { condition: errLogin, message: "Error en el inicio de sesión" },
  ];

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.900", "gray.200")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={white}>
            Inicio de sesión
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            organiza tus tareas! ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("gray.800", "gray.200")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} color={white}>
            <MyForm
              onSubmit={onSubmit}
              onError={onError}
              zodSchema={LoginSchema}
            >
              <MyInput
                label="Email"
                fieldname="email"
                onChange={(e) => setEmailValue(e.target.value)}
              />
              <MyInput label="Code" fieldname="code" type="number" />
              <ButtonGroup marginTop={8} justifyContent="center">
                <Button
                  type="submit"
                  color={white}
                  rounded={"full"}
                  _hover={{
                    bg: "gray.700",
                  }}
                  onClick={() => {}}
                >
                  Iniciar sesión
                </Button>{" "}
                <Button
                  color={white}
                  rounded={"full"}
                  _hover={{
                    bg: "gray.700",
                  }}
                  type="submit"
                  onClick={() => getCode(emailValue)}
                >
                  Quiero un código
                </Button>
              </ButtonGroup>
              {errorMessages.map(
                ({ condition, message }) =>
                  condition && (
                    <Center key={message}>
                      <Text color="red" fontSize="sm" mt={2}>
                        {message}
                      </Text>
                    </Center>
                  )
              )}
              <Center>
                <Link
                  color={"blue.400"}
                  marginTop={2}
                  fontSize="xs"
                  onClick={() => router.push("/register")}
                >
                  Registrarse
                </Link>
              </Center>
            </MyForm>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
