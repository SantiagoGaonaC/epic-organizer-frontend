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
import axios from "axios";
import { env } from "@/env";
import { useState, useEffect } from "react";
import MyStepRegister, {
  RegistrationValues,
} from "@/components/global/UI/register/MyStepRegister";
import MyStepRegCode from "@/components/global/UI/register/MyStepRegCode";

const Register: NextPage = () => {
  const white = useColorModeValue("white", "white");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const callApiCode = async (values: RegistrationValues) => {
    const { firstname, lastname, email } = values;
    console.log(firstname + " " + lastname + " " + email);
    setLoading(true);
    try {
      const response = await axios.post(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/register`,
        {
          firstName: firstname,
          lastName: lastname,
          email: email,
        }
      );
      console.log(response.data);
      setApiData(null);
      if (response.data.ok) {
        // Registro exitoso
        setEmail(email);
        setApiData(response.data);
        setLoading(false);
        setUserExist(false);
      }
      if (response.data.message === "User already exists") {
        setUserExist(true);
      } else {
        // Error en la respuesta de la API
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      // Error en la solicitud
      if (
        error.response &&
        error.response.data.message === "User already exists"
      ) {
        setUserExist(true);
      }
      console.log(error.response.data.message);
    }
  };

  const onError = (errors: any) => {
    console.log({ onError: errors });
  };

  useEffect(() => {
    if (apiData && step === 1) {
      setStep(2);
    }
  }, [apiData]);

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
          <Stack spacing={4} color={white}>
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
