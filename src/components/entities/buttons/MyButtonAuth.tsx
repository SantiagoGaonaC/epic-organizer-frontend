import { Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface Props {
  text: string;
  onClickHandler?: () => void;
}

function MyButtonAuth({ text, onClickHandler }: Props) {
  return (
    <Button
      type="submit"
      rounded={"full"}
      _hover={{
        bg: useColorModeValue("gray.900", "gray.300"),
      }}
      color={useColorModeValue("white", "black")}
      onClick={onClickHandler}
    >
      {text}
    </Button>
  );
}

export default MyButtonAuth;
