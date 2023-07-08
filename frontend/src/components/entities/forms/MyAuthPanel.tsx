import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

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
      bg={useColorModeValue("gray.900", "gray.200")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={useColorModeValue("white", "white")}>
            {heading}
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {desc}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("gray.800", "gray.200")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} color={useColorModeValue("white", "white")}>
            {children}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default MyAuthPanel;
