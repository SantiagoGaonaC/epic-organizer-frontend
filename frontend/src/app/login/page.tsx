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
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginSchema } from "@/models/AuthSchema";
import MyForm from "@/components/global/UI/entities/forms/MyForm";
import MyInput from "@/components/global/UI/entities/input/MyInput";
import { getErrorMessages } from "@/utilities/error.msg.utilities";
import { useLogin } from "./hooks";
import { useCodeRequest } from "./hooks";
import { AuthServiceAxios } from "./services";

const Login: NextPage = () => {
  const white = useColorModeValue("white", "white");
  const [noActiveUser, setNoActiveUser] = useState(false);
  const [emailCodeIncorrect, setEmailCodeIncorrect] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [errLogin, setErrLogin] = useState(false);
  const { onSubmit } = useLogin();
  const authService = new AuthServiceAxios();
  const { emailValue, setEmailValue, handleCodeRequest } =
    useCodeRequest(authService);

  const resetStates = () => {
    setNoActiveUser(false);
    setEmailCodeIncorrect(false);
    setErrLogin(false);
    setEmailNotFound(false);
  };

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
                  onClick={handleCodeRequest}
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
