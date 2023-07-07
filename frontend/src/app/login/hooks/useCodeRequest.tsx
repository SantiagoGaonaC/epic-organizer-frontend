import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { AuthServiceAxios, IAuthService } from "../services/auth.login.services";
import { CheckIcon } from "@chakra-ui/icons";

export const useCodeRequest = (authService: IAuthService) => {
  const toast = useToast();
  const [emailValue, setEmailValue] = useState("");

  const handleCodeRequest = async () => {
    try {
      const response = await authService.getCode(emailValue);
      if (response.ok) {
        toast({
          description: response.message,
          status: "success",
          icon: <CheckIcon />,
          position: "top",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    emailValue,
    setEmailValue,
    handleCodeRequest,
  };
};

