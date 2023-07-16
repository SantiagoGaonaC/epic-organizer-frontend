"use client";
import { Button, Center, MenuItem } from "@chakra-ui/react";
import React from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@chakra-ui/icons";

const AppHeader = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  return (
    <>
      {!user && <MenuItem>Iniciar Sesión</MenuItem>}{" "}
      {!!user && (
        <MenuItem
          icon={<CheckCircleIcon boxSize={8} color="red.500" />}
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
