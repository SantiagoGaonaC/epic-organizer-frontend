"use client";

import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { NextPage } from "next";
import MyStepRegister from "@/components/global/UI/register/MyStepRegister";
import MyStepRegCode from "@/components/global/UI/register/MyStepRegCode";
import useRegister from "./hooks/useRegister";

const Register: NextPage = () => {
  const { callApiCode, email, loading, userExist, step } = useRegister();

  const onError = (errors: any) => {
    console.log({ onError: errors });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.900", "gray.200")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={useColorModeValue("white", "white")}>
            Registro de usuario
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
          <Stack spacing={4} color={useColorModeValue("white", "white")}>
            {loading ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              <>
                {step === 1 && (
                  <MyStepRegister
                    onSubmit={callApiCode}
                    onError={onError}
                    userExist={userExist}
                  />
                )}
                {step === 2 && (
                  <MyStepRegCode email={email} onError={onError} />
                )}
              </>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
