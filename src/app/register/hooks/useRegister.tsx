import { useState, useEffect } from "react";
import { RegistrationValues } from "@/models/RegisterSchema";
import { RegisterServiceAxios } from "../services";

const useRegister = () => {
  const registerService = new RegisterServiceAxios();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);

  const callApiCode = async (values: RegistrationValues) => {
    const { nombre, apellido, email } = values;
    setLoading(true);
    try {
      const response = await registerService.register(
        nombre,
        apellido,
        email
      );
      console.log(response);
      setApiData(null);
      if (response.ok) {
        // Registro exitoso
        setEmail(email);
        setApiData(response);
        setLoading(false);
        setUserExist(false);
      }
      if (response.message === "User already exists") {
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

  useEffect(() => {
    if (apiData && step === 1) {
      setStep(2);
    }
  }, [apiData]);

  return { callApiCode, email, loading, userExist, step };
};

export default useRegister;
