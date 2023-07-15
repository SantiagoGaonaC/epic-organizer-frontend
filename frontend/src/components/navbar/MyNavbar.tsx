"use client";
import { AppHeader } from "@/components";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import MyUsername from "./MyUser";
import MyColorMode from "../entities/MyColorMode";
const Links = ["Coming soon", "Coming soon..."];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.700", "gray.200"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);
export default function MyNavbar() {
  return (
    <>
      <Box bg={useColorModeValue("gray.900", "gray.100")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack
            color={useColorModeValue("white", "black")}
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
            <Box>Logo</Box>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <MyColorMode />
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <MyUsername />
                  </Center>
                  <br />
                  <MenuDivider />
                  <AppHeader />
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
