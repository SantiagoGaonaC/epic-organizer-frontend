"use client";
import { Button, Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "./AuthProvier";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";

const AppHeader = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  return (
    <Flex>
      {!user && <Button>Iniciar Sesión</Button>}{" "}
      {!!user && (
        <Button
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
            document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            router.push("/");
          }}
        >
          Cerrar Sesión
        </Button>
      )}
    </Flex>
  );
};

export default AppHeader;
