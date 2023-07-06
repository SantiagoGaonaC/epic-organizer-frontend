"use client";
import { Button, Flex, MenuItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvier";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const AppHeader = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  return (
    <>
      {!user && <MenuItem>Iniciar Sesión</MenuItem>}{" "}
      {!!user && (
        <MenuItem
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
            document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            router.push("/");
          }}
        >
          Cerrar Sesión
        </MenuItem>
      )}
    </>
  );
};

export default AppHeader;
