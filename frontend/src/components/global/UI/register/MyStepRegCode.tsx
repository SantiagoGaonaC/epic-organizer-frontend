import {
  Alert,
  AlertIcon,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  useToast,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { env } from "process";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";

const codeSchema = z.object({
  code: z
    .string()
    .refine((value) => value.length === 6, {
      message: "El código debe tener 6 caracteres",
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "Los caracteres del código solo pueden ser números",
    }),
});

interface Props {
  onError: (errors: any) => void;
  email: string;
}

type CodeValues = z.infer<typeof codeSchema>;

const MyStepRegCode = ({ onError, email }: Props) => {
  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeValues>({
    resolver: zodResolver(codeSchema),
  });
  const [errCode, setErrCode] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [reSendCode, setReSendCode] = useState(false);

  const handleFormSubmit = async (values: CodeValues) => {
    const { code } = values;
    try {
      const response = await axios.post(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/activateUser`,
        {
          email: email,
          code: code,
        }
      );
      if (response.data.ok) {
        <Alert status="success">
          <AlertIcon />
          Usuario Activado, rediriendo a login...
        </Alert>;
        router.push("/login");
        console.log("Usuario activado", response.data);
      } else {
        console.log("Error al activar usuario");
        <Alert status="error">
          <AlertIcon />
          Error al activar usuario
        </Alert>;
      }
    } catch (error) {
      console.log("TryCatch", error);
      setErrCode(true);
    }
  };

  const handleResendCode = () => {
    setLoadingCode(true);
    axios
      .post(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login/${email}/code`)
      .then(({ data }) => {
        toast({
          description: data.message,
          status: "success",
          icon: <CheckIcon />,
          position: "top",
        });
        setLoadingCode(false);
        setReSendCode(true);
      })
      .catch(console.log);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, onError)}>
      <FormControl marginTop={3} id="code" isInvalid={!!errors.code}>
        <FormLabel>Ingresa el código enviado a tu email</FormLabel>
        <Input
          type="number"
          placeholder="Ingresa tu código"
          {...register("code")}
          className="text-center"
        />
        <FormErrorMessage>{errors.code?.message}</FormErrorMessage>
        <Center>
          <Button
            marginTop={3}
            type="submit"
            rounded={"full"}
            _hover={{
              bg: "gray.700",
            }}
            color="white"
          >
            Enviar Código
          </Button>
        </Center>
      </FormControl>
      {errCode && (
        <Center>
          <Text color="red" fontSize="sm" mt={2}>
            Comprueba tu código
          </Text>
        </Center>
      )}
      <Center>
        <Text as="span" position="relative" color="white" fontSize="xs">
          ¿No recibiste un código?
        </Text>
        <Button
          padding={1}
          variant="link"
          size="xs"
          color="white"
          type="button"
          onClick={handleResendCode}
        >
          Volver a enviar{" "}
          {loadingCode ? <Text>⏳</Text> : reSendCode && <Text>✅</Text>}
        </Button>
      </Center>
    </form>
  );
};

export default MyStepRegCode;
