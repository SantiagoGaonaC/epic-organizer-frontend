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
  PinInput,
  PinInputField,
  HStack,
  Center,
  Alert,
  AlertIcon,
  Link,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import axios from "axios";
import { env } from "@/env";
import { useRouter } from "next/navigation";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import { useState } from "react";

const schema = z.object({
  firstname: z.string().nonempty("El nombre no puede estar vacío"),
  lastname: z.string().nonempty("El apellido no puede estar vacío"),
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

const Register: NextPage = () => {
  const white = useColorModeValue("white", "white");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [val, setVal] = useState("");
  const [userExist, setUserExist] = useState(false);
  const [errCode, setErrCode] = useState(false);

  const callApiCode = async () => {
    const { firstname, lastname, email } = getValues();
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

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ resolver: zodResolver(schema) });

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
            <form onSubmit={handleSubmit(callApiCode, onError)}>
              <FormControl
                marginBlock={3}
                id="firstname"
                isInvalid={!!errors.firstname}
              >
                <FormLabel>Firstname</FormLabel>
                <Input
                  type="text"
                  placeholder="Ingresa tu nombre"
                  {...register("firstname")}
                />
                <FormErrorMessage>{errors.firstname?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                marginBlock={3}
                id="lastname"
                isInvalid={!!errors.lastname}
              >
                <FormLabel>Lastname</FormLabel>
                <Input
                  type="text"
                  placeholder="Ingresa tu apellido"
                  {...register("lastname")}
                />
                <FormErrorMessage>{errors.lastname?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  placeholder="Ingresa tu email"
                  {...register("email")}
                />
                {userExist && (
                  <Text color="red" fontSize="sm" mt={2}>
                    El usuario ya existe
                  </Text>
                )}
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              {loading ? (
                <div className="grid h-full place-items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                    alt="..."
                    className="mx-auto mb-2 w-14 animate-spin"
                  />
                </div>
              ) : (
                apiData && (
                  <Center>
                    <FormControl id="code">
                      <FormLabel marginTop={3}>
                        Ingresa el código enviado al tú email
                      </FormLabel>
                      <HStack marginTop={2}>
                        <PinInput
                          type="number"
                          id="code"
                          onChange={(e) => setVal(e)}
                        >
                          <PinInputField {...register("code")} />
                          <PinInputField {...register("code")} />
                          <PinInputField {...register("code")} />
                          <PinInputField {...register("code")} />
                          <PinInputField {...register("code")} />
                          <PinInputField {...register("code")} />
                        </PinInput>
                      </HStack>
                      <FormErrorMessage>
                        {errors.code?.message}
                      </FormErrorMessage>
                      <Center>
                        <Button
                          marginTop={3}
                          color={white}
                          type="submit"
                          onClick={async () => {
                            const { email } = getValues();
                            console.log(email, val);
                            try {
                              const response = await axios.post(
                                `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/activateUser`,
                                {
                                  email: email,
                                  code: val,
                                }
                              );
                              if (response.data.ok) {
                                <Alert status="success">
                                  <AlertIcon />
                                  Usuario Activado, rediriendo a login...
                                </Alert>;
                                router.push("/login");
                                console.log("Usuario activado" + response.data);
                              } else {
                                console.log("Error al activar usuario");
                                <Text color="red" fontSize="sm" mt={2}>
                                  Comprueba tú código
                                </Text>;
                              }
                            } catch (error) {
                              console.log("TryCath" + error);
                              setErrCode(true);
                            }
                          }}
                        >
                          Enviar Código
                        </Button>
                      </Center>
                    </FormControl>
                  </Center>
                )
              )}
              {errCode && (
                <Center>
                  <Text color="red" fontSize="sm" mt={2}>
                    Comprueba tú código
                  </Text>
                </Center>
              )}
              {!apiData && (
                <Center>
                  <ButtonGroup marginTop={3} justifyContent="center">
                    <Button
                      type="submit"
                      rounded={"full"}
                      _hover={{
                        bg: "gray.700",
                      }}
                      color={white}
                      onClick={callApiCode}
                    >
                      Registrarse
                    </Button>
                  </ButtonGroup>
                </Center>
              )}
              <Center>
                <Link
                  color={"blue.400"}
                  marginTop={2}
                  fontSize="xs"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Link>
              </Center>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
