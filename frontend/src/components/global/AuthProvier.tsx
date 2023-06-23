"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { TokenPayload } from "../../schemas/AuthSchema";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Flex, Spinner } from "@chakra-ui/react";

export interface IAuthContext {
  user: TokenPayload;
  setUser: Dispatch<SetStateAction<TokenPayload>>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TokenPayload>(null);
  const [validating, setValidating] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const PROTECTED_ROUTES = ["/calendar"];
  const PROTECTED_ROUTES_USER_AUTH = ["/login ", "/register"];

  const validateRoutes = (user: TokenPayload) => {
    if (!user && PROTECTED_ROUTES.includes(pathname)) {
      router.push("/");
    }
    if (!!user && pathname === "/") {
      router.push("/calendar");
    }
    setTimeout(() => {
      setValidating(false);
    }, 60);
  };
  useEffect(() => {
    const userFromLS = localStorage.getItem("user");
    const userForState = !!userFromLS ? JSON.parse(userFromLS) : null;
    setUser(userForState);
    validateRoutes(userForState);
  }, []);
  if (validating)
    return (
      <Flex
        margin="0 auto"
        width="20rem"
        height="20rem"
        alignItems="center"
        justifyContent="center"
      >
        <div className="grid h-full place-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
            alt="..."
            className="w-14 animate-spin"
          />
        </div>
      </Flex>
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
