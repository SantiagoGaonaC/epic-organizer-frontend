import { Center, Text } from "@chakra-ui/react";

interface Props {
  condition: boolean;
  message: string;
}

const MyErrorMessage = ({ condition, message }: Props) =>
  condition ? (
    <Center key={message}>
      <Text color="red" fontSize="sm" mt={2}>
        {message}
      </Text>
    </Center>
  ) : null;

export default MyErrorMessage;
