"use client";

import { Spinner, Center } from "@chakra-ui/react";
import { NextPage } from "next";
import { MyStepRegister, MyStepRegCode, MyAuthPanel } from "@/components";
import useRegister from "./hooks/useRegister";

const Register: NextPage = () => {
  const { callApiCode, email, loading, userExist, step } = useRegister();

  const onError = (errors: any) => {
    console.log({ onError: errors });
  };

  return (
    <MyAuthPanel heading="Registrarse" desc="organiza tus tareas!">
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
          {step === 2 && <MyStepRegCode email={email} onError={onError} />}
        </>
      )}
    </MyAuthPanel>
  );
};

export default Register;
