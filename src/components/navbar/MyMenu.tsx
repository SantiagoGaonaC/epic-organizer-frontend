import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import MyAvatar from "./MyAvatar";
import AppHeader from "../AppHeader";
import MyUsername from "./MyUser";

function MyMenu() {
  const backgroundColor = useColorModeValue("gray.900", "gray.100");
  const textColor = useColorModeValue("white", "black");

  return (
    <Box bg={backgroundColor}>
      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <MyAvatar size="sm" />
        </MenuButton>
        <MenuList alignItems={"center"} bg={backgroundColor} color={textColor}>
          <br />
          <Center>
            <MyAvatar size="2xl" />
          </Center>
          <br />
          <Center>
            <MyUsername />
          </Center>
          <br />
          <MenuDivider />
          <Center>
            <AppHeader />
          </Center>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default MyMenu;
