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
  SimpleGrid,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginSchema } from "@/models/AuthSchema";
import { MyAuthPanel, MyErrorMessage, MyForm, MyInput } from "@/components";
import { getErrorMessages } from "@/utilities/error.msg.utilities";
import { useLogin } from "./hooks";
import { useCodeRequest } from "./hooks";
import { AuthServiceAxios } from "./services";

const Login: NextPage = () => {
  const white = useColorModeValue("white", "white");
  const {
    onSubmit,
    state: { noActiveUser, emailCodeIncorrect, emailNotFound, errLogin },
    resetStates,
  } = useLogin();

  const authService = new AuthServiceAxios();
  const { emailValue, setEmailValue, handleCodeRequest } =
    useCodeRequest(authService);

  const onError = (errors: any) => {
    resetStates();
    console.log({ errors: errors });
  };

  const errorMessages = getErrorMessages(
    noActiveUser,
    emailCodeIncorrect,
    errLogin,
    emailNotFound
  );

  const router = useRouter();
  return (
    <MyAuthPanel heading="Iniciar sesión" desc="organiza tus tareas!">
      <MyForm onSubmit={onSubmit} onError={onError} zodSchema={LoginSchema}>
        <MyInput
          label="Email"
          fieldname="email"
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <MyInput label="Code" fieldname="code" type="number" />
        <ButtonGroup marginTop={3} justifyContent="center">
          <Box position="relative">
            <SimpleGrid gap={2} p={1} columns={2}>
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
                onClick={handleCodeRequest}
              >
                Quiero un código
              </Button>
            </SimpleGrid>
          </Box>
        </ButtonGroup>
        {errorMessages.map(MyErrorMessage)}
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
    </MyAuthPanel>
  );
};

export default Login;
