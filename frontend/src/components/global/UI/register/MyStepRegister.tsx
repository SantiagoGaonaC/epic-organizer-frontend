import { Button, ButtonGroup, Center, Text } from "@chakra-ui/react";
import MyInput from "../entities/input/MyInput";
import MyForm from "../entities/forms/MyForm";
import { z } from "zod";
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
  return (
    <MyForm
      zodSchema={registrationSchema}
      onSubmit={onSubmit}
      onError={onError}
    >
      <MyInput label="Firstname" fieldname="firstname" />
      <MyInput label="Lastname" fieldname="lastname" />
      <MyInput label="Email" fieldname="email">
        {userExist && (
          <Text color="red" fontSize="sm" mt={2}>
            El usuario ya existe
          </Text>
        )}
      </MyInput>
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
    </MyForm>
  );
};

export default MyStepRegister;
