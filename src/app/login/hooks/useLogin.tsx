import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginValues } from "@/models/AuthSchema";
import useAuth from "@/hooks/useAuth";
import { loginAxios } from "../services";
import { AxiosError } from "axios";

const useLogin = () => {
  const [noActiveUser, setNoActiveUser] = useState(false);
  const [emailCodeIncorrect, setEmailCodeIncorrect] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [errLogin, setErrLogin] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const resetStates = () => {
    setNoActiveUser(false);
    setEmailCodeIncorrect(false);
    setErrLogin(false);
    setEmailNotFound(false);
  };

  const onSubmit = async (values: LoginValues) => {
    const { email, code } = values;
    console.log({ email, code });
    resetStates();

    try {
      const response = await loginAxios(email, code);
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
      if (error instanceof AxiosError) {
        if (error.response) {
          switch (error.response.status) {
            case 403:
              console.log("Usuario no activado");
              setNoActiveUser(true);
              break;
            case 404:
              if (error.response.data.message === "User not found") {
                setEmailNotFound(true);
              } else {
                console.log("Email o código incorrecto");
                setEmailCodeIncorrect(true);
              }
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

  return {
    onSubmit,
    state: {
      noActiveUser,
      emailCodeIncorrect,
      emailNotFound,
      errLogin,
    },
    resetStates,
  };
};

export default useLogin;
