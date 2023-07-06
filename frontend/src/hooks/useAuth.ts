import { AuthContext, IAuthContext } from "@/context/AuthProvier";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  return context as IAuthContext;
};

export default useAuth;
