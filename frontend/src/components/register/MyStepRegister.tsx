import {
  Box,
  ButtonGroup,
  Center,

  Link,
  SimpleGrid,
  Text,

} from "@chakra-ui/react";
import MyInput from "../entities/input/MyInput";
import MyForm from "../entities/forms/MyForm";
import {
  RegistrationValues,
  registrationSchema,
} from "@/models/RegisterSchema";
import { useRouter } from "next/navigation";
import MyButtonAuth from "../entities/buttons/MyButtonAuth";

interface Props {
  onSubmit: (values: RegistrationValues) => Promise<void>;
  onError: (errors: any) => void;
  userExist: boolean;
}

const MyStepRegister = ({ onSubmit, onError, userExist }: Props) => {
  const router = useRouter();
  return (
    <MyForm
      zodSchema={registrationSchema}
      onSubmit={onSubmit}
      onError={onError}
    >
      <MyInput label="Nombre" fieldname="nombre" />
      <MyInput label="Apellido" fieldname="apellido" />
      <MyInput label="Email" fieldname="email">
        {userExist && (
          <Text color="red" fontSize="sm" mt={2}>
            El usuario ya existe
          </Text>
        )}
      </MyInput>
      <Center>
        <ButtonGroup marginTop={3} justifyContent="center">
          <Box position="relative">
            <SimpleGrid gap={2} p={1} columns={3}>
              <Box />
              <MyButtonAuth text="Registrarse" />
            </SimpleGrid>
          </Box>
        </ButtonGroup>
      </Center>
      <Center>
        <Link
          color={"blue.400"}
          marginTop={2}
          fontSize="xs"
          onClick={() => router.push("/login")}
        >
          Iniciar sesión
        </Link>
      </Center>
    </MyForm>
  );
};

export default MyStepRegister;
