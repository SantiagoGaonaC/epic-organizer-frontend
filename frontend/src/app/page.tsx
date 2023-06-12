"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  ButtonGroup,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import axios from "axios";
import { env } from "@/env";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";

const schema = z.object({
  email: z.string().email("Email inválido"),
  code: z
    .string()
    .length(6, "El código debe tener 6 caracteres")
    .refine((check) => {
      let isValid = true;
      for (let i = 0; i < check.length; i++) {
        const char = check[i];
        if (!"0123456789".includes(char as string)) {
          isValid = false;
        }
      }
      return isValid;
    }, "Los caracteres del código solo pueden ser números"),
});

type FieldValues = z.infer<typeof schema>;

const Login: NextPage = () => {
  const white = useColorModeValue("white", "white");

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ resolver: zodResolver(schema) });

  const onSubmit = () => {
    const { email, code } = getValues();
    console.log({ email, code });
    axios
      .post(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`,
        { code },
        { withCredentials: true }
      )
      .then(({ data }) => {
        router.push("/calendar");
      })
      .catch((error) => console.log(error));
  };

  const onError = () => {
    console.log({ errors });
  };

  const router = useRouter();

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
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  placeholder="Ingresa tu email"
                  {...register("email")}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="code" isInvalid={!!errors.code}>
                <FormLabel>Código</FormLabel>
                <Input
                  type="number"
                  placeholder="Ingresa tu código"
                  {...register("code")}
                />
                <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
              </FormControl>
              <ButtonGroup marginTop={8} justifyContent="center">
                <Button
                  type="submit"
                  color={white}
                  onClick={() => {
                    // const {email, code} = getValues();
                    // axios.post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}`,
                    // { code }
                    // )
                    // .then(({ data }) => {
                    //   router.push('/calendar');
                    // })
                    // .catch((error) => console.log(error));
                  }}
                >
                  Iniciar sesión
                </Button>{" "}
                <Button
                  color={white}
                  type="submit"
                  onClick={() => {
                    const email = getValues("email");
                    axios
                      .post(
                        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}/code`
                      )
                      .then(console.log)
                      .catch(console.log);
                  }}
                >
                  Quiero un código
                </Button>
              </ButtonGroup>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
