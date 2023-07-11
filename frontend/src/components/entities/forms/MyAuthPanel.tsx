import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import MyColorMode from "../MyColorMode";

interface Props {
  heading: string;
  desc: string;
  children?: React.ReactNode;
}
function MyAuthPanel({ heading, desc, children }: Props) {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("black", "gray.200")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        boxShadow={useColorModeValue(
          "0 0 10px rgba(255, 255, 255, 0.2)",
          "0 0 10px rgba(0, 0, 0, 0.2)"
        )}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={useColorModeValue("white", "black")}>
            {heading}
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {desc}
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("black", "gray.200")} p={8}>
          <Stack spacing={4} color={useColorModeValue("white", "white")}>
            {children}
          </Stack>
        </Box>
      </Stack>
      <MyColorMode />
    </Flex>
  );
}

export default MyAuthPanel;
