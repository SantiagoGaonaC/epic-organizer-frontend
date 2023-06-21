import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

interface Props {
  onSubmit: (values: RegistrationValues) => Promise<void>;
  onError: (errors: any) => void;
  userExist: boolean;
}

const registrationSchema = z.object({
  firstname: z
    .string()
    .nonempty("El nombre no puede estar vacío")
    .min(5, { message: "Debe tener 5 caracteres o más" }),
  lastname: z
    .string()
    .nonempty("El apellido no puede estar vacío")
    .min(5, { message: "Debe tener 5 caracteres o más" }),
  email: z.string().email("Email inválido"),
});

export type RegistrationValues = z.infer<typeof registrationSchema>;

const MyStepRegister = ({ onSubmit, onError, userExist }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
  });

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values), onError)}>
      <FormControl id="firstname" isInvalid={!!errors.firstname}>
        <FormLabel>Firstname</FormLabel>
        <Input
          type="text"
          placeholder="Ingresa tu nombre"
          {...register("firstname")}
        />
        <FormErrorMessage>{errors.firstname?.message}</FormErrorMessage>
      </FormControl>
      <FormControl marginTop={3} id="lastname" isInvalid={!!errors.lastname}>
        <FormLabel>Lastname</FormLabel>
        <Input
          type="text"
          placeholder="Ingresa tu apellido"
          {...register("lastname")}
        />
        <FormErrorMessage>{errors.lastname?.message}</FormErrorMessage>
      </FormControl>
      <FormControl marginTop={3} id="email" isInvalid={!!errors.email}>
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
      <Center>
        <ButtonGroup marginTop={3} justifyContent="center">
          <Button
            type="submit"
            rounded={"full"}
            _hover={{
              bg: "gray.700",
            }}
            color="white"
          >
            Registrarse
          </Button>
        </ButtonGroup>
      </Center>
    </form>
  );
};

export default MyStepRegister;
