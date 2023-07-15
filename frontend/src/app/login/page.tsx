"use client";

import {
  Box,
  useColorModeValue,
  ButtonGroup,
  Center,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/models/AuthSchema";
import { MyAuthPanel, MyErrorMessage, MyForm, MyInput } from "@/components";
import { getErrorMessages } from "@/utilities/error.msg.utilities";
import { useLogin } from "./hooks";
import { useCodeRequest } from "./hooks";
import { AuthServiceAxios } from "./services";
import MyButtonAuth from "@/components/entities/buttons/MyButtonAuth";

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
              <MyButtonAuth onClickHandler={() => {}} text="Iniciar sesión" />{" "}
              <MyButtonAuth
                onClickHandler={handleCodeRequest}
                text="Quiero un código"
              />
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
