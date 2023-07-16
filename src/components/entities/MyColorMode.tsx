import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";

interface Props {
  margin?: number;
}

function MyColorMode({ margin }: Props) {
  const { colorMode, toggleColorMode } = useColorMode();

  const buttonStyles = {
    color: colorMode === "light" ? "white" : "black",
    bg: colorMode === "light" ? "black" : "white",
    _hover: {
      bg: colorMode === "light" ? "gray.700" : "gray.200",
    },
  };

  return (
    <Button onClick={toggleColorMode} {...buttonStyles} margin={margin}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}

export default MyColorMode;
